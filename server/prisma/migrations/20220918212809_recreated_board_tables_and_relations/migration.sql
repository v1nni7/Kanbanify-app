/*
  Warnings:

  - You are about to drop the column `userId` on the `Boards` table. All the data in the column will be lost.
  - You are about to drop the column `stringId` on the `Columns` table. All the data in the column will be lost.
  - You are about to drop the column `columnId` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `stringId` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `usersId` to the `Boards` table without a default value. This is not possible if the table is not empty.
  - Made the column `background` on table `Boards` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `columnsId` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Boards" DROP CONSTRAINT "Boards_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_columnId_fkey";

-- AlterTable
ALTER TABLE "Boards" DROP COLUMN "userId",
ADD COLUMN     "usersId" INTEGER NOT NULL,
ALTER COLUMN "background" SET NOT NULL;

-- AlterTable
ALTER TABLE "Columns" DROP COLUMN "stringId";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "columnId",
DROP COLUMN "stringId",
ADD COLUMN     "columnsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Boards" ADD CONSTRAINT "Boards_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_columnsId_fkey" FOREIGN KEY ("columnsId") REFERENCES "Columns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
