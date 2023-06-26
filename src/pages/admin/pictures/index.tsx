import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation, usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import Table from "src/core/components/table/Table"
import getAllPicture from "src/pages/admin/pictures/queries/getAllPicture"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import picture from "./mutation/addPicture"

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
        <Link href={Routes.SignupPage({ role: "ADMIN" })} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
      </>
    )
  }
}

const TablePictures = () => {
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
        { name: keywords },
        // { productId: keywords },
      ],
    }
  }

  const [{ pictures, count }, { refetch }] = usePaginatedQuery(getAllPicture, queryOptions)

  useEffect(() => {
    console.log(pictures)
    console.log(keywords)
    console.log(currentOrder)
    setItems(pictures)
  }, [pictures, keywords, currentOrder])

  return (
    <Table
      selectList={selectList}
      setSelectList={setSelectList}
      selectAll={selectAll}
      setSelectAll={setSelectAll}
      exportPartial={true}
      exportAll={true}
      add={"/pictures/mutation"}
      exportKey={[
        { label: "Id", key: "id" },
        { label: "Nom de l'image", key: "name" },
        { label: "Lien", key: "href" },
        { label: "Lien", key: "href" },
        { label: "Produit", key: "product" },
        { label: "Créé le", key: "createdAt" },
        { label: "Mis à jour le", key: "updatedAt" },
      ]}
      titre={`Liste des images`}
      key="table_liste_image"
      id="table_liste_image"
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
          id: "name",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "name",
            text: "Nom de l'image",
            order: true,
            orderColumn: "name",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.name,
          },
        },
        {
          id: "href",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "href",
            text: "Lien",
            order: true,
            orderColumn: "href",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.href,
          },
        },
        {
          id: "product",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "product",
            text: "Produit",
            order: true,
            orderColumn: "product",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.product,
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
      empty="Aucune image."
    />
  )
}

type PictureFormProps = {
  onSuccess?: () => void
}

export const PictureForm = (props: PictureFormProps) => {
  const [pictureMutation] = useMutation(picture)
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
              product: values.product,
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

const HomePicture: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
      <Suspense fallback="Loading...">
        <PictureForm />
      </Suspense>
      <Suspense fallback="Loading...">
        <TablePictures />
      </Suspense>
    </Layout>
  )
}

export default HomePicture
