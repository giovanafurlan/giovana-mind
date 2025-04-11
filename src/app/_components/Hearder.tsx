import React from "react";

type Props = {
  display?: boolean;
};

export default function Header({ display = true }: Props) {
  if (!display) return null;

  return (
    <header className="py-8">
      <div className="flex flex-col items-center gap-4">
        <img src="/images/logo.png" />
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold">Giovana mind</h1>
          <p className="text-gray-600">Conheça mais sobre a vida da Giovana nesse chatbot</p>
        </div>
      </div>
    </header>
  );
}