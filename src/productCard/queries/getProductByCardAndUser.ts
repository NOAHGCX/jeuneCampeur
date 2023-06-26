import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAllReviewsByProductId(cardId: number, productId: number) {
  try {
    const product_Card = await prisma.product_Card.findFirst({
      where: {
        AND: [
          {
            card: {id : cardId},
          },
          {
            product: {id : productId},
          },
        ],
      },
      select: {
        id: true,
      },
    });
    return product_Card;
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
