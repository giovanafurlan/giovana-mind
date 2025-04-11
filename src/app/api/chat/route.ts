import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

const PERSONAL_CONTEXT = `
Você é a assistente pessoal da Giovana. Aqui estão informações sobre ela:
{{FACTS}}

Instruções:
1. Use apenas estas informações quando perguntarem sobre a Giovana
2. Responda em português
`;

export async function POST(req: Request) {
  const { message, sessionId } = await req.json();

  try {
    const facts = await prisma.personalFact.findMany();
    const factsText = facts.map((f) => `- ${f.key}: ${f.value}`).join("\n");
    const context = PERSONAL_CONTEXT.replace("{{FACTS}}", factsText);

    if (sessionId) {
      await prisma.message.create({
        data: {
          content: message,
          role: "user",
          sessionId: parseInt(sessionId),
        },
      });
    }

    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("Chave da API Gemini não configurada");
    }

    const previousMessages = sessionId
      ? await prisma.message.findMany({
          where: { sessionId: parseInt(sessionId) },
          orderBy: { createdAt: "asc" },
        })
      : [];

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

    const prompt = `
      ${context}
      
      Histórico da conversa:
      ${previousMessages.map((msg) => `${msg.role}: ${msg.content}`).join("\n")}
      
      Nova mensagem:
      ${message}
    `;

    const requestBody = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || "Erro ao acessar a API Gemini");
    }

    const data = await res.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Não consegui gerar uma resposta";

    if (sessionId) {
      await prisma.message.create({
        data: {
          content: text,
          role: "assistant",
          sessionId: parseInt(sessionId),
        },
      });
    }

    return NextResponse.json({ response: text, sessionId });
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
