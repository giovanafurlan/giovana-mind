-- CreateTable
CREATE TABLE "PersonalFact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "category" TEXT NOT NULL,
    "tone" TEXT NOT NULL DEFAULT 'neutral'
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalFact_key_key" ON "PersonalFact"("key");
