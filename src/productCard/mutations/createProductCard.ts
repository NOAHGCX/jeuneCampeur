import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const ProductCard = z.object({
  idCard: z.number(),
  idProduct: z.number(),
  quantity: z.number(),
})
export default resolver.pipe(
  resolver.zod(ProductCard),
  async (
    { idCard, idProduct, quantity },
    ctx
  ) => {

    const productCard = await db.product_Card.create({
      data: {
      idCard,
      idProduct,
      quantity
    },
  }
    )
    return productCard
  }
)
