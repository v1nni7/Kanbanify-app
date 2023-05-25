/*
  Warnings:

  - A unique constraint covering the columns `[stringId]` on the table `Columns` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stringId]` on the table `Tasks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stringId` to the `Columns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stringId` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Columns" ADD COLUMN     "stringId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "stringId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Columns_stringId_key" ON "Columns"("stringId");

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_stringId_key" ON "Tasks"("stringId");
