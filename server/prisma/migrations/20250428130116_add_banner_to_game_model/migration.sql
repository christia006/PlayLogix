/*
  Warnings:

  - Made the column `image` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "banner" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "image" SET NOT NULL;
