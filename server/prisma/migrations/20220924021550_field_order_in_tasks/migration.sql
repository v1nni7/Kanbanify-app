/*
  Warnings:

  - Added the required column `order` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "order" INTEGER NOT NULL;
