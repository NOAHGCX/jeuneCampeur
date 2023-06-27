import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const Product = z.object({
  name: z
    .string()
    .min(2)
    .max(30)
    .transform((str) => str.trim()),
  price: z
    .number()
    .min(2)
    .max(100),
  stock: z
    .number()
    .min(2)
    .max(100),
  description: z
    .string()
    .min(5)
    .max(100)
    .transform((str) => str.trim()),
  sell_month: z.number(),
  sell_year: z.number(),
})
export default resolver.pipe(
  resolver.zod(Product),
  async (
    { name, price, stock, description, sell_month, sell_year },
    ctx
  ) => {
    const product = await db.product.create({
      data: {
        name,
        price,
        stock,
        description,
        sell_month,
        sell_year,
      },
    })
    return product
  }
)
