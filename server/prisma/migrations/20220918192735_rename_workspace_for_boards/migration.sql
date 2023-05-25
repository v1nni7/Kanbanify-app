/*
  Warnings:

  - You are about to drop the column `workspaceId` on the `Columns` table. All the data in the column will be lost.
  - You are about to drop the `Workspaces` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `boardsId` to the `Columns` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Columns" DROP CONSTRAINT "Columns_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "Workspaces" DROP CONSTRAINT "Workspaces_userId_fkey";

-- AlterTable
ALTER TABLE "Columns" DROP COLUMN "workspaceId",
ADD COLUMN     "boardsId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Workspaces";

-- CreateTable
CREATE TABLE "Boards" (
    "id" SERIAL NOT NULL,
    "stringId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "background" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Boards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Boards_stringId_key" ON "Boards"("stringId");

-- AddForeignKey
ALTER TABLE "Boards" ADD CONSTRAINT "Boards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_boardsId_fkey" FOREIGN KEY ("boardsId") REFERENCES "Boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
