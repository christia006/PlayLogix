/*
  Warnings:

  - You are about to drop the column `imageFallback` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "imageFallback",
ALTER COLUMN "image" SET DEFAULT 'https://social-network-js.vercel.app/img/profile5.png',
ALTER COLUMN "image" SET DATA TYPE TEXT;
