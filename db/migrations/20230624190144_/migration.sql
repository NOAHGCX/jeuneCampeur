/*
  Warnings:

  - A unique constraint covering the columns `[idUser]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Card_idUser_key" ON "Card"("idUser");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
