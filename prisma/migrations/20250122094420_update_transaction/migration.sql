/*
  Warnings:

  - You are about to drop the column `transactionId` on the `InfoStock` table. All the data in the column will be lost.
  - You are about to drop the column `infoStockId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `lastStock` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InfoStock" DROP CONSTRAINT "InfoStock_transactionId_fkey";

-- AlterTable
ALTER TABLE "InfoStock" DROP COLUMN "transactionId";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "lastStock" INTEGER NOT NULL,
ALTER COLUMN "wacc" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "sellingPrice" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "infoStockId",
ALTER COLUMN "totalPrice" SET DATA TYPE DOUBLE PRECISION;
