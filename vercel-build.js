const { execSync } = require("child_process");

execSync("prisma generate", { stdio: "inherit" });
execSync("next build", { stdio: "inherit" });
