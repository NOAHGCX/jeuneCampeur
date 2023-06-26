import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation, usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import Table from "src/core/components/table/Table"
import getAllReview from "src/pages/admin//review/queries/getAllReview"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import review from "./mutation/addReview"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className={styles.button}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage({ role: "user" })} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
      </>
    )
  }
}

const TableReview = () => {
  const [keywords, setKeywords] = useState("")
  const [items, setItems] = useState<any>()
  const [itemsPerPage, setItemsPerPage] = useState(60)
  const [currentOrder, setCurrentOrder] = useState<any>({ id: "asc" })
  const [page, setPage] = useState(0)
  const [selectList, setSelectList] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [loadingMulti, setLoadingMulti] = useState(true)

  const queryOptions: any = {
    orderBy: currentOrder,
    skip: itemsPerPage * page,
    take: itemsPerPage,
  }

  if (keywords !== null && keywords !== undefined && keywords !== "") {
    queryOptions.where = {
      OR: [
        { id: parseInt(keywords) || undefined },
        { idUser: parseInt(keywords) || undefined },
        { idProduct: parseInt(keywords) || undefined },
        { grade: parseInt(keywords) },
      ],
    }
  }

  const [{ review, count }, { refetch }] = usePaginatedQuery(getAllReview, queryOptions)

  useEffect(() => {
    console.log(review)
    console.log(keywords)
    console.log(currentOrder)
    setItems(review)
  }, [review, keywords, currentOrder])

  return (
    <Table
      selectList={selectList}
      setSelectList={setSelectList}
      selectAll={selectAll}
      setSelectAll={setSelectAll}
      exportPartial={true}
      exportAll={true}
      add={"/review/creation"}
      exportKey={[
        { label: "Id", key: "id" },
        { label: "Note", key: "grade" },
        { label: "Commentaire", key: "comment" },
        { label: "Utilisateur", key: "idUser" },
        { label: "Produit", key: "idProduct" },
        { label: "Créé le", key: "createdAt" },
        { label: "Mis à jour le", key: "updatedAt" },
      ]}
      titre={`Liste des review`}
      key="table_liste_review"
      id="table_liste_review"
      setItemsPerPage={setItemsPerPage}
      itemsPerPage={itemsPerPage}
      multiSelect={false}
      items={items}
      keywords={keywords}
      setKeywords={setKeywords}
      setPage={setPage}
      count={count}
      paginationTop={{
        itemsPerPage: itemsPerPage,
        count,
        setPage,
        page,
        refetch,
      }}
      paginationBottom={{
        itemsPerPage: itemsPerPage,
        count,
        setPage,
        page,
        refetch,
      }}
      config={[
        {
          id: "id",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "id",
            text: "Id",
            order: true,
            orderColumn: "id",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.id,
          },
        },
        {
          id: "grade",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "grade",
            text: "Note",
            order: true,
            orderColumn: "grade",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.grade,
          },
        },
        {
          id: "comment",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "comment",
            text: "Commentaire",
            order: true,
            orderColumn: "comment",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.comment,
          },
        },
        {
          id: "idUser",
            th: {
          currentOrder,
            setCurrentOrder,
            colone: "idUser",
            text: "Utilisateur",
            order: true,
            orderColumn: "idUser",
            thSpanClasses: "justify-content-between",
        },
          td: {
            text: (item: any) => item.idUser,
          },
        },
        {
          id: "idProduct",
            th: {
          currentOrder,
            setCurrentOrder,
            colone: "idProduct",
            text: "Produit",
            order: true,
            orderColumn: "idProduct",
            thSpanClasses: "justify-content-between",
        },
          td: {
            text: (item: any) => item.idProduct,
          },
        },
        {
          id: "createdAt",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "createdAt",
            text: "Créé le",
            order: true,
            orderColumn: "createdAt",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.createdAt.toLocaleString(),
          },
        },
        {
          id: "updatedAt",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "updatedAt",
            text: "Mis à jour le",
            order: true,
            orderColumn: "updatedAt",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.updatedAt.toLocaleString(),
          },
        },
        {
          id: "actions",
          th: {
            currentOrder,
            setCurrentOrder,
            text: "",
            order: true,
            thSpanClasses: "justify-content-between",
          },
          td: {
            type: "dropdown",
            text: (item: any) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                height="20"
                width="20"
                className="m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2z m0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            ),
            dropdown: [
              {
                type: "link",
                text: () => "Afficher",
                href: (item: any) => `/patient/${item.id}`,
              },
            ],
          },
        },
      ]}
      empty="Aucune review."
    />
  )
}

type ReviewFormProps = {
  onSuccess?: () => void
}

export const ReviewForm = (props: ReviewFormProps) => {
  const [reviewMutation] = useMutation(review)
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
              grade: values.grade,
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
          <button type="submit" />
        </div>
      </Form>
    </div>

  )
}



const HomeReview: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
      <Suspense fallback="Loading...">
        <ReviewForm />
      </Suspense>
      <Suspense fallback="Loading...">
        <TableReview />
      </Suspense>
    </Layout>
  )
}

export default HomeReview
