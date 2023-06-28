import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const Product = z.object({
  id: z
    .number(),
  name: z
    .string()
    .min(2)
    .transform((str) => str.trim()),
  price: z
    .number()
    .min(2),
  stock: z
    .number()
    .min(2),
  description: z
    .string()
    .min(5)
    .max(1000)
    .transform((str) => str.trim()),
  sell_month: z.number(),
  sell_year: z.number(),
})
export default resolver.pipe(
  resolver.zod(Product),
  async (
    {id, name, price, stock, description, sell_month, sell_year },
    ctx
  ) => {
    const product = await db.product.update({
      where: {
        id
      },
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
