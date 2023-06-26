import React, { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import { CategoriesSelect } from "src/core/components/categoriesSelect"
import PriceRangeSelector from "src/core/components/selectPrice"
import AutocompleteText from "src/core/components/AutocompleteText"
import getAllProducts from "src/core/products/queries/getAllProducts"
import Products from "src/core/components/showProducts"
import Layout from "src/core/components/Layout"
/*C:
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */


const ProductComponent = () => {
  var [text, setText] = React.useState<any>("")
  var [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [minPrice, setMinPrice] = useState<any>();
  const [maxPrice, setMaxPrice] = useState<any>();
  const [requete, setRequete] = React.useState<any>()
  var [products, setProducts] = useState<any>([]);


  useEffect(() => {
    console.log("je suis la")
    getAllProducts()
      .then((products) => {
        setProducts(products);
        console.log("products", products)
      })
      .catch((error) => {
        console.error('Error retrieving product:', error);
      });
  }, []);
  const handleSelectChange = (selectedValues) => {
    console.log("selectedValues", selectedValues)
    setSelectedCategories(
      selectedCategories = selectedValues
      );
    sendResearch()
  };

const handleRangeChange = (minValue, maxValue) => {
    setMinPrice(minValue);
    setMaxPrice(maxValue);
    sendResearch()
    // Autres actions à effectuer lorsque la plage de prix est modifiée
  };


  const onChangeText = () => {
    setText((text = null))
  }

  const sendResearch = () => {
    const rqt: Array<any> = []
    if (text) {
      rqt.push({ name: text })
    }
    if (minPrice && maxPrice) {
      rqt.push({
        price: { gte: minPrice, lte: maxPrice },
      })
    }
    console.log("selectedCategories", selectedCategories)
    if (selectedCategories.length > 0) {
      rqt.push({
        categories: {
          every: {
            id: {
              in: selectedCategories,
            },
          },
        },
      })
    }
    console.log("envoie", rqt)
    setRequete(rqt)
  }

  const selectedText = (value) => {
    setText((text = value))
  }



  return (
    <main>
  <div className="flex items-center">
    <div className="flex items-stretch relative1024:w-890 1440:w-1190 1660:w-1444 1880:w-1444 2200:w-1892 2560:w-2180">
      <div className="mr-4 ">
        <Suspense fallback={"string"}>
          <AutocompleteText
            items={products.map((product: { name: string }) => ({
              name: product.name,
            }))}
            text={text}
            setText={setText}
            sendResearch={sendResearch}
            onChangeText={onChangeText}
            selectedText={selectedText}
          />
        </Suspense>
      </div>
      <div className="mr-5 ">
        <Suspense fallback="Loading...">
          <CategoriesSelect onSelectChange={handleSelectChange} />
        </Suspense>
      </div>
      <div className="mr-4 mt-3 ">
        <Suspense fallback="Loading...">
          <PriceRangeSelector onRangeChange={handleRangeChange} />
        </Suspense>
      </div>
    </div>
  </div>
  <div className=" z-0">
    <Suspense fallback="Loading...">
      <Products requete={requete} sendResearch={sendResearch} />
    </Suspense>
  </div>
</main>


  )
}


const Home: BlitzPage = () => {

  return (
    <div>
    <header>
      <div className=" bg-cover w-full h-384 bg-center ">
        <h1 className=" ml-144 pt-35 text-72sec text-orange 2 font-bold oldstyle-nums">
          jeune<span className="text-white ">Campeur </span>{" "}
        </h1>
      </div>
    </header>
    <Layout breadcrumb={"/"}>
    <div className=" container_menu mx-auto flex mt-60 mb-60 ">
    <div className={styles.buttonContainer}>
                <Suspense fallback={"string"}>
                  <ProductComponent />
                </Suspense>
              </div>
    </div>
    </Layout>
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

export default Home
