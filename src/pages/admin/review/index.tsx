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
      add={"/admin/review/addReviewPage"}
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
      ]}
      empty="Aucune review."
    />
  )
}

const HomeReview: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
      <Suspense fallback="Loading...">
        <TableReview />
      </Suspense>
    </Layout>
  )
}

export default HomeReview
