/*
  Warnings:

  - You are about to drop the column `serviceName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `specifications` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_serviceId_fkey";

-- DropIndex
DROP INDEX "Product_serviceId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "serviceName",
DROP COLUMN "specifications";

-- AlterTable
ALTER TABLE "Spec" ADD COLUMN     "productId" TEXT;

-- DropTable
DROP TABLE "Item";

-- AddForeignKey
ALTER TABLE "Spec" ADD CONSTRAINT "Spec_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
