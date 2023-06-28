import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const ProductCard = z.object({
  id: z.number(),
  quantity: z.number(),
})
export default resolver.pipe(
  resolver.zod(ProductCard),
  async (
    { id, quantity },
    ctx
  ) => {

    const updatedProductStock = await db.product_Card.update({
      where: {
        id
      },
      data: {
        quantity: quantity,
        updatedAt: new Date(),
      },
    });

    return updatedProductStock
  }
)
