import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const facts = await prisma.personalFact.findMany({
      orderBy: { key: "asc" },
    });
    return NextResponse.json(facts);
  } catch (err/* eslint-disable-line @typescript-eslint/no-unused-vars */) {
    return NextResponse.json(
      { error: "Falha ao buscar informações pessoais" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Adicione category e tone ao destructuring
    const { key, value, category, tone } = await req.json();

    if (!key || !value) {
      return NextResponse.json(
        { error: "Chave e valor são obrigatórios" },
        { status: 400 }
      );
    }

    const newFact = await prisma.personalFact.create({
      // Inclua category e tone nos dados criados
      data: { 
        key, 
        value, 
        category: category || "geral", // Fallback para "geral" se não enviado
        tone: tone || "neutral"        // Fallback para "neutral" se não enviado
      },
    });

    return NextResponse.json(newFact, { status: 201 });
  } catch (err) {
    if (err instanceof Error && (err as any).code === "P2002") {
      return NextResponse.json(
        { error: "Uma informação com esta chave já existe" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Falha ao criar informação pessoal" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    // Adicione category e tone ao destructuring
    const { id, key, value, category, tone } = await req.json();

    if (!id || !key || !value) {
      return NextResponse.json(
        { error: "ID, chave e valor são obrigatórios" },
        { status: 400 }
      );
    }

    const updatedFact = await prisma.personalFact.update({
      where: { id },
      // Inclua category e tone na atualização
      data: { 
        key, 
        value, 
        category, 
        tone 
      },
    });

    return NextResponse.json(updatedFact);
  } catch (err) {
    if (err instanceof Error && (err as any).code === "P2025") {
      return NextResponse.json(
        { error: "Informação não encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Falha ao atualizar informação pessoal" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID da informação é obrigatório" },
        { status: 400 }
      );
    }

    await prisma.personalFact.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Informação removida com sucesso" },
      { status: 200 }
    );
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (err instanceof Error && (err as any).code === "P2025") {
      return NextResponse.json(
        { error: "Informação não encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Falha ao remover informação pessoal" },
      { status: 500 }
    );
  }
}
