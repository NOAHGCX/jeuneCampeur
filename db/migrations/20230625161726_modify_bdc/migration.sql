/*
  Warnings:

  - You are about to drop the column `idCard` on the `BDC` table. All the data in the column will be lost.
  - Added the required column `idUser` to the `BDC` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BDC_idCard_key";

-- AlterTable
ALTER TABLE "BDC" DROP COLUMN "idCard",
ADD COLUMN     "idUser" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BDC" ADD CONSTRAINT "BDC_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
