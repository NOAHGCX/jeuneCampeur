import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const Address_Base = z.object({
  number: z
    .number()
    .min(1)
    .max(10),
  road: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  city: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  department: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  country: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  postcode: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  complimentary: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
})
export default resolver.pipe(
  resolver.zod(Address_Base),
  async (
    { number, road, city, department, country, postcode, complimentary },
    ctx
  ) => {
    const address_base = await db.address_Base.create({
      data: {
        number: number,
        road: road,
        city: city,
        department: department,
        country: country,
        postcode: postcode,
        complimentary:complimentary,
      },
    })
    return address_base
  }
)
