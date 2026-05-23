import { createEmbedding } from "@@/lib/embedding";
import { supabase } from "@@/lib/supabase";
import { generateResponse } from "@@/lib/groq";

export async function POST(req) {
  const { question, documentId } = await req.json();

  const queryEmbedding = await createEmbedding(question);

  const { data, error } = await supabase.rpc("match_chunks", {
    query_embedding: queryEmbedding,
    match_threshold: 0.1,
    match_count: 5,
    doc_id: Number(documentId),
  });

  console.log(documentId);
  console.log(data, error);
  if (!data || data.length === 0) {
    return Response.json({
      answer: "I could not find relevant information in the PDF.",
    });
  }
  const context = data.map((doc) => doc.content).join("\n\n");
  const answer = await generateResponse(question, context);
  console.log(answer);
  return Response.json({
    success: true,
    answer,
  });
}
