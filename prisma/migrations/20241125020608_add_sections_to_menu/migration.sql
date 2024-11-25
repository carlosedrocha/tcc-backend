-- CreateTable
CREATE TABLE "_ItemToSection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToSection_AB_unique" ON "_ItemToSection"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToSection_B_index" ON "_ItemToSection"("B");

-- AddForeignKey
ALTER TABLE "_ItemToSection" ADD CONSTRAINT "_ItemToSection_A_fkey" FOREIGN KEY ("A") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToSection" ADD CONSTRAINT "_ItemToSection_B_fkey" FOREIGN KEY ("B") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
