/*
  Warnings:

  - The values [SALE,PAYMENT] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('EXPENSE', 'INCOME');
ALTER TABLE "transactions" ALTER COLUMN "transactionType" TYPE "TransactionType_new" USING ("transactionType"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "TransactionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "menus" ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "sections" ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "_DishToMenu" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DishToMenu_AB_unique" ON "_DishToMenu"("A", "B");

-- CreateIndex
CREATE INDEX "_DishToMenu_B_index" ON "_DishToMenu"("B");

-- AddForeignKey
ALTER TABLE "_DishToMenu" ADD CONSTRAINT "_DishToMenu_A_fkey" FOREIGN KEY ("A") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToMenu" ADD CONSTRAINT "_DishToMenu_B_fkey" FOREIGN KEY ("B") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
