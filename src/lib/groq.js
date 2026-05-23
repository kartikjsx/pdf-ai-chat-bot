export async function generateResponse(question, context) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `You are a helpful PDF AI assistant.

                    Return clean semantic HTML only.
                            
                    Use:
                    - h1/h2/h3
                    - p
                    - ul/li
                    - strong
                    - code  

                    Do not return markdown.

                    Answer ONLY from provided context.`,
          },

          {
            role: "user",
            content: `
Context:
${context}

Question:
${question}
            `,
          },
        ],
      }),
    },
  );

  const data = await response.json();

  return data.choices[0].message.content;
}
