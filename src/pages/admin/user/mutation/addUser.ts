import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const User = z.object({
  first_name: z
    .string()
    .min(2)
    .max(20)
    .transform((str) => str.trim()),
  last_name: z
    .string()
    .min(2)
    .max(20)
    .transform((str) => str.trim()),
  email: z
    .string()
    .email()
    .transform((str) => str.toLowerCase().trim()),
  phone: z
    .string()
    .min(10)
    .max(10)
    .transform((str) => str.trim()),
  role: z.enum(["USER", "ADMIN"]),
  purchase_month: z.number(),
  purchase_year: z.number(),
  last_connexion: z.date(),
})
export default resolver.pipe(
  resolver.zod(User),
  async (
    { first_name, last_name, email, phone, role, purchase_month, purchase_year, last_connexion },
    ctx
  ) => {
    const user = await db.user.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        role: role,
        purchase_month: purchase_month,
        purchase_year: purchase_year,
        last_connexion: last_connexion,
      },
    })
    return user
  }
)
