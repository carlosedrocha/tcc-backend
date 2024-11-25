/*
  Warnings:

  - You are about to drop the `_DishToMenu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DishToMenu" DROP CONSTRAINT "_DishToMenu_A_fkey";

-- DropForeignKey
ALTER TABLE "_DishToMenu" DROP CONSTRAINT "_DishToMenu_B_fkey";

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "_DishToMenu";

-- CreateTable
CREATE TABLE "sections" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DishToSection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DishToSection_AB_unique" ON "_DishToSection"("A", "B");

-- CreateIndex
CREATE INDEX "_DishToSection_B_index" ON "_DishToSection"("B");

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToSection" ADD CONSTRAINT "_DishToSection_A_fkey" FOREIGN KEY ("A") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToSection" ADD CONSTRAINT "_DishToSection_B_fkey" FOREIGN KEY ("B") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
