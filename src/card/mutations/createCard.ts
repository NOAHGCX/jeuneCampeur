import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const Card = z.object({
  idUser: z.number(),
})
export default resolver.pipe(
  resolver.zod(Card),
  async (
    {idUser},
    ctx
  ) => {

    const card = await db.card.create({
      data: {
       idUser : idUser,
    },
  }
    )
    return card
  }
)
