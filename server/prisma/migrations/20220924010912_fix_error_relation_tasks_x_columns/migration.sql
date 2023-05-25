-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_columnId_fkey";

-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "columnId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Columns"("stringId") ON DELETE RESTRICT ON UPDATE CASCADE;
