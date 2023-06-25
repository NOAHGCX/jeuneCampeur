/*
  Warnings:

  - You are about to drop the column `number` on the `Product_BDC` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Product_Card` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Product_BDC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Product_Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product_BDC" DROP COLUMN "number",
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product_Card" DROP COLUMN "number",
ADD COLUMN     "quantity" INTEGER NOT NULL;
