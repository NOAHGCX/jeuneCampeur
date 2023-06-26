import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const Review = z.object({
  comment: z
    .string()
    .min(2)
    .max(30)
    .transform((str) => str.trim()),
  grade: z
    .number()
    .min(0)
    .max(10),

})
export default resolver.pipe(
  resolver.zod(Review),
  async (
    { comment, grade },
    ctx
  ) => {
    const review = await db.review.create({
      data: {
        comment: comment,
        grade: grade,
      },
    })
    return review
  }
)
