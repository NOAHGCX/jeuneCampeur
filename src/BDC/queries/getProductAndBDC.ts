import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"

import db, { Prisma } from "db"

interface GetBDCInput
  extends Pick<Prisma.BDCFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetBDCInput) => {
    const {
      items: bdc,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.bDC.count({ where }),
      query: (paginateArgs) => db.bDC.findMany({ ...paginateArgs, where, orderBy,include: {
        product_BDC: {
          include: {
            product: true
          }
        }
      }
    }),
    })

    return {
      bdc: bdc,
      nextPage,
      hasMore,
      count,
    }
  }
)
