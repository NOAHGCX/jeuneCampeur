import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import addProduct from "../../../product/mutations/addProduct"
import { useMutation } from "@blitzjs/rpc"

type ProductFormProps = {
  onSuccess?: () => void
}

export const ProductForm = (props: ProductFormProps) => {
  const [productMutation] = useMutation(addProduct)
  return (
    <div>
      <h1>Ajout de produits</h1>blitz dev

      <Form
        submitText="Ajout d'un produit"
        initialValues={{ name: "", price: "" }}
        onSubmit={async (values) => {
          try {
            let product = {
              name: values.name,
              price: parseInt(values.price),
              stock: parseInt(values.stock),
              description: values.description,
              sell_month: 0,
              sell_year: 0,

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

export default ProductForm
