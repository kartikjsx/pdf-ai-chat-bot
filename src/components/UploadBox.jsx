"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function UploadBox() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);
    const estimateResponse = await fetch("/api/estimate", {
      method: "POST",
      body: formData,
    });

    const estimateData = await estimateResponse.json();

    setEstimatedTime(estimateData.estimatedTime);

    setLoading(true);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    localStorage.setItem("documentId", data.documentId);

    localStorage.setItem("pdfName", file.name);

    router.push("/chat");
  }

  return (
    <>
      <label className="uploadInner">
        <input
          type="file"
          accept="application/pdf"
          hidden
          onChange={handleFileChange}
        />

        <h4>{loading ? "Processing PDF..." : "Upload PDF"}</h4>

        <p>
          {loading
            ? "Generating embeddings..."
            : "Drag and drop your file here"}
        </p>
      </label>

      {loading && (
        <>
          <p>{estimatedTime}</p>
          <div className="progressBar">
            <div className="progressFill"></div>
          </div>
        </>
      )}
    </>
  );
}
