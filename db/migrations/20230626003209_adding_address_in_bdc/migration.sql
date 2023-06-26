/*
  Warnings:

  - Added the required column `idAddressBase` to the `BDC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idAddressFact` to the `BDC` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BDC" ADD COLUMN     "idAddressBase" INTEGER NOT NULL,
ADD COLUMN     "idAddressFact" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BDC" ADD CONSTRAINT "BDC_idAddressBase_fkey" FOREIGN KEY ("idAddressBase") REFERENCES "Address_Base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BDC" ADD CONSTRAINT "BDC_idAddressFact_fkey" FOREIGN KEY ("idAddressFact") REFERENCES "Address_Fact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
