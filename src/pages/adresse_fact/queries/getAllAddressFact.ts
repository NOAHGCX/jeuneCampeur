import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"

import db, { Prisma } from "db"

interface GetAddressFact
  extends Pick<Prisma.AddressFactFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetAddressFact) => {
    const {
      items: addresses,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.address.count({ where }),
      query: (paginateArgs) => db.address.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      address: addresses,
      nextPage,
      hasMore,
      count,
    }
  }
)
