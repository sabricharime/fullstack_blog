/*
  Warnings:

  - You are about to drop the column `bioID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Bio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_bioID_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bioID";

-- DropTable
DROP TABLE "Bio";
