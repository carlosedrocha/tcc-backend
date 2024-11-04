-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "userId" TEXT,
    "payload" JSONB,
    "status" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;