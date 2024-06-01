-- AlterTable
ALTER TABLE "tabs" ADD COLUMN     "entityId" TEXT;

-- AddForeignKey
ALTER TABLE "tabs" ADD CONSTRAINT "tabs_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "entities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
