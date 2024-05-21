/*
  Warnings:

  - You are about to drop the column `dishId` on the `categories` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TabStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "TabOwner" AS ENUM ('CUSTOMER', 'WAITER');

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_dishId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "dishId";

-- CreateTable
CREATE TABLE "tabs" (
    "id" TEXT NOT NULL,
    "tabNumber" INTEGER,
    "userId" TEXT NOT NULL,
    "total" DOUBLE PRECISION,
    "status" "TabStatus" NOT NULL DEFAULT 'OPEN',
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tabs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "tabId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToDish" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ItemToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DishToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToDish_AB_unique" ON "_CategoryToDish"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToDish_B_index" ON "_CategoryToDish"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToOrder_AB_unique" ON "_ItemToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToOrder_B_index" ON "_ItemToOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DishToOrder_AB_unique" ON "_DishToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_DishToOrder_B_index" ON "_DishToOrder"("B");

-- AddForeignKey
ALTER TABLE "tabs" ADD CONSTRAINT "tabs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_tabId_fkey" FOREIGN KEY ("tabId") REFERENCES "tabs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDish" ADD CONSTRAINT "_CategoryToDish_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDish" ADD CONSTRAINT "_CategoryToDish_B_fkey" FOREIGN KEY ("B") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToOrder" ADD CONSTRAINT "_ItemToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToOrder" ADD CONSTRAINT "_ItemToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToOrder" ADD CONSTRAINT "_DishToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToOrder" ADD CONSTRAINT "_DishToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
