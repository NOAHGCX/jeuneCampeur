import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import addPicture from "../../../pictures/mutations/addPicture"
import { useMutation } from "@blitzjs/rpc"

type PictureFormProps = {
  onSuccess?: () => void
}

export const PictureForm = (props: PictureFormProps) => {
  const [pictureMutation] = useMutation(addPicture)
  return (
    <div>
      <h1>Ajouter une image</h1>

      <Form
        submitText="Ajouter une image"
        initialValues={{ href: "", product: "" }}
        onSubmit={async (values) => {
          try {
            let picture = {
              name: values.name,
              href: values.href,
              productId: parseInt(values.product),
            }
            await pictureMutation(picture)
            props.onSuccess?.()
          } catch (error: any) {
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      >
        <div>
          <LabeledTextField name="name" label="Nom de l'image" placeholder="Nom de l'image" />
          <LabeledTextField name="href" label="Lien" placeholder="Lien" />
          <LabeledTextField name="product" label="Produit" placeholder="Produit" />
          <button type="submit" />
        </div>
      </Form>
    </div>

  )
}

export default PictureForm
