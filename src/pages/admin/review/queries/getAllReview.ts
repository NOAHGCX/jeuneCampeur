import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"

import db, { Prisma } from "db"

interface GetReviewInput
  extends Pick<Prisma.UserFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetReviewInput) => {
    const {
      items: review,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.review.count({ where }),
      query: (paginateArgs) => db.review.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      review: review,
      nextPage,
      hasMore,
      count,
    }
  }
)
