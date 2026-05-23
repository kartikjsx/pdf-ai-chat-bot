"use client";

import { TypeAnimation } from "react-type-animation";

export default function AnimatedTitle() {
  return (
    <TypeAnimation
      sequence={[
        "AI PDF Chatbot",
        2000,
        "Chat With PDFs",
        2000,
        "RAG Powered AI",
        2000,
      ]}
      speed={50}
      repeat={Infinity}
    />
  );
}
