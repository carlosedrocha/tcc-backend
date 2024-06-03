/*
  Warnings:

  - You are about to drop the `_DishToOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ItemToOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DishToOrder" DROP CONSTRAINT "_DishToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_DishToOrder" DROP CONSTRAINT "_DishToOrder_B_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToOrder" DROP CONSTRAINT "_ItemToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToOrder" DROP CONSTRAINT "_ItemToOrder_B_fkey";

-- DropTable
DROP TABLE "_DishToOrder";

-- DropTable
DROP TABLE "_ItemToOrder";

-- CreateTable
CREATE TABLE "dish_orders" (
    "id" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "dish_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_orders" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "item_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dish_orders" ADD CONSTRAINT "dish_orders_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_orders" ADD CONSTRAINT "dish_orders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_orders" ADD CONSTRAINT "item_orders_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_orders" ADD CONSTRAINT "item_orders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
