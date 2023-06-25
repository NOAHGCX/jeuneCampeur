import db from "db"

export default async function lowestPrice() {
  const product = await db.product.findFirst({
    orderBy: {
      price: 'asc',
    },
  });
  return product
}
