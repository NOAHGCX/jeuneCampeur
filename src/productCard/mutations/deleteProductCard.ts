import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const ProductCard = z.object({
  id: z.number(),
})
export default resolver.pipe(
  resolver.zod(ProductCard),
  async (
    { id }
  ) => {

    const updatedProductCard = await db.product_Card.delete({
      where: {
        id
      },
    });

    return updatedProductCard
  }
)
