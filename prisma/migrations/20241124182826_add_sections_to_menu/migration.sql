/*
  Warnings:

  - You are about to drop the column `menuId` on the `sections` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sections" DROP CONSTRAINT "sections_menuId_fkey";

-- AlterTable
ALTER TABLE "sections" DROP COLUMN "menuId";

-- CreateTable
CREATE TABLE "_MenuToSection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MenuToSection_AB_unique" ON "_MenuToSection"("A", "B");

-- CreateIndex
CREATE INDEX "_MenuToSection_B_index" ON "_MenuToSection"("B");

-- AddForeignKey
ALTER TABLE "_MenuToSection" ADD CONSTRAINT "_MenuToSection_A_fkey" FOREIGN KEY ("A") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuToSection" ADD CONSTRAINT "_MenuToSection_B_fkey" FOREIGN KEY ("B") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
