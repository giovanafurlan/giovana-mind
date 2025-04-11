import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  const { message, sessionId } = await req.json();

  try {
    if (sessionId && prisma) {
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

    let previousMessages: { role: string; content: string }[] = [];
    if (sessionId && prisma) {
      const messages = await prisma.message.findMany({
        where: { sessionId: parseInt(sessionId) },
        orderBy: { createdAt: "asc" },
      });
      previousMessages = messages || [];
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

    const messages = [
      ...previousMessages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
      {
        role: "user" as const,
        parts: [{ text: message }],
      },
    ];

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: messages,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || "Erro ao acessar a API Gemini");
    }

    const data = await res.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Não consegui gerar uma resposta";

    if (sessionId && prisma) {
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