import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const ProductBDC = z.object({
  idBDC: z.number(),
  idProduct: z.number(),
  quantity: z.number(),
})
export default resolver.pipe(
  resolver.zod(ProductBDC),
  async (
    { idBDC, idProduct, quantity },
    ctx
  ) => {

    const productCard = await db.product_BDC.create({
      data: {
      idBDC,
      idProduct,
      quantity
    },
  }
    )
    return productCard
  }
)
