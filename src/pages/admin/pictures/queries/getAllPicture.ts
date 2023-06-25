import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"

import db, { Prisma } from "db"

interface GetPictureInput
  extends Pick<Prisma.UserFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPictureInput) => {
    const {
      items: picture,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.pictures.count({ where }),
      query: (paginateArgs) => db.pictures.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      pictures: picture,
      nextPage,
      hasMore,
      count,
    }
  }
)
