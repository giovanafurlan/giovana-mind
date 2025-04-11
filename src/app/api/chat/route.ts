import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("Chave da API Gemini não configurada");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || "Erro ao acessar a API Gemini");
    }

    const data = await res.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Não consegui gerar uma resposta.";

    return NextResponse.json({ response: text });
  } catch (err) {
    console.error("Erro na API Gemini:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Ocorreu um erro desconhecido",
      },
      { status: 500 }
    );
  }
}
