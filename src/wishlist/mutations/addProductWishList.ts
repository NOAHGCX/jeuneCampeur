
import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const WishList = z.object({
  idWishList: z.number(),
  idProduct: z.number(),
})
export default resolver.pipe(
  resolver.zod(WishList),
  async (
    {idWishList, idProduct}
  ) => {

    const wishlist = db.wishlist.update({
      where: { id: idWishList },
      data: { products: { connect: { id: idProduct }} },
    });

    return wishlist
  }
)
