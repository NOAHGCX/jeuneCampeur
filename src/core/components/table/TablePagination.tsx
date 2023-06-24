import React from "react"

type TablePaginationProps = {
  page: number
  count: number
  itemsPerPage?: number
  tablePaginationPageClasses?: string
  tablePaginationClasses?: string
  tablePaginationButtonClasses?: string
  setPage: any
  refetch: any
}

const TablePagination = ({
  page,
  count,
  itemsPerPage = 10,
  tablePaginationPageClasses = "",
  tablePaginationClasses = "",
  tablePaginationButtonClasses = "",
  setPage,
  refetch,
}: TablePaginationProps): JSX.Element => {
  const goToPreviousPage = () => {
    setPage(page - 1)
    refetch()
  }

  const goToNextPage = () => {
    setPage(page + 1)
    refetch()
  }

  const button: Array<JSX.Element> = new Array<JSX.Element>()
  if (page > 0) {
    button.push(
      <button
        className="w-full px-2 py-1 border text-sm text-gray-600 bg-white hover:bg-gray-100"
        onClick={() => setPage(0)}
        key="paginate_1"
      >
        1
      </button>
    )
  }
  if (page - 1 > 0 && page - 1 !== 0) {
    button.push(
      <button
        className="w-full px-2 py-1 border text-sm text-gray-600 bg-white hover:bg-gray-100"
        key="paginate_nothing"
      >
        ...
      </button>
    )
  }
  if (page - 1 > 0) {
    button.push(
      <button
        className="w-full px-2 py-1 border text-sm text-gray-600 bg-white hover:bg-gray-100"
        onClick={() => setPage(page - 1)}
        key={`paginate_${page - 1}`}
      >
        {page}
      </button>
    )
  }
  if (Math.ceil(count / itemsPerPage) > 0) {
    button.push(
      <button
        className="w-full px-2 py-1 border-t border-b text-sm text-indigo-500 bg-white hover:bg-gray-100"
        key={`paginate_${page + 1}`}
      >
        {page + 1}
      </button>
    )
  }
  if (page + 1 < Math.ceil(count / itemsPerPage) && page + 2 !== Math.ceil(count / itemsPerPage)) {
    button.push(
      <button
        className="w-full px-2 py-1 border text-sm text-gray-600 bg-white hover:bg-gray-100"
        onClick={() => setPage(page + 1)}
        key={`paginate_${page + 2}`}
      >
        {page + 2}
      </button>
    )
  }
  if (page + 1 < Math.ceil(count / itemsPerPage) && page + 2 !== Math.ceil(count / itemsPerPage)) {
    button.push(
      <button
        className="w-full px-2 py-1 border text-sm text-gray-600 bg-white hover:bg-gray-100"
        key="paginate_nothing_bis"
      >
        ...
      </button>
    )
  }
  if (Math.ceil(count / itemsPerPage) - 1 !== page && Math.ceil(count / itemsPerPage) > 0) {
    button.push(
      <button
        className="w-full px-2 py-1 border text-sm text-gray-600 bg-white hover:bg-gray-100"
        onClick={() => setPage(Math.ceil(count / itemsPerPage) - 1)}
        key={`paginate_${Math.ceil(count / itemsPerPage)}`}
      >
        {Math.ceil(count / itemsPerPage)}
      </button>
    )
  }

  return (
    <>
      <div
        className={`bg-white flex flex-col xs:flex-row items-end mt-2 ${tablePaginationClasses}`}
      >
        <div className={`flex items-center flex-nowrap ${tablePaginationPageClasses}`}>
          <div
            className={`w-full px-2 py-2.5 text-sm text-gray-600 bg-white hover:bg-gray-100 whitespace-nowrap`}
          >
            {page * itemsPerPage}-
            {(page + 1) * itemsPerPage > count ? count : (page + 1) * itemsPerPage} de {count}
          </div>
          <button
            type="button"
            className={`w-full px-2 py-2.5 border text-sm rounded-l-xl text-gray-600 bg-white hover:bg-gray-100 ${tablePaginationButtonClasses}`}
            onClick={() => {
              goToPreviousPage()
            }}
            disabled={page <= 0}
          >
            <svg
              width="9"
              fill="currentColor"
              height="8"
              className=""
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
            </svg>
          </button>
          {button}
          <button
            type="button"
            className={`w-full px-2 py-2.5 border-t border-b border-r text-sm rounded-r-xl text-gray-600 bg-white hover:bg-gray-100 ${tablePaginationButtonClasses}`}
            onClick={() => {
              goToNextPage()
            }}
            disabled={page + 1 >= count / itemsPerPage}
          >
            <svg
              width="9"
              fill="currentColor"
              height="8"
              className=""
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default TablePagination
