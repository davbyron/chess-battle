/*
  Warnings:

  - You are about to drop the column `ability` on the `Card` table. All the data in the column will be lost.
  - Added the required column `text` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "ability",
ADD COLUMN     "text" TEXT NOT NULL;
