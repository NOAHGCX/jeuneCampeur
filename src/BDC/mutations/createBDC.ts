import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const ProductCard = z.object({
  idUser: z.number(),
})
export default resolver.pipe(
  resolver.zod(ProductCard),
  async (
    { idUser },
    ctx
  ) => {

    const BDC = await db.bDC.create({
      data: {
      idUser,
    },
  }
    )
    return BDC
  }
)
