import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: { id: true, username: true, email: true, role: true, first_name: true, last_name: true, connection_nb: true, phone: true, birth_date:true },
  })

  return user
}
