import Image from "next/image";
import React from "react";

type Props = {
  display?: boolean;
};

export default function Header({ display = true }: Props) {
  if (!display) return null;

  return (
    <header className="py-8">
      <div className="flex flex-col items-center gap-4">
        <Image src="/images/logo.png" alt="Logo de brilhos" width={30} height={30} />
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold">Giovana's mind</h1>
          <p className="text-gray-600">Conheça mais sobre a vida da Giovana nesse chatbot</p>
        </div>
      </div>
    </header>
  );
}