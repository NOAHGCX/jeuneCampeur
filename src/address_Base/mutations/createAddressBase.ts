import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const Address_Base = z.object({
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
  resolver.zod(Address_Base),
  async (
    { number, road, city, department, country, postcode, complimentary, userID },
    ctx
  ) => {

    const address = await db.address_Base.create({
      data: {
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
