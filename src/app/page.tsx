"use client";

import ChatInput from "./_components/ChatInput";
import Header from "./_components/Hearder";
import React from "react";

export default function Home() {
  const [showHeader, setShowHeader] = React.useState(true);
  const [messages, setMessages] = React.useState<
    { text: string; isUser: boolean }[]
  >([]);

  const handleSendMessage = (message: string) => {
    // Adiciona mensagem do usuário
    setMessages((prev) => [...prev, { text: message, isUser: true }]);

    // Aqui você faria a chamada à API do seu chatbot
    // e adicionaria a resposta:
    // const botResponse = await getChatbotResponse(message);
    // setMessages(prev => [...prev, {text: botResponse, isUser: false}]);
  };

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Header display={showHeader} />

      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>

      <div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
