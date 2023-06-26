import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const WishList = z.object({
  name: z.string(),
  idUser: z.number(),
})
export default resolver.pipe(
  resolver.zod(WishList),
  async (
    { name, idUser },
    ctx
  ) => {

    const wishlist = await db.wishlist.create({
      data: {
      name,
      idUser,
    },
  }
    )
    return wishlist
  }
)
