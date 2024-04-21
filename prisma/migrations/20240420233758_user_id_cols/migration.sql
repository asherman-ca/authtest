/*
  Warnings:

  - Added the required column `userId` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TestChild` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TestChild" ADD COLUMN     "userId" TEXT NOT NULL;
