const { execSync } = require("child_process");
const fs = require("fs");

// Create database directory if it doesn't exist
if (!fs.existsSync("./prisma")) {
  fs.mkdirSync("./prisma");
}

// Copy database file if it exists in your repo
if (fs.existsSync("./prisma/dev.db")) {
  fs.copyFileSync("./prisma/dev.db", "/tmp/dev.db");
}

// Set DATABASE_URL to use /tmp directory
process.env.DATABASE_URL = "file:/tmp/dev.db";

// Run builds
execSync("prisma generate", { stdio: "inherit" });
execSync("next build", { stdio: "inherit" });
