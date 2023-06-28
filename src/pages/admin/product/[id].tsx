import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import addProduct from "../../../product/mutations/addProduct"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getProductById from "src/product/queries/getProductById"
import { useEffect, useState } from "react"
import { useParam } from "@blitzjs/next"
import updateProduct from "../../../product/mutations/updateProduct"

type ProductFormProps = {
  onSuccess?: () => void
}

export const ProductUpdateForm = (props: ProductFormProps) => {

  const [id, setId] = useState<string | undefined>(undefined)
  const idParam = useParam("id")



  const [getProductByIdQuery] = useQuery(getProductById, parseInt(id || "0"))
  const [productMutation] = useMutation(updateProduct)
  useEffect(() => {
    if (idParam && !isNaN(parseInt(idParam))) {
      setId(idParam)
    }
    console.log(getProductByIdQuery)
  }, [idParam, getProductByIdQuery])
  return (
    <div>
      <h1>Modification de produits</h1>blitz dev

      <Form
        submitText="Modification d'un produit"
        initialValues={{
          name: getProductByIdQuery?.name || "",
          price: getProductByIdQuery?.price.toString() || "",
          stock: getProductByIdQuery?.stock.toString() || "",
          description: getProductByIdQuery?.description || "",
          sell_month: getProductByIdQuery?.sell_month,
          sell_year: getProductByIdQuery?.sell_year,
        }}
        onSubmit={async (values) => {
          try {
            let product = {
              id: parseInt(id as string),
              name: values.name,
              price: parseInt(values.price),
              stock: parseInt(values.stock),
              description: values.description,
              sell_month: getProductByIdQuery?.sell_month,
              sell_year: getProductByIdQuery?.sell_month,

            }
            await productMutation(product)
            props.onSuccess?.()
          } catch (error: any) {
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      >
        <div>
          <LabeledTextField name="name" label="Nom du produit" placeholder="Nom du produit" />
          <LabeledTextField name="price" label="Prix" placeholder="Prix" />
          <LabeledTextField name="stock" label="Stock" placeholder="Stock" />
          <LabeledTextField name="description" label="Description" placeholder="Description" />
          <button type="submit" />
        </div>
      </Form>
    </div>
  )
}

export default ProductUpdateForm
