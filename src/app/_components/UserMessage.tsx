import React from "react";

type Props = {
  text: string;
};

export default function UserMessage({ text }: Props) {
  return (
    <div className="flex justify-end">
      <div className="flex flex-col">
        <p className="uppercase text-xs text-gray-400">Eu</p>
        <div
          className="border-white border-1 rounded-lg py-2 px-4"
          style={{
            backgroundColor: "rgba(200, 170, 230, 0.1)",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
