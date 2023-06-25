import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes, useParam } from "@blitzjs/next"
import React, { useState, useEffect, Suspense } from "react"
import oneProduct from "src/core/products/queries/oneProduct";
import { useQuery } from "@blitzjs/rpc";
import styles from "src/styles/Home.module.css"
import ReviewsComponent from "src/core/components/product/ReviewsComponent"
import ProductDetail from "src/core/components/product/ProductDetails"

const Product = () => {
  const [idProduct, setIdProduct] = useState<any>(null)
  const idParam = useParam("id")
  const [product] = useQuery(oneProduct, parseInt(idParam! as string))
  const CallReload = () => {
    console.log("callReload")
    const [product] = useQuery(oneProduct, parseInt(idParam! as string))
    console.log("product", product)
  }
  useEffect(() => {
    setIdProduct(idParam)
    console.log("product", product)
  }, [product])

  return (
    <div>
      <Suspense fallback={"string"}>
          <ProductDetail
          product={product}
          />
        </Suspense>
        <Suspense fallback={"string"}>
          <ReviewsComponent
          productId={idParam}
          callReload={CallReload}
          />
        </Suspense>
    </div>
  )
}
const ProductPage: BlitzPage = () => {

  return (
    <div>
    <header>
      <div className="bg-header bg-cover w-full h-384 bg-center ">
        <h1 className=" ml-144 pt-35 text-72sec text-orange 2 font-bold oldstyle-nums">
          jeune<span className="text-white ">Campeur </span>{" "}
        </h1>
      </div>
    </header>
    <div className=" container_menu mx-auto flex h-screen mt-43  ">
    <div className={styles.buttonContainer}>
        <Suspense fallback={"string"}>
          <Product />
        </Suspense>
              </div>
    </div>
    <footer>
      <div className="bg-dark bg-cover h-268 bg-center">
        <div className="container mx-auto flex-col flex justify-center items-center h-268">
          <h1 className="text-3xl text-orange">
            jeune<span className="text-white ">Campeur </span>{" "}
          </h1>
          <p className="lg:text-base text-white">27, rue Alexandre Dumas</p>
          <p className="lg:text-base xl:text-lg text-white">78100 St Germain en Laye</p>
          <p className="lg:text-base xl:text-lg text-white">+33 7 69 05 29 08</p>
          <p className="lg:text-base xl:text-lg text-white">jeuneCampeur@gmail.com</p>
        </div>
      </div>
    </footer>
  </div>
  )
}
export default ProductPage
