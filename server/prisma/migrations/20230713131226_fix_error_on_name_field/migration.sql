/*
  Warnings:

  - You are about to drop the column `name` on the `feedbacks` table. All the data in the column will be lost.
  - Added the required column `username` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL;
