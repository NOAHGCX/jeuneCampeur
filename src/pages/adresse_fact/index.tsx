import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation, usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import Table from "src/core/components/table/Table"
import getAllAddressFact from "src/pages/adresse_fact/queries/getAllAddressFact"
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
        <Link href={Routes.SignupPage({ role: "address_fact" })} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
      </>
    )
  }
}

const TableAddressFact = () => {
  const [keywords, setKeywords] = useState(null)
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
        { id: keywords },
        { first_name: keywords },
        { last_name: keywords },
        { email: keywords },
        { number: keywords },
        { road: keywords },
        { city: keywords },
        { department: keywords },
        { country: keywords },
        { postcode: keywords },
        { complimentary: keywords },
        { userId: keywords},
        { user: keywords },
        { createdAt: keywords },
        { updatedAt: keywords },
      ],
    }
  }

  const [{ address_fact, count }, { refetch }] = usePaginatedQuery(getAllAddressFact, queryOptions)

  useEffect(() => {
    console.log(address_fact)
    console.log(keywords)
    console.log(currentOrder)
    setItems(address_fact)
  }, [address_fact, keywords, currentOrder])

  return (
    <Table
      selectList={selectList}
      setSelectList={setSelectList}
      selectAll={selectAll}
      setSelectAll={setSelectAll}
      exportPartial={true}
      exportAll={true}
      add={"/user/creation"}
      exportKey={[
        { label: "Id", key: "id" },
        { label: "Prénom", key: "first_name" },
        { label: "Nom", key: "last_name" },
        { label: "Email", key: "email" },
        { label: "Telephone", key: "number" },
        { label: "Rue", key: "road" },
        { label: "Ville", key: "city" },
        { label: "Departement", key: "department" },
        { label: "Pays", key: "country" },
        { label: "Code postal", key: "postcode" },
        { label: "Appartement", key: "complimentary" },
        { label: "userID", key: "userID" },
        { label: "user", key: "user" },
        { label: "Créé le", key: "createdAt" },
        { label: "Mis à jour le", key: "updatedAt" },
      ]}
      titre={`Liste des adresses de facturation`}
      key="table_liste_address_fact"
      id="table_liste_address_fact"
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
          id: "first_name",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "first_name",
            text: "Prénom",
            order: true,
            orderColumn: "first_name",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.first_name,
          },
        },
        {
          id: "last_name",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "last_name",
            text: "Nom",
            order: true,
            orderColumn: "last_name",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.last_name,
          },
        },
        {
          id: "email",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "email",
            text: "Email",
            order: true,
            orderColumn: "email",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.email,
          },
        },
        {
          id: "number",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "number",
            text: "Numero de telephone",
            order: true,
            orderColumn: "number",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.number,
          },
        },
        {
          id: "road",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "road",
            text: "Rue",
            order: true,
            orderColumn: "road",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.road,
          },
        },
        {
          id: "city",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "city",
            text: "Ville",
            order: true,
            orderColumn: "city",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.city,
          },
        },
        {
          id: "department",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "department",
            text: "Departement",
            order: true,
            orderColumn: "department",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.department,
          },
        },
        {
          id: "country",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "country",
            text: "Pays",
            order: true,
            orderColumn: "country",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.country,
          },
        },
        {
          id: "postcode",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "postcode",
            text: "Code postal",
            order: true,
            orderColumn: "postcode",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.postcode,
          },
        },
        {
          id: "complimentary",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "complimentary",
            text: "Appartement",
            order: true,
            orderColumn: "complimentary",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.complimentary,
          },
        },
        {
          id: "userID",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "userID",
            text: "userID",
            order: true,
            orderColumn: "userID",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.userID,
          },
        },
        {
          id: "user",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "user",
            text: "user",
            order: true,
            orderColumn: "user",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.user,
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
      empty="Aucune entreprise."
    />
  )
}

const HomeAddressFact: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
      <Suspense fallback="Loading...">
        <TableAddressFact />
      </Suspense>
    </Layout>
  )
}

export default HomeAddressFact