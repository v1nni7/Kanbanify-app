/*
  Warnings:

  - You are about to drop the column `usersId` on the `Boards` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Boards" DROP CONSTRAINT "Boards_usersId_fkey";

-- AlterTable
ALTER TABLE "Boards" DROP COLUMN "usersId",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Boards" ADD CONSTRAINT "Boards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
