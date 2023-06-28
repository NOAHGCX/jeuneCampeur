import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import signup from "src/auth/mutations/signup"
import { Signup } from "src/auth/schemas"
import { useMutation } from "@blitzjs/rpc"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  return (
    <div className="h-screen bg-orange-300 flex items-center justify-center">
        <div className="w-1/2 p-4 mx-auto">
          <h1 className="text-4xl text-center font-bold"> Bienvenue jeune Campeur </h1>
        </div>
      <Form
        className="w-1/2 p-4 my-4"
        submitText="Creation de compte"
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            let human = {
              username: values.username,
              first_name: values.first_name,
              last_name: values.last_name,
              birth_date: new Date(values.birth_date),
              password: values.password,
              email: values.email,
              phone: values.phone,
              role: "USER" as any,
              connection_nb: 0,
              purchase_month: 0,
              purchase_year: 0,
            }
            await signupMutation(human)
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
      <button type="submit" />
    </div>
    </Form>
    </div>

  )
}

export default SignupForm
