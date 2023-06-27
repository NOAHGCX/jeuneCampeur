import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const ProductCard = z.object({
  idUser: z.number(),
  idAddressBase: z.number(),
  idAddressFact: z.number(),
  totalPrice: z.number(),
})
export default resolver.pipe(
  resolver.zod(ProductCard),
  async (
    { idUser, idAddressBase, idAddressFact, totalPrice },
    ctx
  ) => {

    const BDC = await db.bDC.create({
      data: {
      idUser,
      idAddressBase,
      idAddressFact,
      totalPrice
    },
  }
    )
    return BDC
  }
)
