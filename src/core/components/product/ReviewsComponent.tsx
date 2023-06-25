import React, { useEffect, useState } from 'react';
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { useMutation } from "@blitzjs/rpc"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import createReviews from "src/reviews/mutations/createReviews"
import getReviewsProduct from "src/reviews/queries/getReviewsProduct"

type ReviewsProps = {
  productId?: string | string[]

}
const ReviewsComponent = (props: ReviewsProps) => {
  const [reviewMutation] = useMutation(createReviews)
  const currentUser = useCurrentUser()

  const [reviews, setReviews] = useState<any>([]);
  const [note, setNote] = useState(0);
  const [newReview, setNewReview] = useState<any>(0);

  const handleNoteChange = (note) => {
   console.log("note", note)
   setNote(note = note)
  };

  useEffect(() => {
    getReviewsProduct(parseInt(props.productId as string))
      .then((review) => {
        setReviews(review)
        console.log("review", review)
      }
      )
      .catch((error) => {
        console.error('Error retrieving product:', error);
      }
      );
  }, [newReview])



  return (
    <div className="p-4">
       {currentUser && (

<Form
submitText="Ajouter un avis"
initialValues={{ email: "", password: "" }}
onSubmit={async (values) => {
  try {
    console.log(values.note)
    let review = {
      idProduct : parseInt(props.productId as string),
      comment: values.commentaire,
      idUser: currentUser.id,
      grade: note,
    }
    await reviewMutation(review)
    setNewReview(newReview + 1)
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
      <h3 className="text-xl font-bold mb-4">Ajouter un nouvel avis:</h3>
      <form>
      <LabeledTextField name="commentaire" label="Commentaire" placeholder="Commentaire" />
        <label className="block mb-2">
          Note:
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((point) => (
              <label key={point} className="flex items-center mr-2">
                <input
                  type="radio"
                  name="note"
                  value={point}
                  checked={note === point}
                  onChange={() => handleNoteChange(point)}
                  className="mr-1"
                />
                {point}
              </label>
            ))}
          </div>
        </label>
      </form>
      </div>
</Form>

      )}
      <h3 className="text-xl font-bold mb-4">Avis clients:</h3>
      <h2>Note moyenne:{reviews.length > 0 ? reviews.reduce((a, b) => a + b.grade, 0) / reviews.length : 0}</h2>

      <ul className="border-orange border w-800 max-h-60 text-sm mt-3 rounded-5 sticky overflow-auto list-none">
  {reviews.length > 0 ? (
    reviews.map((review, index) => (
      <li key={index}>
        <div key={index} className="bg-gray-100 p-4 rounded mb-4">
          <p className="text-gray-800">Utilisateur: {review.user.username}</p>
          <p className="text-gray-800">Note: {review.grade}</p>
          <p className="text-gray-800">Commentaire: {review.comment}</p>
        </div>
      </li>
    ))
  ) : (
    // Utilisez un <li> supplémentaire pour afficher le message "Pas encore d'avis"
    <li>
      <p className="text-gray-800">Pas encore d'avis</p>
    </li>
  )}
</ul>
    </div>
  );
};

export default ReviewsComponent;
