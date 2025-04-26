-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productModel" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keyApplications" TEXT[],
    "keyFeatures" TEXT[],
    "specifications" JSONB NOT NULL,
    "images" TEXT[],
    "price" DOUBLE PRECISION NOT NULL,
    "available" BOOLEAN NOT NULL,
    "serviceName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
