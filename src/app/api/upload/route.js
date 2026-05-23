import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createEmbedding } from "@@/lib/embedding";
import { supabase } from "@@/lib/supabase";

import fs from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();

  const file = formData.get("file");

  if (!file) {
    return Response.json({
      success: false,
    });
  }

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const tempFilePath = path.join(process.cwd(), "temp.pdf");

  fs.writeFileSync(tempFilePath, buffer);

  const loader = new PDFLoader(tempFilePath);

  const docs = await loader.load();
  var document_Id;
  let estimatedTime;
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 200,
    });

    const splitDocs = await splitter.splitDocuments(docs);

    const { data: documentData, error } = await supabase
      .from("documents")
      .insert({
        name: file.name,
      })
      .select()
      .single();

    console.log(estimatedTime);
    document_Id = documentData.id;

    for (const doc of splitDocs) {
      const embedding = await createEmbedding(doc.pageContent);

      await supabase.from("chunks").insert({
        document_id: document_Id,

        content: doc.pageContent,

        embedding,
      });
    }
  } catch (err) {
    console.log(err);

    return Response.json({
      success: false,
      error: err.message,
    });
  }

  fs.unlinkSync(tempFilePath);

  return Response.json({
    success: true,
    pages: docs.length,
    documentId: document_Id,
  });
}
