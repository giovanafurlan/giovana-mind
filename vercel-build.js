const { execSync } = require("child_process");

console.log("🚀 Starting Vercel build process...");

// 1. Generate Prisma Client
console.log("🔧 Generating Prisma Client...");
execSync("npx prisma generate", { stdio: "inherit" });

// 2. Run migrations
console.log("🔄 Running database migrations...");
execSync("npx prisma migrate deploy", { stdio: "inherit" });

// 3. Run seed scripts
const runSeed = (scriptName) => {
  console.log(`🌱 Running ${scriptName}...`);
  try {
    // Fixed JSON string formatting
    execSync(
      `npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/${scriptName}`,
      {
        stdio: "inherit",
        env: {
          ...process.env,
          DATABASE_URL: process.env.DATABASE_URL,
        },
      }
    );
    console.log(`✅ ${scriptName} completed successfully`);
  } catch (error) {
    console.error(`❌ ${scriptName} failed:`, error);
    process.exit(1);
  }
};

// Run both seed files sequentially
runSeed("seed.ts"); // For user data
runSeed("seed-personal-facts.ts"); // For personal facts

// 4. Build Next.js
console.log("🏗 Building Next.js application...");
execSync("next build", { stdio: "inherit" });

console.log("🎉 Build completed successfully!");
