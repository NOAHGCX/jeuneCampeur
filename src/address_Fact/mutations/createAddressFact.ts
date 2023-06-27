import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const Address_Fact = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  number: z.number(),
  road: z.string(),
  city: z.string(),
  department: z.string(),
  country: z.string(),
  postcode: z.string(),
  complimentary: z.string(),
  userID: z.number(),
})
export default resolver.pipe(
  resolver.zod(Address_Fact),
  async (
    { first_name, last_name, email, number, road, city, department, country, postcode, complimentary, userID },
    ctx
  ) => {

    const address = await db.address_Fact.create({
      data: {
      first_name,
      last_name,
      email,
      number,
      road,
      city,
      department,
      country,
      postcode,
      complimentary,
      userID,
    },
  }
    )
    return address
  }
)
