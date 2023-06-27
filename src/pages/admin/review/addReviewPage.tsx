import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import createReviews from "../../../reviews/mutations/createReviews"
import { useMutation } from "@blitzjs/rpc"

type ReviewFormProps = {
  onSuccess?: () => void
}

export const ReviewForm = (props: ReviewFormProps) => {
  const [reviewMutation] = useMutation(createReviews)
  return (
    <div>
      <h1>Creer une review</h1>

      <Form
        submitText="Creer une review"
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            let review = {
              comment: values.comment,
              grade: parseInt(values.grade),
              idUser: parseInt(values.idUser),
              idProduct: parseInt(values.idProduct),
            }
            await reviewMutation(review)
            props.onSuccess?.()
          } catch (error: any) {
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      >
        <div>
          <LabeledTextField name="comment" label="Commentaires" placeholder="Commentaires" />
          <LabeledTextField name="grade" label="Note" placeholder="Note" />
          <LabeledTextField name="idUser" label="idUser" placeholder="idUser" />
          <LabeledTextField name="idProduct" label="idProduct" placeholder="idProduct" />

          <button type="submit" />
        </div>
      </Form>
    </div>

  )
}

export default ReviewForm
