/*
  Warnings:

  - A unique constraint covering the columns `[stringId]` on the table `Workspaces` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stringId` to the `Workspaces` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workspaces" ADD COLUMN     "stringId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workspaces_stringId_key" ON "Workspaces"("stringId");
