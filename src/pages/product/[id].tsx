import { useRouter } from "next/router"
import { BlitzPage, Routes, useParam } from "@blitzjs/next"
import React, { useState, useEffect, Suspense } from "react"
import oneProduct from "src/core/products/queries/oneProduct";
import { useQuery } from "@blitzjs/rpc";
import styles from "src/styles/Home.module.css"
import ReviewsComponent from "src/core/components/product/ReviewsComponent"
import ProductDetail from "src/core/components/product/ProductDetails"
import CarrousselProduct from "src/core/components/product/CarrousselProduct";
import Layout from "src/core/components/Layout"


const Product = () => {
  const [idProduct, setIdProduct] = useState<any>(null)
  const idParam = useParam("id")
  const [product] = useQuery(oneProduct, parseInt(idParam! as string))


  useEffect(() => {
    setIdProduct(idParam)
    console.log("product", product)
  }, [product])

  return (
    <div className="flex flex-col">
  <div className="flex">
    <div className="w-1/2">
      <CarrousselProduct product={product} />
    </div>
    <div className="w-1/2 flex items-center justify-center">
      <Suspense fallback="Chargement...">
        <ProductDetail product={product} />
      </Suspense>
    </div>
  </div>

  <div className="border-orange border w-800 max-h-60 text-lg mt-6 rounded-5 sticky overflow-auto list-none">
    <h2 className="text-xl font-semibold mb-2">Nom du produit</h2>
    <p className="text-base leading-relaxed">{product.description}</p>
  </div>

  <Suspense fallback="Chargement...">
    <ReviewsComponent productId={idParam} />
  </Suspense>
</div>
  )
}
const ProductPage: BlitzPage = () => {

  return (
    <div>
      <header>
        <div className="bg-header bg-cover w-full h-384 bg-center">
          <h1 className="ml-144 pt-35 text-72sec text-orange 2 font-bold oldstyle-nums">
            jeune<span className="text-white ">Campeur </span>{" "}
          </h1>
        </div>
      </header>

      <Layout breadcrumb={"/"}>
        <div className="container_menu mx-auto flex flex-col min-h-screen mt-43">
          <div className={styles.buttonContainer}>
            <Suspense fallback={"Chargement..."}>
              <Product />
            </Suspense>
          </div>
        </div>
      </Layout>

      <footer>
        <div className="bg-header bg-dark bg-cover h-268 bg-center">
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
