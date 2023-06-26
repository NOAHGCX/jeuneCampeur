import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAddressBUser(userId: number) {
  try {
    const address = await prisma.address_Fact.findMany({
      where: {
        user: {id : userId}
      },
    });
    return address;
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
