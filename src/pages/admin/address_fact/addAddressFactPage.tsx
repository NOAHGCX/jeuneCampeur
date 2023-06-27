import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import createAddressFact from "../../../address_Fact/mutations/createAddressFact"
import { useMutation } from "@blitzjs/rpc"

type AddressFactFormProps = {
  onSuccess?: () => void
}

export const AddressFactForm = (props: AddressFactFormProps) => {
  const [addressFactMutation] = useMutation(createAddressFact)
  return (
    <div>
      <h1>Creer une adresse</h1>

      <Form
        submitText="Creer une adresse"
        initialValues={{ last_name: "", email: "" }}
        onSubmit={async (values) => {
          try {
            let address_fact = {
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              number: parseInt(values.number),
              road: values.road,
              city: values.city,
              department: values.department,
              country: values.country,
              postcode: values.postcode,
              complimentary: values.complimentary,
              userID: parseInt(values.userID),
            }
            await addressFactMutation(address_fact)
            props.onSuccess?.()
          } catch (error: any) {
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      >
        <div>
          <LabeledTextField name="first_name" label="Prénom" placeholder="Prénom" />
          <LabeledTextField name="last_name" label="Nom" placeholder="Nom" />
          <LabeledTextField name="email" label="Email" placeholder="Email" />
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

export default AddressFactForm
