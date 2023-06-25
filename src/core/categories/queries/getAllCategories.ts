import db from "db"

export default async function getAllCategories() {
  const categories = await db.category.findMany();
  return categories
}
