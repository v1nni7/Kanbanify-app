-- DropForeignKey
ALTER TABLE "Columns" DROP CONSTRAINT "Columns_boardsId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_boardsId_fkey";

-- AlterTable
ALTER TABLE "Columns" ALTER COLUMN "boardsId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "boardsId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_boardsId_fkey" FOREIGN KEY ("boardsId") REFERENCES "Boards"("stringId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_boardsId_fkey" FOREIGN KEY ("boardsId") REFERENCES "Boards"("stringId") ON DELETE RESTRICT ON UPDATE CASCADE;
