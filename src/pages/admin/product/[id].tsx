import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation, usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage, useParam } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import Table from "src/core/components/table/Table"
import getProductInformation from "./queries/getProductInformation"

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

const TableProductUpdate = () => {
  const [keywords, setKeywords] = useState("")
  var [items, setItems] = useState<any>()
  const [itemsPerPage, setItemsPerPage] = useState(60)
  const [currentOrder, setCurrentOrder] = useState<any>({ id: "asc" })
  const [page, setPage] = useState(0)
  const [selectList, setSelectList] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [loadingMulti, setLoadingMulti] = useState(true)

  const [id, setId] = useState<string | string[] | undefined>("id")

  const idParam = useParam("id")
  useEffect(() => {
    setId(idParam)
  }, [idParam])


  const queryOptions: any = {
    orderBy: currentOrder,
    skip: itemsPerPage * page,
    take: itemsPerPage,
    where: { id: parseInt(id as string) || undefined }, // Search query based on the id parameter
    include: {
      products: true,
    },
  };

  if (keywords !== null && keywords !== undefined && keywords !== '') {
    queryOptions.where.OR = [
      { products: { name: keywords } },
      { products: { price: parseInt(keywords) || undefined } },
      { products: { stock: parseInt(keywords) || undefined } },
      { products: { sell_month: parseInt(keywords) || undefined } },
      { products: { sell_year: parseInt(keywords) || undefined } },
    ];
  }

  const [{ product, count }, { refetch }] = usePaginatedQuery(getProductInformation, queryOptions);

  useEffect(() => {
    console.log(product[0])
    console.log(keywords)
    console.log(currentOrder)
    setItems(product[0])
  }, [product, keywords, currentOrder])

  return (
    <Table
      selectList={selectList}
      setSelectList={setSelectList}
      selectAll={selectAll}
      setSelectAll={setSelectAll}
      exportPartial={true}
      exportAll={true}
      add={""}
      exportKey={[
        { label: "Id", key: "id" },
        { label: "Nom du produit", key: "name" },
        { label: "Prix", key: "price" },
        { label: "Stock", key: "stock" },
        { label: "Description", key: "description" },
        { label: "Vente du mois de l'item", key: "sell_month" },
        { label: "Vente de l'année de l'item", key: "sell_year" },
      ]}
      titre={`Liste des produits de la wishlist`}
      key="table_liste_products"
      id="table_liste_products"
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
            text: "Nom de l'item",
            order: true,
            orderColumn: "name",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.name,
          },
        },
        {
          id: "price",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "price",
            text: "Prix",
            order: true,
            orderColumn: "price",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.price,
          },
        },
        {
          id: "stock",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "stock",
            text: "Stock",
            order: true,
            orderColumn: "stock",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.stock,
          },
        },
        {
          id: "description",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "description",
            text: "Description",
            order: true,
            orderColumn: "description",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.description,
          },
        },
        {
          id: "sell_month",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "sell_month",
            text: "Vente au mois",
            order: true,
            orderColumn: "sell_month",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.sell_month,
          },
        },
        {
          id: "sell_year",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "sell_year",
            text: "Vente sur un an",
            order: true,
            orderColumn: "sell_year",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.sell_year,
          },
        },
      ]}
      empty="Aucun produit."
    />
  )
}




const HomeProductUpdate: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
      <Suspense fallback="Loading...">
        <TableProductUpdate />
      </Suspense>
    </Layout>
  )
}

export default HomeProductUpdate
