/*
  Warnings:

  - You are about to drop the column `TotalPrice` on the `BDC` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `BDC` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BDC" DROP COLUMN "TotalPrice",
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;
