"use client";

import React, { useEffect, useRef } from "react";
import ChatInput from "./_components/ChatInput";
import UserMessage from "./_components/UserMessage";
import ChatbotMessage from "./_components/ChatbotMessage";
import Header from "./_components/Hearder";

export default function Home() {
  const [msgs, setMsgs] = React.useState<{ text: string; isUser: boolean }[]>([]);
  const [loading, setLoading] = React.useState(false);
  const endRef = useRef<HTMLDivElement>(null);

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
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: msg }),
      });

      if (!res.ok) {
        throw new Error('Erro ao conectar com o servidor');
      }

      const data = await res.json();
      
      setMsgs((prev) => [
        ...prev,
        { text: data.response, isUser: false },
      ]);
    } catch (err) {
      console.error('Erro:', err);
      setMsgs((prev) => [
        ...prev,
        { text: err instanceof Error ? err.message : "Desculpe, não consegui processar sua solicitação.", isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        {loading && (
          <div className="flex items-center justify-start">
            <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 max-w-xs">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <ChatInput onSendMessage={handleSend} />
    </div>
  );
}