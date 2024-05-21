/*
  Warnings:

  - You are about to drop the column `dishId` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `items` table. All the data in the column will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemTypeId` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_dishId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roleId_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "dishId",
DROP COLUMN "price",
DROP COLUMN "type",
ADD COLUMN     "cost" DOUBLE PRECISION,
ADD COLUMN     "itemTypeId" TEXT NOT NULL,
ADD COLUMN     "measurementUnit" TEXT,
ADD COLUMN     "measurementUnitValue" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "roleId" DROP NOT NULL;

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "Role";

-- DropEnum
DROP TYPE "ItemType";

-- CreateTable
CREATE TABLE "item_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "item_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dish_ingredients" (
    "id" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "dish_ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "item_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_ingredients" ADD CONSTRAINT "dish_ingredients_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_ingredients" ADD CONSTRAINT "dish_ingredients_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
