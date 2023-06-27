import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation, usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import Table from "src/core/components/table/Table"
import getAllUser from "src/pages/admin/user/queries/getAllUser"
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

const TableUser = () => {
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
        { username: keywords },
        { first_name: keywords },
        { last_name: keywords },
        { email: keywords },
        { phone: keywords },
        { role: keywords },
        { connection_nb:  parseInt(keywords) || undefined },
        { purchase_month:  parseInt(keywords) || undefined },
        { purchase_year:  parseInt(keywords) || undefined  },
      ],
    }
  }

  const [{ user, count }, { refetch }] = usePaginatedQuery(getAllUser, queryOptions)

  useEffect(() => {
    console.log(user)
    console.log(keywords)
    console.log(currentOrder)
    setItems(user)
  }, [user, keywords, currentOrder])

  return (
    <Table
      selectList={selectList}
      setSelectList={setSelectList}
      selectAll={selectAll}
      setSelectAll={setSelectAll}
      exportPartial={true}
      exportAll={true}
      add={"/admin/user/addUserPage"}
      exportKey={[
        { label: "Id", key: "id" },
        { label: "Prénom", key: "first_name" },
        { label: "Nom", key: "last_name" },
        { label: "Mot de Passe", key: "hashedPassword" },
        { label: "Email", key: "email" },
        { label: "Telephone", key: "phone" },
        { label: "Role", key: "role" },
        { label: "Nombre de connection", key: "connection_nb" },
        { label: "Nombre d'achat du mois", key: "purchase_month" },
        { label: "Nombre d'achat par an", key: "purchase_year" },
        { label: "Adresse de base", key: "address_base" },
        { label: "Adresse de facturation", key: "address_fact" },
        { label: "Créé le", key: "createdAt" },
        { label: "Mis à jour le", key: "updatedAt" },
        { label: "Derniere connection", key: "last_connexion" },
      ]}
      titre={`Liste des utilisateurs`}
      key="table_liste_users"
      id="table_liste_users"
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
          id: "phone",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "phone",
            text: "Numero de telephone",
            order: true,
            orderColumn: "phone",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.phone,
          },
        },
        {
          id: "role",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "role",
            text: "Role",
            order: true,
            orderColumn: "role",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.role,
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
          id: "last_connexion",
          th: {
            currentOrder,
            setCurrentOrder,
            colone: "last_connexion",
            text: "Derniere connexion",
            order: true,
            orderColumn: "last_connexion",
            thSpanClasses: "justify-content-between",
          },
          td: {
            text: (item: any) => item.last_connexion.toLocaleString(),
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



const HomeUser: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
      <Suspense fallback="Loading...">
        <TableUser />
      </Suspense>
    </Layout>
  )
}

export default HomeUser
