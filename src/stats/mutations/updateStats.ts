import { resolver } from "@blitzjs/rpc"
import db from "db"
import ProductDetails from "src/core/components/product/ProductDetails"
import * as z from "zod"

const Product= z.object({
  id: z.number(),
  quantity: z.number(),
  userId: z.number(),
})
export default resolver.pipe(
  resolver.zod(Product),
  async (
    { id, quantity, userId },
    ctx
  ) => {

    const product = await db.product.findUnique({ where: { id } })
    const updatedProduct= await db.product.update({
      where: {
        id
      },
      data: {
        stock: product.stock - quantity,
        sell_month: product.sell_month + quantity,
        sell_year: product.sell_year + quantity,
      },
    });
    const user = await db.user.findUnique({ where: { id: userId } })
    const updatedUser= await db.user.update({
      where: {
        id : userId
      },
      data: {
        purchase_month: user.purchase_month + 1,
        purchase_year: user.purchase_year + 1,
      },
    });
    return {updatedProduct, updatedUser}
  }
)
