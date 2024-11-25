-- CreateTable
CREATE TABLE "_ItemToMenu" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToMenu_AB_unique" ON "_ItemToMenu"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToMenu_B_index" ON "_ItemToMenu"("B");

-- AddForeignKey
ALTER TABLE "_ItemToMenu" ADD CONSTRAINT "_ItemToMenu_A_fkey" FOREIGN KEY ("A") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToMenu" ADD CONSTRAINT "_ItemToMenu_B_fkey" FOREIGN KEY ("B") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
