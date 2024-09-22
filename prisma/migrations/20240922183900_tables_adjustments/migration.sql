/*
  Warnings:

  - You are about to drop the column `stockId` on the `transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[itemId]` on the table `stocks` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `paymentMethod` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionPaymentMethod" AS ENUM ('CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'TRANSFER');

-- DropForeignKey
ALTER TABLE "stock_movements" DROP CONSTRAINT "stock_movements_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_stockId_fkey";

-- AlterTable
ALTER TABLE "stock_movements" ALTER COLUMN "transactionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "stockId",
DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" "TransactionPaymentMethod" NOT NULL;

-- DropEnum
DROP TYPE "PaymentMethod";

-- CreateIndex
CREATE UNIQUE INDEX "stocks_itemId_key" ON "stocks"("itemId");

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
