-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "attackPattern" TEXT NOT NULL,
    "movementPattern" TEXT NOT NULL,
    "ability" TEXT NOT NULL,
    "adjacencyBonus" TEXT NOT NULL,
    "weakness" TEXT NOT NULL,
    "unsplashImgId" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
