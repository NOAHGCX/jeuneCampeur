/*
  Warnings:

  - Added the required column `TotalPrice` to the `BDC` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'DELIVERED', 'ERROR');

-- AlterTable
ALTER TABLE "BDC" ADD COLUMN     "TotalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "deliveryStatus" "DeliveryStatus" NOT NULL DEFAULT 'PENDING';
