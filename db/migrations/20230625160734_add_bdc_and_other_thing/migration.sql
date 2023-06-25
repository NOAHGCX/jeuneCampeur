/*
  Warnings:

  - You are about to drop the `_CardToProduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[idCard]` on the table `BDC` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idCard` to the `BDC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BDC` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CardToProduct" DROP CONSTRAINT "_CardToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardToProduct" DROP CONSTRAINT "_CardToProduct_B_fkey";

-- AlterTable
ALTER TABLE "BDC" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "idCard" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_CardToProduct";

-- CreateTable
CREATE TABLE "Product_Card" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idCard" INTEGER NOT NULL,
    "idProduct" INTEGER NOT NULL,

    CONSTRAINT "Product_Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_BDC" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idBDC" INTEGER NOT NULL,
    "idProduct" INTEGER NOT NULL,

    CONSTRAINT "Product_BDC_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BDC_idCard_key" ON "BDC"("idCard");

-- AddForeignKey
ALTER TABLE "Product_Card" ADD CONSTRAINT "Product_Card_idCard_fkey" FOREIGN KEY ("idCard") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Card" ADD CONSTRAINT "Product_Card_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_BDC" ADD CONSTRAINT "Product_BDC_idBDC_fkey" FOREIGN KEY ("idBDC") REFERENCES "BDC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_BDC" ADD CONSTRAINT "Product_BDC_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
