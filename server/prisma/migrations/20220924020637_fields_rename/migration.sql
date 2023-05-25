/*
  Warnings:

  - You are about to drop the column `boardsId` on the `Columns` table. All the data in the column will be lost.
  - You are about to drop the column `columnsId` on the `Tasks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Columns" DROP CONSTRAINT "Columns_boardsId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_columnsId_fkey";

-- AlterTable
ALTER TABLE "Columns" DROP COLUMN "boardsId",
ADD COLUMN     "boardId" INTEGER;

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "columnsId",
ADD COLUMN     "columnId" INTEGER;

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Boards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Columns"("id") ON DELETE SET NULL ON UPDATE CASCADE;
