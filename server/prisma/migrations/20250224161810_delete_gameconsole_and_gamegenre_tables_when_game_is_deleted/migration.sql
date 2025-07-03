-- DropForeignKey
ALTER TABLE "GameConsole" DROP CONSTRAINT "GameConsole_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameGenre" DROP CONSTRAINT "GameGenre_gameId_fkey";

-- AddForeignKey
ALTER TABLE "GameConsole" ADD CONSTRAINT "GameConsole_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameGenre" ADD CONSTRAINT "GameGenre_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
