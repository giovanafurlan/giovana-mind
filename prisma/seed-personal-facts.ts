import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function obterDadosDaAPI() {
  const url = process.env.NEXT_PUBLIC_API_URL;

  try {
    if (!url) throw new Error("API URL não está definida");
    const resposta = await fetch(url);

    if (!resposta.ok) throw new Error("Falha ao buscar dados da API");
    return await resposta.json();
  } catch (erro) {
    console.error("Erro ao acessar API:", erro);
    return [];
  }
}

async function main() {
  const dadosAPI = await obterDadosDaAPI();

  if (!dadosAPI || dadosAPI.length === 0) {
    console.log("Nenhum dado encontrado na API");
    return;
  }

  for (const dado of dadosAPI) {
    try {
      await prisma.personalFact.upsert({
        where: { key: dado.key },
        update: {
          value: dado.value,
          category: dado.category || "geral",
          tone: dado.tone || "neutral",
        },
        create: {
          key: dado.key,
          value: dado.value,
          category: dado.category || "geral",
          tone: dado.tone || "neutral",
        },
      });
    } catch (erro) {
      console.error(`Erro ao processar ${dado.key}:`, erro);
    }
  }
  console.log("Dados sincronizados com sucesso");
}

main()
  .catch((e) => {
    console.error("Falha na execução:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
