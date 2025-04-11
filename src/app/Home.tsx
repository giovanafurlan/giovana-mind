"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import ChatInput from "./_components/ChatInput";
import UserMessage from "./_components/UserMessage";
import ChatbotMessage from "./_components/ChatbotMessage";
import Header from "./_components/Hearder";
import Loading from "./_components/Loading";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [msgs, setMsgs] = useState<{ text: string; isUser: boolean }[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadSession = async () => {
      const id = searchParams.get("session");
      if (id) {
        try {
          setLoading(true);
          const res = await fetch(`/api/session?id=${id}`);
          if (res.ok) {
            const data = await res.json();
            setSessionId(data.session.id);
            setMsgs(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data.messages.map((msg: any) => ({
                text: msg.content,
                isUser: msg.role === "user",
              }))
            );
          }
        } catch (err) {
          console.error("Error loading session:", err);
        } finally {
          setLoading(false);
        }
      } else {
        createNewSession();
      }
    };

    loadSession();
  }, [searchParams]);

  const createNewSession = async () => {
    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: "New Chat" }),
      });
      if (res.ok) {
        const data = await res.json();
        setSessionId(data.id);
      }
    } catch (err) {
      console.error("Error creating session:", err);
    }
  };

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msgs]);

  const handleSend = async (msg: string) => {
    setMsgs((prev) => [...prev, { text: msg, isUser: true }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: msg,
          sessionId: sessionId,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao conectar com o servidor");
      }

      const data = await res.json();
      setMsgs((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (err) {
      console.error("Erro:", err);
      setMsgs((prev) => [
        ...prev,
        {
          text:
            err instanceof Error
              ? err.message
              : "Desculpe, não consegui processar sua solicitação.",
          isUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <div className="flex flex-col min-h-screen pt-10 pb-28 mx-auto max-w-5xl">
        <Header display={msgs.length === 0} />

        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {msgs.map((msg, i) =>
            msg.isUser ? (
              <UserMessage key={i} text={msg.text} />
            ) : (
              <ChatbotMessage key={i} text={msg.text} />
            )
          )}
          {loading && <Loading />}
          <div ref={endRef} />
        </div>

        <ChatInput onSendMessage={handleSend} />
      </div>
    </Suspense>
  );
}
