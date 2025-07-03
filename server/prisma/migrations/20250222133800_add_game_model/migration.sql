-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "writers" TEXT[],
    "start" TEXT[],
    "consoles" TEXT[],
    "genre" TEXT[],
    "price" INTEGER NOT NULL,
    "gameplayHours" INTEGER NOT NULL,
    "trailer" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
