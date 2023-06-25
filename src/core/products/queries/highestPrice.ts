import db from "db"

export default async function highestPrice() {
  const product = await db.product.findFirst({
    orderBy: {
      price: 'desc',
    },
  });
  return product
}
