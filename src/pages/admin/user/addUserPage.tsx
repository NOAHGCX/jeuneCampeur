import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import addUser from "../../../users/mutations/addUser"
import { useMutation } from "@blitzjs/rpc"
import signup from "../../../auth/mutations/signup"

type UserFormProps = {
  onSuccess?: () => void
}

export const UserForm = (props: UserFormProps) => {
  const [userMutation] = useMutation(signup)
  return (
    <div>
      <h1>Ajouter un utilisateur</h1>

      <Form
        submitText="Ajouter un utilisateur"
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            let user = {
              username: values.username,
              first_name: values.first_name,
              last_name: values.last_name,
              birth_date: new Date(values.birth_date),
              password: values.password,
              email: values.email,
              phone: values.phone,
              role: values.role,
              connection_nb: 0,
              purchase_month: 0,
              purchase_year: 0,
            }
            await userMutation(user)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <div>
          <LabeledTextField name="username" label="Nom d'utilisateur" placeholder="Nom d'utilisateur" />
          <LabeledTextField name="first_name" label="Prénom" placeholder="Prénom" />
          <LabeledTextField name="last_name" label="Nom" placeholder="Nom" />
          <LabeledTextField
            name="password"
            label="Mot de passe"
            placeholder="Mot de passe"
            type="password"
          />
          <LabeledTextField name="email" label="Email" placeholder="Email" />
          <LabeledTextField name="birth_date" label="Date de naissance" type="date" />
          <LabeledTextField
            name="phone"
            label="Numéro de téléphone"
            placeholder="0XXXXXXXXX"
            type="tel"
            pattern="[0-9]{10}"
          />
          <LabeledTextField name="role" label="Role" placeholder="USER or ADMIN" />
          <button type="submit" />
        </div>
      </Form>
    </div>

  )
}

export default UserForm
