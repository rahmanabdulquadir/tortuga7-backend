/*
  Warnings:

  - You are about to drop the column `name` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Partner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Specs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_partnerId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Specs" DROP CONSTRAINT "Specs_productId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderProduct";

-- DropTable
DROP TABLE "Partner";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Specs";

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keyApplications" TEXT[],
    "keyFeatures" TEXT[],
    "specifications" JSONB NOT NULL,
    "images" TEXT[],
    "serviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_slug_key" ON "Item"("slug");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
