import React from "react"
import { getStringFromObject } from "src/core/utils/parseDotStringToObject"

type ThProps = {
  id: string
  text: any
  colone?: string | null
  parentKey: string
  order?: boolean
  thClasses?: string
  thActiveOrderClasses?: string
  thSpanClasses?: string
  thButtonClasses?: string
  setCurrentOrder: (currentOrder: any) => void
  currentOrder: { colone: string; order: string }
  orderColumn?: string
}

const Th = ({
  id,
  text,
  colone = null,
  parentKey,
  thClasses = "",
  thActiveOrderClasses = "",
  thSpanClasses = "",
  thButtonClasses = "",
  order = false,
  orderColumn = "",
  currentOrder,
  setCurrentOrder,
}: ThProps): JSX.Element => {
  const selectOrder = () => {
    if (order && (orderColumn.length > 0 ? orderColumn : colone)) {
      let o = "asc"
      const strO = getStringFromObject(currentOrder)

      if (strO[0] === orderColumn.length > 0 ? orderColumn : colone && strO[1] === "asc") {
        o = "desc"
      }

      setCurrentOrder({ [orderColumn]: o })
    }
  }
  return (
    <th
      scope="col"
      className={`border-b border-gray-200 text-gray-800 text-sm uppercase font-normal
        ${thClasses} ${
        (orderColumn.length > 0 ? orderColumn : colone) &&
        currentOrder &&
        getStringFromObject(currentOrder)[0] === (orderColumn.length > 0 ? orderColumn : colone) &&
        getStringFromObject(currentOrder)[1] != null
          ? "bg-gray-50"
          : "bg-white"
      } ${
        (orderColumn.length > 0 ? orderColumn : colone) &&
        currentOrder &&
        getStringFromObject(currentOrder)[0] === (orderColumn.length > 0 ? orderColumn : colone) &&
        getStringFromObject(currentOrder)[1] != null
          ? thActiveOrderClasses
          : ""
      }
      `}
      key={`${parentKey}_${id}`}
    >
      {order ? (
        <button
          className={`${thButtonClasses} px-3 py-3 outline-none w-full uppercase`}
          onClick={() => selectOrder()}
        >
          <span className={`${thSpanClasses} flex flex-row items-center`}>
            <span>{text}</span>
            {order &&
              (orderColumn.length > 0 ? orderColumn : colone) &&
              getStringFromObject(currentOrder)[0] ===
                (orderColumn.length > 0 ? orderColumn : colone) &&
              getStringFromObject(currentOrder)[1] != null &&
              getStringFromObject(currentOrder)[1] === "asc" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
              )}
            {order &&
              (orderColumn.length > 0 ? orderColumn : colone) &&
              getStringFromObject(currentOrder)[0] ===
                (orderColumn.length > 0 ? orderColumn : colone) &&
              getStringFromObject(currentOrder)[1] != null &&
              getStringFromObject(currentOrder)[1] === "desc" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                  />
                </svg>
              )}
          </span>
        </button>
      ) : (
        <span className={`px-2.5 py-3 ${thSpanClasses}`}>{text}</span>
      )}
    </th>
  )
}

export default Th
