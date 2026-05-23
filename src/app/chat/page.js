"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import styles from "./page.module.css";

import ChatSection from "@@/components/ChatSection";

export default function ChatPage() {
  const [pdfName, setPdfName] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("pdfName");

    if (storedName) {
      setPdfName(storedName);
    }
  }, []);

  async function handleDelete() {
    await fetch("/api/delete", {
      method: "DELETE",
    });

    localStorage.removeItem("pdfName");

    router.push("/");
  }

  return (
    <main className={styles.container}>
      <div className={styles.topBar}>
        <p>{pdfName}</p>

        <button onClick={handleDelete}>Delete PDF</button>
      </div>

      <ChatSection />
    </main>
  );
}
