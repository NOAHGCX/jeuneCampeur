import db from "db"

export default async function getAllProducts() {
  const product = await db.product.findMany({
    where: {}
  });
  return product
}
