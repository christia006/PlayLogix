/*
  Warnings:

  - You are about to drop the column `start` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "start",
ADD COLUMN     "stars" TEXT[];
