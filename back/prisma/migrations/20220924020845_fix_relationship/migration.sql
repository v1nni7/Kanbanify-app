/*
  Warnings:

  - A unique constraint covering the columns `[safeUrl]` on the table `Boards` will be added. If there are existing duplicate values, this will fail.
  - Made the column `boardId` on table `Columns` required. This step will fail if there are existing NULL values in that column.
  - Made the column `columnId` on table `Tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Columns" DROP CONSTRAINT "Columns_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_columnId_fkey";

-- AlterTable
ALTER TABLE "Columns" ALTER COLUMN "boardId" SET NOT NULL,
ALTER COLUMN "boardId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "columnId" SET NOT NULL,
ALTER COLUMN "columnId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Boards_safeUrl_key" ON "Boards"("safeUrl");

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Boards"("safeUrl") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Columns"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
