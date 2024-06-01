-- DropForeignKey
ALTER TABLE "entities" DROP CONSTRAINT "entities_userId_fkey";

-- AlterTable
ALTER TABLE "entities" ADD COLUMN     "cpf" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
