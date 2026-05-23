"use client";

import { useState, useEffect } from "react";

import styles from "@@/app/chat/page.module.css";

export default function ChatSection() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Your PDF is ready. Ask me anything about the document.",
    },
  ]);
  const [documentId, setDocumentId] = useState(null);

  useEffect(() => {
    const storedDocumentId = localStorage.getItem("documentId");

    if (storedDocumentId) {
      setDocumentId(storedDocumentId);
    }
  }, []);

  async function handleSend() {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;

    setQuestion("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        question: currentQuestion,
        documentId,
      }),
    });

    const data = await response.json();

    const aiMessage = {
      role: "ai",
      content: data.answer,
    };
    setLoading(false);
    setMessages((prev) => [...prev, aiMessage]);
  }

  return (
    <section className={styles.chatSection}>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === "ai" ? styles.aiMessage : styles.userMessage
            }
          >
            <div
              dangerouslySetInnerHTML={{
                __html: msg.content,
              }}
            />
          </div>
        ))}
        {loading && <div className={styles.aiMessage}>Thinking...</div>}
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Ask something about your PDF..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button onClick={handleSend}>Send</button>
      </div>
    </section>
  );
}
