import db from "db"

export default async function getAllProducts() {
  const products = await db.product.findMany();
  return products
}
