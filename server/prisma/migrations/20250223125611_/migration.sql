/*
  Warnings:

  - You are about to drop the `_GameConsole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GameGenre` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Console` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Console` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `releaseYear` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_GameConsole" DROP CONSTRAINT "_GameConsole_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameConsole" DROP CONSTRAINT "_GameConsole_B_fkey";

-- DropForeignKey
ALTER TABLE "_GameGenre" DROP CONSTRAINT "_GameGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameGenre" DROP CONSTRAINT "_GameGenre_B_fkey";

-- AlterTable
ALTER TABLE "Console" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "releaseYear",
ADD COLUMN     "releaseYear" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_GameConsole";

-- DropTable
DROP TABLE "_GameGenre";

-- CreateTable
CREATE TABLE "GameConsole" (
    "gameId" INTEGER NOT NULL,
    "consoleId" INTEGER NOT NULL,

    CONSTRAINT "GameConsole_pkey" PRIMARY KEY ("gameId","consoleId")
);

-- CreateTable
CREATE TABLE "GameGenre" (
    "gameId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "GameGenre_pkey" PRIMARY KEY ("gameId","genreId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Console_name_key" ON "Console"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- AddForeignKey
ALTER TABLE "GameConsole" ADD CONSTRAINT "GameConsole_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameConsole" ADD CONSTRAINT "GameConsole_consoleId_fkey" FOREIGN KEY ("consoleId") REFERENCES "Console"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameGenre" ADD CONSTRAINT "GameGenre_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameGenre" ADD CONSTRAINT "GameGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
