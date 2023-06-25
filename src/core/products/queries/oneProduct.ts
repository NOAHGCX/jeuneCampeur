import db from "db";

export default async function oneProduct(productId) {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      pictures: true,
      categories: true,
      reviews: {
        include: { user: true },
      },
    },
  });

  return product;
}
