/*
  Warnings:

  - You are about to drop the column `usersId` on the `Boards` table. All the data in the column will be lost.
  - You are about to drop the column `boardsId` on the `Columns` table. All the data in the column will be lost.
  - You are about to drop the column `boardsId` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `columnsId` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boardId` to the `Columns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boardId` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `columnId` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Boards" DROP CONSTRAINT "Boards_usersId_fkey";

-- DropForeignKey
ALTER TABLE "Columns" DROP CONSTRAINT "Columns_boardsId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_boardsId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_columnsId_fkey";

-- AlterTable
ALTER TABLE "Boards" DROP COLUMN "usersId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Columns" DROP COLUMN "boardsId",
ADD COLUMN     "boardId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "boardsId",
DROP COLUMN "columnsId",
ADD COLUMN     "boardId" TEXT NOT NULL,
ADD COLUMN     "columnId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Boards" ADD CONSTRAINT "Boards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Boards"("stringId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Boards"("stringId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Columns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
