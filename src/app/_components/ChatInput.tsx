"use client";

import { SendHorizontal } from 'lucide-react';
import React, { useState } from "react";

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
    <div className="fixed bottom-0 left-0 right-0 p-4">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="w-full p-4 mx-10 bg-white rounded-lg"
        />
        <button
          type="submit"
          className="absolute right-3 top-4 cursor-pointer"
        >
          <SendHorizontal />
        </button>
      </form>
    </div>
  );
}
