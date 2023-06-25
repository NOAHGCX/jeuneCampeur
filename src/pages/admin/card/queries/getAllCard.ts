import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"

import db, { Prisma } from "db"

interface GetCardInput
  extends Pick<Prisma.UserFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCardInput) => {
    const {
      items: cards,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.card.count({ where }),
      query: (paginateArgs) => db.card.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      card: cards,
      nextPage,
      hasMore,
      count,
    }
  }
)
