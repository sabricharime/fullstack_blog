-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('PENDING', 'PUBLISHED', 'ARCHIVED', 'DELETED');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "postStatus" "PostStatus" NOT NULL DEFAULT 'PENDING';
