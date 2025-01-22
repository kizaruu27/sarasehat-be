/*
  Warnings:

  - You are about to drop the `_ItemToTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ItemToTransaction" DROP CONSTRAINT "_ItemToTransaction_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToTransaction" DROP CONSTRAINT "_ItemToTransaction_B_fkey";

-- DropTable
DROP TABLE "_ItemToTransaction";

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "qty" INTEGER NOT NULL,
    "itemId" INTEGER,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_itemId_key" ON "Cart"("itemId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
