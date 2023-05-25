/*
  Warnings:

  - You are about to drop the column `stringId` on the `Boards` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Boards` table. All the data in the column will be lost.
  - You are about to drop the column `boardId` on the `Columns` table. All the data in the column will be lost.
  - You are about to drop the column `stringId` on the `Columns` table. All the data in the column will be lost.
  - You are about to drop the column `boardId` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `columnId` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `stringId` on the `Tasks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `Columns` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Tasks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `safeUrl` to the `Boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `Columns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `Columns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Boards" DROP CONSTRAINT "Boards_userId_fkey";

-- DropForeignKey
ALTER TABLE "Columns" DROP CONSTRAINT "Columns_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_columnId_fkey";

-- DropIndex
DROP INDEX "Boards_stringId_key";

-- DropIndex
DROP INDEX "Columns_stringId_key";

-- DropIndex
DROP INDEX "Tasks_stringId_key";

-- AlterTable
ALTER TABLE "Boards" DROP COLUMN "stringId",
DROP COLUMN "userId",
ADD COLUMN     "safeUrl" TEXT NOT NULL,
ADD COLUMN     "usersId" INTEGER;

-- AlterTable
ALTER TABLE "Columns" DROP COLUMN "boardId",
DROP COLUMN "stringId",
ADD COLUMN     "boardsId" INTEGER,
ADD COLUMN     "taskId" TEXT NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "boardId",
DROP COLUMN "columnId",
DROP COLUMN "order",
DROP COLUMN "stringId",
ADD COLUMN     "columnsId" INTEGER,
ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Columns_uuid_key" ON "Columns"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_uuid_key" ON "Tasks"("uuid");

-- AddForeignKey
ALTER TABLE "Boards" ADD CONSTRAINT "Boards_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_boardsId_fkey" FOREIGN KEY ("boardsId") REFERENCES "Boards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_columnsId_fkey" FOREIGN KEY ("columnsId") REFERENCES "Columns"("id") ON DELETE SET NULL ON UPDATE CASCADE;
