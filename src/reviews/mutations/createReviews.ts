import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const Review = z.object({
  grade: z.number(),
  comment: z.string(),
  idUser: z.number(),
  idProduct: z.number(),
})
export default resolver.pipe(
  resolver.zod(Review),
  async (
    { grade, comment, idUser, idProduct },
    ctx
  ) => {

    const review = await db.review.create({
      data: {
       grade : grade,
       comment : comment,
       idUser : idUser,
       idProduct : idProduct,
    },
  }
    )

    return review
  }
)
