import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const User = z.object({
  username: z
    .string()
    .min(2)
    .max(20)
    .transform((str) => str.trim()),
  first_name: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  last_name: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  birth_date: z.date(),
  password: z
  .string()
  .min(10)
  .max(100)
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
  connection_nb: z.number(),
  purchase_month: z.number(),
  purchase_year: z.number(),
})
export default resolver.pipe(
  resolver.zod(User),
  async (
    { username, first_name, last_name, birth_date, password, email, phone, role, connection_nb, purchase_month, purchase_year },
    ctx
  ) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        username: username,
        first_name: first_name,
        last_name: last_name,
        birth_date: birth_date,
        hashedPassword: hashedPassword,
        email: email,
        phone: phone,
        role: role,
        connection_nb: connection_nb,
        purchase_month: purchase_month,
        purchase_year: purchase_year,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    })
    await ctx.session.$create({ userId: user.id, role: "USER" as Role })
    return user
  }
)
