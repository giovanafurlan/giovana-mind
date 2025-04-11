import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "default@example.com" },
    update: {},
    create: {
      email: "default@example.com",
      name: "Default User",
    },
  });

  console.log("Created default user:", user);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
