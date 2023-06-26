import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const Address_Fact = z.object({
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
  email: z
    .string()
    .email()
    .transform((str) => str.toLowerCase().trim()),
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
  resolver.zod(Address_Fact),
  async (
    {first_name, last_name, email, number, road, city, department, country, postcode, complimentary },
    ctx
  ) => {
    const address_fact = await db.address_Fact.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        number: number,
        road: road,
        city: city,
        department: department,
        country: country,
        postcode: postcode,
        complimentary:complimentary,
      },
    })
    return address_fact
  }
)
