export async function createEmbedding(text) {
  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/BAAI/bge-small-en-v1.5",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        inputs: text,
      }),
    },
  );

  const embedding = await response.json();

  return embedding;
}
