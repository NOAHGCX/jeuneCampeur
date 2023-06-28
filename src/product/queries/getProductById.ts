import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAllReviewsByProductId(id: number) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id
      },
    });
    return product;
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
