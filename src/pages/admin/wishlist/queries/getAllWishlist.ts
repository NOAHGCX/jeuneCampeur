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
      count: () => db.user.count({ where }),
      query: (paginateArgs) => db.user.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      user: wishlists,
      nextPage,
      hasMore,
      count,
    }
  }
)
