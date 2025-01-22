/*
  Warnings:

  - You are about to drop the column `itemId` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "itemId";

-- CreateTable
CREATE TABLE "_ItemToTransaction" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ItemToTransaction_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ItemToTransaction_B_index" ON "_ItemToTransaction"("B");

-- AddForeignKey
ALTER TABLE "_ItemToTransaction" ADD CONSTRAINT "_ItemToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToTransaction" ADD CONSTRAINT "_ItemToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
