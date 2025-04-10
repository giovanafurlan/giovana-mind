import React from "react";

type Props = {
  display?: boolean;
};

export default function Header({ display = false }: Props) {
  return (
    <header className={display ? "block" : "hidden"}>
      <div className="flex flex-col items-center gap-16">
        <img src="/images/logo.png" />
        <h1 className="text-3xl">Giovana mind</h1>
      </div>
    </header>
  );
}