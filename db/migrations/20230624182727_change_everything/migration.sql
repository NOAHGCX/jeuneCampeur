/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `idProduct` on the `Wishlist` table. All the data in the column will be lost.
  - You are about to drop the `Product_Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product_Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product_Pictures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product_Wishlist` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Pictures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product_Card" DROP CONSTRAINT "Product_Card_idCard_fkey";

-- DropForeignKey
ALTER TABLE "Product_Card" DROP CONSTRAINT "Product_Card_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "Product_Category" DROP CONSTRAINT "Product_Category_idCategory_fkey";

-- DropForeignKey
ALTER TABLE "Product_Category" DROP CONSTRAINT "Product_Category_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "Product_Pictures" DROP CONSTRAINT "Product_Pictures_idPicture_fkey";

-- DropForeignKey
ALTER TABLE "Product_Pictures" DROP CONSTRAINT "Product_Pictures_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "Product_Wishlist" DROP CONSTRAINT "Product_Wishlist_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "Product_Wishlist" DROP CONSTRAINT "Product_Wishlist_idWishlist_fkey";

-- AlterTable
ALTER TABLE "Pictures" ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "idProduct";

-- DropTable
DROP TABLE "Product_Card";

-- DropTable
DROP TABLE "Product_Category";

-- DropTable
DROP TABLE "Product_Pictures";

-- DropTable
DROP TABLE "Product_Wishlist";

-- CreateTable
CREATE TABLE "_ProductToWishlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CardToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToWishlist_AB_unique" ON "_ProductToWishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToWishlist_B_index" ON "_ProductToWishlist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToProduct_AB_unique" ON "_CardToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToProduct_B_index" ON "_CardToProduct"("B");

-- AddForeignKey
ALTER TABLE "Pictures" ADD CONSTRAINT "Pictures_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToWishlist" ADD CONSTRAINT "_ProductToWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToWishlist" ADD CONSTRAINT "_ProductToWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToProduct" ADD CONSTRAINT "_CardToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToProduct" ADD CONSTRAINT "_CardToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
