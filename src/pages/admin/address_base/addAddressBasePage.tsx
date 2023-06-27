import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { useMutation } from "@blitzjs/rpc"
import createAddressBase from "../../../address_Base/mutations/createAddressBase"

type AddressBaseFormProps = {
  onSuccess?: () => void
}

export const AddressBaseForm = (props: AddressBaseFormProps) => {
  const [addressBaseMutation] = useMutation(createAddressBase)
  return (
    <div>
      <h1>Creer une adresse</h1>

      <Form
        submitText="Creer une adresse"
        initialValues={{ city: "", country: "" }}
        onSubmit={async (values) => {
          try {
            let address_fact = {
              number: parseInt(values.number),
              road: values.road,
              city: values.city,
              department: values.department,
              country: values.country,
              postcode: values.postcode,
              complimentary: values.complimentary,
              userID: parseInt(values.userID),
            }
            await addressBaseMutation(address_fact)
            props.onSuccess?.()
          } catch (error: any) {
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      >
        <div>

          <LabeledTextField name="number" label="Numero" placeholder="Numero" />
          <LabeledTextField name="road" label="Rue" placeholder="Rue" />
          <LabeledTextField name="city" label="Ville" placeholder="Ville" />
          <LabeledTextField name="country" label="Pays" placeholder="Pays" />
          <LabeledTextField name="department" label="Departement" placeholder="Departement" />
          <LabeledTextField name="postcode" label="Code postal" placeholder="Code postal" />
          <LabeledTextField name="complimentary" label="Informations complémentaires" placeholder="Informations complémentaires" />
          <LabeledTextField name="userID" label="userID" placeholder="userID" />

          <button type="submit" />
        </div>
      </Form>
    </div>

  )
}

export default AddressBaseForm
