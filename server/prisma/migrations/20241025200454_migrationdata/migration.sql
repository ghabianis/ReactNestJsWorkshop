/*
  Warnings:

  - You are about to drop the column `isDone` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `isInPorgress` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "isDone",
DROP COLUMN "isInPorgress",
ADD COLUMN     "isActive" BOOLEAN DEFAULT true;
