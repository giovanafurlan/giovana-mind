import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    const session = await prisma.session.create({
      data: {
        title: title || "Novo Chat",
        userId: 1,
      },
    });

    return NextResponse.json(session);
  } catch (err) {
    console.error("Erro ao criar sessão:", err);
    return NextResponse.json(
      { error: "Falha ao criar sessão" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID da sessão é obrigatório" },
        { status: 400 }
      );
    }

    const session = await prisma.session.findUnique({
      where: { id: parseInt(id) },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Sessão não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      session,
      messages: session.messages,
    });
  } catch (err) {
    console.error("Erro ao buscar sessão:", err);
    return NextResponse.json(
      { error: "Falha ao recuperar sessão" },
      { status: 500 }
    );
  }
}