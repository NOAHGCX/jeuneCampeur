import React from "react"
import { useState } from "react"

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

const Select = ({
  items,
  setDownload,
  setExportData,
  setExportReady,
  setItemsPerPage,
  count,
  setSelectKey,
  exportPartial,
  exportAll,
  setOpenExport,
}: any) => {
  const [selected, setSelected] = useState(items)
  const [open, setOpen] = React.useState(false)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const toggleSelect = (e: any) => {
    if (selected.filter((i: any) => i.key === e.key).length === 0) {
      setSelected((o: any) => [...o, e])
    } else {
      setSelected((o: any) => [...o.filter((i: any) => i.key !== e.key)])
    }
  }

  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        wrapperRef !== null &&
        wrapperRef !== undefined &&
        event !== null &&
        event !== undefined &&
        wrapperRef.current !== null &&
        wrapperRef.current !== undefined &&
        !wrapperRef.current.contains(event.target) &&
        open
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  return (
    <div className={`flex flex-col w-1/2`}>
      {exportPartial && (
        <div className="flex text-sm font-medium text-gray-700 w-full">
          Exporter les clés suivantes :
        </div>
      )}
      <div className={`flex flex-col`} ref={wrapperRef}>
        {exportPartial && (
          <div className="mt-1 relative">
            <div className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span
                className="flex items-center flex-wrap space-x-2 pl-3 pr-10 py-2"
                onClick={() => setOpen(!open)}
              >
                {selected.length > 0
                  ? selected.map((s: any) => (
                      <span
                        className={`mt-2 px-2 py-1 bg-gray-50 flex flex-row items-center justify-content-between hover:bg-red-50 cursor-pointer`}
                        onClick={() => {
                          toggleSelect(s)
                        }}
                      >
                        {s.label}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    ))
                  : "Aucune"}
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </span>
              <ul
                className={`absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm ${
                  open ? "flex flex-col" : "hidden"
                }`}
              >
                {items.map((item: any) => (
                  <li
                    key={item.key}
                    className={classNames(
                      "text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                    )}
                    onClick={() => toggleSelect(item)}
                  >
                    <div className="flex items-center">
                      <span
                        className={classNames(
                          selected.filter((i: any) => i.key === item.key).length === 1
                            ? "font-semibold"
                            : "font-normal",
                          "ml-3 block truncate"
                        )}
                      >
                        {item.label}
                      </span>
                    </div>

                    {selected.filter((i: any) => i.key === item.key).length === 1 ? (
                      <span
                        className={classNames(
                          "text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4"
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="flex text-sm font-medium text-gray-700 w-full mt-2">
          Nombre de données á exporter : {count}
        </div>
        <div className={`mt-3`}>
          {exportPartial && (
            <button
              type={"button"}
              className="w-40 flex-shrink-0 px-1.5 text-base font-semibold text-white bg-green-200 rounded-lg shadow-md hover:bg-green-300 focus:outline-none"
              onClick={() => {
                setSelectKey(selected)
                setDownload(false)
                setExportData([])
                setExportReady(true)
                setItemsPerPage(count)
                setOpenExport(false)
              }}
              disabled={selected.length === 0}
            >
              Exporter sélection
            </button>
          )}
          {exportAll && (
            <button
              type={"button"}
              className="w-40 mx-3 flex-shrink-0 px-1.5 text-base font-semibold text-white bg-green-200 rounded-lg shadow-md hover:bg-green-300 focus:outline-none"
              onClick={() => {
                setSelectKey(items)
                setDownload(false)
                setExportData([])
                setExportReady(true)
                setItemsPerPage(count)
                setOpenExport(false)
              }}
            >
              Tout exporter
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Select
