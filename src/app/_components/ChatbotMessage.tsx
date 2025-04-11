import React from "react";

type Props = {
  text: string;
};

export default function ChatbotMessage({ text }: Props) {
  return (
    <div className="flex justify-start">
      <div className="flex flex-col">
        <p className="uppercase text-xs text-gray-400">Chatbot</p>
        <div
          className="border-white border-1 rounded-lg py-2 px-4"
          style={{
            backgroundColor: "rgba(255, 200, 220, 0.1)",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
