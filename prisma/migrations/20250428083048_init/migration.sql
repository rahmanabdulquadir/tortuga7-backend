/*
  Warnings:

  - A unique constraint covering the columns `[serviceId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "serviceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_serviceId_key" ON "Product"("serviceId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
