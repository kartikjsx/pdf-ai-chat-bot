"use client";
import Hero from "@@/components/Hero";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function cleanup() {
      const documentId = localStorage.getItem("documentId");

      if (!documentId) return;

      await fetch("/api/delete", {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          documentId,
        }),
      });

      localStorage.removeItem("documentId");

      localStorage.removeItem("pdfName");
    }

    cleanup();
  }, []);
  return (
    <>
      <Hero />
      <footer className="footer">Made by Kartik</footer>
    </>
  );
}
