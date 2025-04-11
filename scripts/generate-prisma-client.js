#!/usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

console.log("Running Prisma Client generation...");

try {
  const prismaSchemaPath = path.join(process.cwd(), "prisma/schema.prisma");
  if (!fs.existsSync(prismaSchemaPath)) {
    throw new Error("Prisma schema not found at " + prismaSchemaPath);
  }

  execSync("npx prisma generate", { stdio: "inherit" });

  console.log("Prisma Client generated successfully!");
} catch (error) {
  console.error("Failed to generate Prisma Client:");
  console.error(error);
  process.exit(1);
}
