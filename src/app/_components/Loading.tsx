import React from "react";

type Props = {
  display?: boolean;
};

export default function Loading({}: Props) {
  return (
    <div className="flex items-center justify-start">
      <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 max-w-xs">
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
          <div
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
