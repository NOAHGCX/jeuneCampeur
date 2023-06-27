import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const Picture = z.object({
  name: z
    .string()
    .min(2)
    .max(30)
    .transform((str) => str.trim()),
  href: z
    .string()
    .min(2)
    .max(100),
  productId: z.number()
})
export default resolver.pipe(
  resolver.zod(Picture),
  async (
    { name, href, productId },
    ctx
  ) => {
    const picture = await db.pictures.create({
      data: {
        name: name,
        href: href,
        productId: productId,
      },
    })
    return picture
  }
)
