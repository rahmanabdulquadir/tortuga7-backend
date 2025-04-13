-- CreateTable
CREATE TABLE "Specs" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productSKUs" TEXT,
    "motherboard" TEXT,
    "processor" TEXT,
    "systemMemory" TEXT,
    "onBoardDevices" TEXT,
    "inputOutput" TEXT,
    "systemBIOS" TEXT,
    "management" TEXT,
    "security" TEXT,
    "pcHealthMonitoring" TEXT,
    "chassis" TEXT,
    "dimensionsAndWeight" TEXT,
    "expansionSlots" TEXT,
    "driveBaysStorage" TEXT,
    "systemCooling" TEXT,
    "powerSupply" TEXT,
    "operatingEnvironment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Specs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Specs_productId_key" ON "Specs"("productId");

-- AddForeignKey
ALTER TABLE "Specs" ADD CONSTRAINT "Specs_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
