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
    <div>
      <h1>Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
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
      <LabeledTextField name="first_name" label="Prénom" placeholder="Prénom" />
      <LabeledTextField name="last_name" label="Nom" placeholder="Nom" />
      <LabeledTextField
        name="password"
        label="Mot de passe"
        placeholder="Mot de passe"
        type="password"
      />
      <LabeledTextField name="email" label="Email" placeholder="Email" />
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
