import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getCardByUser(userId: number) {
  try {
    const card = await prisma.card.findFirst({
      where: {
        user: {id : userId}
      },
      include: {
        user: true,
        product_Card: {
          include: {
            product: true,
          },
        },
      }
    });
    return card;
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
