import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAllReviewsByProductId(userId: number) {
  try {
    const wishlists = await prisma.wishlist.findMany({
      where: {
        user: {id : userId}
      },
      include: {
        user: true,
        products: true
      },
    });
    return wishlists;
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
