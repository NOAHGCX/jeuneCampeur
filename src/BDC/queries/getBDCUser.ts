import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getBDCByUser(userId: number) {
  try {
    const bdc = await prisma.bDC.findMany({
      where: {
        user: {id : userId}
      },
      include: {
        product_BDC: {
          include: {
            product: true
          }
        },
        address_base : true,
        address_fact : true,
      },
    });
    return bdc;
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
