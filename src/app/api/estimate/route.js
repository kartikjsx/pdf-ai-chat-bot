import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import fs from "fs";

import path from "path";

export async function POST(req) {
  const formData = await req.formData();

  const file = formData.get("file");

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const tempFilePath = `/tmp/${file.name}`;

  fs.writeFileSync(tempFilePath, buffer);

  const loader = new PDFLoader(tempFilePath);

  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
  });

  const splitDocs = await splitter.splitDocuments(docs);

  const totalChunks = splitDocs.length;

  const estimatedMinutes = (totalChunks * 0.66) / 60;

  const estimatedTime =
    estimatedMinutes < 1
      ? `${Math.ceil(estimatedMinutes * 60)} sec`
      : `${estimatedMinutes.toFixed(1)} min`;

  fs.unlinkSync(tempFilePath);

  return Response.json({
    estimatedTime,
    totalChunks,
  });
}
