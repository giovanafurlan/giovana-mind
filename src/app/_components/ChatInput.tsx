"use client";

import React, { useState } from "react";
import { SendHorizontal } from "lucide-react";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto my-8 max-w-5xl">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="w-full p-4 bg-white rounded-lg border-1 border-purple-300"
        />
        <button type="submit" className="absolute right-6 top-4 cursor-pointer">
          <SendHorizontal />
        </button>
      </form>
    </div>
  );
}
