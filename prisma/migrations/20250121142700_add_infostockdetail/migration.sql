-- CreateTable
CREATE TABLE "InfoStock" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "transactionId" TEXT,
    "itemId" INTEGER,
    "startStock" INTEGER NOT NULL,
    "endStock" INTEGER NOT NULL,
    "startAmmount" INTEGER NOT NULL,
    "stockIn" INTEGER NOT NULL,
    "stockInAmmount" INTEGER NOT NULL,
    "stockOut" INTEGER NOT NULL,
    "stockOutAmmount" INTEGER NOT NULL,
    "stockTotal" INTEGER NOT NULL,
    "ammountTotal" INTEGER NOT NULL,

    CONSTRAINT "InfoStock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InfoStock_transactionId_key" ON "InfoStock"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "InfoStock_itemId_key" ON "InfoStock"("itemId");

-- AddForeignKey
ALTER TABLE "InfoStock" ADD CONSTRAINT "InfoStock_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfoStock" ADD CONSTRAINT "InfoStock_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
