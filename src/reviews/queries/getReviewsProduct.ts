import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAllReviewsByProductId(productId: number) {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        idProduct: productId,
      },
      include: {
        user: true,
      },
    });
    return reviews;
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
