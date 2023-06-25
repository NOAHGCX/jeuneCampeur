import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"

import db, { Prisma } from "db"

interface GetWishlistInput
  extends Pick<Prisma.UserFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetWishlistInput) => {
    const {
      items: wishlists,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.wishlist.count({ where }),
      query: (paginateArgs) => db.wishlist.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      wishlist: wishlists,
      nextPage,
      hasMore,
      count,
    }
  }
)
