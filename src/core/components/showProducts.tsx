import { useState, useEffect } from "react";
import { useMutation, usePaginatedQuery, useQuery } from "@blitzjs/rpc";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import getProducts from "src/core/products/queries/getProducts";

var ITEMS_PER_PAGE = 16
type ProductsProps = {
  sendResearch: () => void;
  requete: any;
};

const Products = ({
  sendResearch,
  requete,
}: ProductsProps) => {
  const getResolution = () => {
    if (window.screen.width >= 1024 && window.screen.width < 1440) {
      ITEMS_PER_PAGE = 12
    }
    if (window.screen.width >= 1440 && window.screen.width < 1660) {
      ITEMS_PER_PAGE = 16
    }
    if (window.screen.width >= 1660 && window.screen.width < 1880) {
      ITEMS_PER_PAGE = 20
    }
    if (window.screen.width >= 1880 && window.screen.width < 2200) {
      ITEMS_PER_PAGE = 20
    }
    if (window.screen.width >= 2200 && window.screen.width < 2560) {
      ITEMS_PER_PAGE = 24
    }
    if (window.screen.width >= 2560) {
      ITEMS_PER_PAGE = 28
    }
    sendResearch()
  }

  const getOriginalResolution = () => {
    if (window.innerWidth >= 1024 && window.innerWidth < 1440) {
      ITEMS_PER_PAGE = 12
    } else if (window.innerWidth >= 1440 && window.innerWidth < 1660) {
      ITEMS_PER_PAGE = 16
    } else if (window.innerWidth >= 1660 && window.innerWidth < 1880) {
      ITEMS_PER_PAGE = 20
    } else if (window.innerWidth >= 1880 && window.innerWidth < 2200) {
      ITEMS_PER_PAGE = 20
    } else if (window.innerWidth >= 2200 && window.innerWidth < 2560) {
      ITEMS_PER_PAGE = 24
    } else if (window.innerWidth >= 2560) {
      ITEMS_PER_PAGE = 28
    }
  }

  window.addEventListener("resize", getResolution)

  const [page, setPage] = useState(0)
  const queryOptions: any = {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  }

  if (requete && requete.length > 0) {
    queryOptions.where = {
      AND : requete
    }
  }

  const [{ products, count }, { refetch }] = usePaginatedQuery(getProducts, queryOptions);

  useEffect(() => {
    console.log("requete :", products)
  }, [products]);

  const firstPage = 1
  const lastPage = Math.floor(count / ITEMS_PER_PAGE) + 1
  const classNameValue = "mr-20 text-pagination focus:outline-none"
  const lastclassName = "text-pagination focus:outline-none"
  const nextclassName = "text-pagination focus:outline-none mr-10"
  const newclassName =
    "mr-10 text-white rounded-full focus:outline-none w-40 h-40 bg-orange text-white flex justify-center items-center"

  const pagination = () => {
    var indents = [] as any
    if (lastPage < 8) {
      for (var i = 0; i < lastPage; i++) {
        if (i === page - 1) {
          indents.push(
            <button className={nextclassName} value={i + 1} onClick={goToPage} key={i}>
              {i + 1}
            </button>
          )
        } else if (i === firstPage - 1 && i === page) {
          indents.push(
            <button
              className=" -ml-2 mr-10 text-white rounded-full focus:outline-none w-40 h-40 bg-orange text-white flex justify-center items-center"
              value={i + 1}
              onClick={goToPage}
              key={i}
            >
              {i + 1}
            </button>
          )
        } else if (i === lastPage - 1 && i === page) {
          indents.push(
            <button
              className=" -mr-2 text-white rounded-full focus:outline-none w-40 h-40 bg-orange text-white flex justify-center items-center"
              value={i + 1}
              onClick={goToPage}
              key={i}
            >
              {i + 1}
            </button>
          )
        } else if (i === page) {
          indents.push(
            <button className={newclassName} value={i + 1} onClick={goToPage} key={i}>
              {i + 1}
            </button>
          )
        } else if (i === lastPage - 1) {
          indents.push(
            <button className={lastclassName} value={i + 1} onClick={goToPage} key={i}>
              {i + 1}
            </button>
          )
        } else if (i !== page) {
          indents.push(
            <button className={classNameValue} value={i + 1} onClick={goToPage} key={i}>
              {i + 1}
            </button>
          )
        }
      }
      return (
        <fieldset className="h-48 px-5 bg-pagination mx-6 flex justify-center items-center rounded-full">
          {indents}
        </fieldset>
      )
    } else if (
      page >= 4 &&
      page + 1 < lastPage &&
      page + 3 !== lastPage &&
      page + 2 !== lastPage &&
      page + 1 !== lastPage
    ) {
      return (
        <fieldset className="h-48 w-279 px-5 bg-pagination mx-6 flex justify-center items-center rounded-full">
          <button className={classNameValue} value={firstPage} onClick={goToPage}>
            {firstPage}
          </button>
          <label className={classNameValue}>...</label>
          <button className={nextclassName} value={page} onClick={goToPage}>
            {page}
          </button>
          <button className={newclassName} value={page + 1} onClick={goToPage}>
            {page + 1}
          </button>
          <button className={classNameValue} value={page + 2} onClick={goToPage}>
            {page + 2}
          </button>
          <label className={classNameValue}>...</label>
          <button className={lastclassName} value={lastPage} onClick={goToPage}>
            {lastPage}
          </button>
        </fieldset>
      )
    } else if (page <= 4 && page + 1 < lastPage) {
      for (i = 0; i < 5; i++) {
        if (i === page - 1) {
          indents.push(
            <button className={nextclassName} value={i + 1} onClick={goToPage} key={i}>
              {i + 1}
            </button>
          )
        } else if (i === firstPage - 1 && i === page) {
          indents.push(
            <button
              className=" -ml-2 mr-10 text-white rounded-full focus:outline-none w-40 h-40 bg-orange text-white flex justify-center items-center"
              value={i + 1}
              onClick={goToPage}
              key={i}
            >
              {i + 1}
            </button>
          )
        } else if (i === lastPage - 1 && i === page) {
          indents.push(
            <button
              className=" -mr-2 text-white rounded-full focus:outline-none w-40 h-40 bg-orange text-white flex justify-center items-center"
              value={i + 1}
              onClick={goToPage}
              key={i}
            >
              {i + 1}
            </button>
          )
        } else if (i === page) {
          indents.push(
            <button className={newclassName} value={i + 1} onClick={goToPage} key={i}>
              {i + 1}
            </button>
          )
        } else if (i !== page) {
          indents.push(
            <button className={classNameValue} value={i + 1} onClick={goToPage} key={i}>
              {i + 1}
            </button>
          )
        }
      }
      return (
        <fieldset className="h-48 w-279 px-5 bg-pagination mx-6 flex justify-center items-center rounded-full">
          {indents}
          <label className={classNameValue}>...</label>
          <button className={lastclassName} value={lastPage} onClick={goToPage}>
            {lastPage}
          </button>
        </fieldset>
      )
    } else if (
      page >= 4 &&
      (page + 3 === lastPage || page + 2 === lastPage || page + 1 === lastPage)
    ) {
      for (i = lastPage - 4; i < lastPage; i++) {
        if (i === page - 1) {
          indents.push(
            <button className={nextclassName} value={i + 1} onClick={goToPage} key={i}>
              {i + 1}
            </button>
          )
        } else if (i === firstPage - 1 && i === page) {
          indents.push(
            <button
              className=" -ml-2 mr-10 text-white rounded-full focus:outline-none w-40 h-40 bg-orange text-white flex justify-center items-center"
              value={i + 1}
              onClick={goToPage}
              key={i}
            >
              {i + 1}
            </button>
          )
        } else if (i === lastPage - 1 && i === page) {
          indents.push(
            <button
              className=" -mr-2 text-white rounded-full focus:outline-none w-40 h-40 bg-orange text-white flex justify-center items-center"
              value={i + 1}
              onClick={goToPage}
              key={i}
            >
              {i + 1}
            </button>
          )
        } else if (i === page) {
          indents.push(
            <button className={newclassName} value={i + 1} onClick={goToPage} key={i}>
              {i + 1}
            </button>
          )
        } else if (i === lastPage - 1) {
          indents.push(
            <button className={lastclassName} value={i + 1} onClick={goToPage} key={i}>
              {i + 1}
            </button>
          )
        } else if (i !== page) {
          indents.push(
            <button className={classNameValue} value={i + 1} onClick={goToPage} key={i}>
              {i + 1}
            </button>
          )
        }
      }
      return (
        <fieldset className="h-48 w-279 px-5 bg-pagination mx-6 flex justify-center items-center rounded-full">
          <button className={classNameValue} value={firstPage} onClick={goToPage}>
            {firstPage}
          </button>
          <label className={classNameValue}>...</label>
          {indents}
        </fieldset>
      )
    }
  }

  const goToPreviousPage = () => {
    setPage((old) => (old -= 1))
    console.log(lastPage)
    refetch
  }
  const goToNextPage = () => {
    setPage((old) => (old += 1))
    console.log(lastPage)
    refetch
  }

  const goToPage = (e) => {
    setPage((old) => (old = e.target.value - 1))
    console.log(e.target.value)
    console.log(e.target.className)
    console.log(page)
    refetch
  }


  const handleProductClick = (productId) => {
    window.location.href = `/product/${productId}`;
  };
  return (
    <div className=" relative 1024:w-900 1440:w-1200 1660:w-1440 1880:w-1440  2200:w-1920  2560:w-2200 ">
      {getOriginalResolution()}
      <div className=" container h-705 mt-19">
        <div
          className="grid 1024:grid-cols-3 1440:grid-cols-4 1660:grid-cols-5 1880:grid-cols-5 2200:grid-cols-6 2560:grid-cols-7
                    1024:w-900 1440:w-1200 1660:w-1440 1880:w-1440  2200:w-1920  2560:w-2200 gap-x-4 "
        >
          {products.map((product) => (
              <div
                key={product.id}
                className="container flex flex-col justify-center items-center mb-15"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="container w-200 h-96 flex items-center justify-center bg-black bg-opacity-50">
                  <img src={product.pictures[0]?.href} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center text-sm">
                  <div className="font-medium uppercase">{product.name}</div>
                  <div className="font-medium uppercase">{product.price} €</div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {lastPage > 1 ? (
        <div className="relative 1024:w-890 1440:w-1190 1660:w-1444 1880:w-1444  2200:w-1892  2560:w-2180">
          <div className=" flex items-stretch  absolute right-0">
            <button
              disabled={page === 0}
              onClick={goToPreviousPage}
              className="w-48 h-48 focus:outline-none bg-pagination flex justify-center items-center rounded-full"
            >
              <MdKeyboardArrowLeft className="text-dark-dark w-24 h-24" />
            </button>
            {pagination()}
            <button
              disabled={page === lastPage - 1}
              onClick={goToNextPage}
              className="w-48 h-48 focus:outline-none bg-pagination flex justify-center items-center rounded-full"
            >
              <MdKeyboardArrowRight className="text-dark-dark w-24 h-24" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}


export default Products;
