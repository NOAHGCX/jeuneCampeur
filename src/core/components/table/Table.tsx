import React, { Dispatch, SetStateAction } from "react"
import Td from "./Td"
import Th from "./Th"
import TablePagination from "./TablePagination"
import Export from "./Export"
import Select from "./Select"
import { getDotStringObject } from "src/core/utils/parseDotStringToObject"
import ActionsDropdown from "./Dropdown/ActionsDropdown"
import Link from "next/link"

type TableProps = {
  titre: string
  tableTheadClasses?: string
  tableClasses?: string
  tableTbodyClasses?: string
  tableTheadTrClasses?: string
  tableTbodyClassesTr?: string
  id: string
  items: Array<any> | undefined | null
  config: Array<any>
  keywords: string
  exportPartial?: boolean
  exportKey: Array<{
    label: string
    key: string
    value?: (item: any) => string
  }>
  exportAll?: boolean
  importAll?: boolean
  entrepriseId?: string | undefined | null
  refetch?: any
  setKeywords: (keywords: any) => void
  multiSelect: boolean
  selectList?: Array<any>
  setSelectList?: (selectList: any) => void
  selectAll?: boolean
  setSelectAll?: (selectAll: any) => void
  setPage: Dispatch<SetStateAction<number>>
  setItemsPerPage: (itemsPerPage: number) => void
  itemsPerPage: number
  count: number
  paginationTop: {
    itemsPerPage: number
    count: number
    setPage: Dispatch<SetStateAction<number>>
    page: number
    refetch: any
    tablePaginationClasses?: string
    tablePaginationPageClasses?: string
    tablePaginationButtonClasses?: string
  }
  paginationBottom: {
    itemsPerPage: number
    count: number
    setPage: Dispatch<SetStateAction<number>>
    page: number
    refetch: any
    tablePaginationClasses?: string
    tablePaginationPageClasses?: string
    tablePaginationButtonClasses?: string
  }
  multiOptions?: {
    text: () => string
    spanClasses?: string
    dropdownClasses?: string
    container?: string
    dropdown?: Array<{
      type: string
      target?: string
      href?: () => string
      to?: () => string
      text: () => string
      function?: () => void
      download?: () => void
      classes?: string
      mutation?: () => void
      confirm?: string
      hrefClasses?: string
      spanClasses?: string
      buttonClasses?: string
      onClick?: () => any
    }>
  }
  multiSelectValue?: (item: any) => string
  multiSelectCondition?: (item: any) => boolean
  empty?: string
  add?: string
}
const Table = ({
  titre,
  items,
  config,
  id,
  count,
  paginationTop,
  paginationBottom,
  setKeywords,
  setPage,
  setItemsPerPage,
  itemsPerPage,
  exportPartial = false,
  keywords = "",
  exportKey = [],
  exportAll = false,
  importAll = false,
  entrepriseId,
  refetch,
  multiSelect = false,
  selectAll = false,
  selectList = [],
  setSelectList = (selectList) => {},
  setSelectAll = (selectAll) => {},
  tableTheadClasses = "",
  tableClasses = "",
  tableTbodyClasses = "",
  tableTheadTrClasses = "",
  tableTbodyClassesTr = "",
  multiOptions = {
    text: () => {
      return ""
    },
  },
  multiSelectValue = (item) => {
    return item.id
  },
  multiSelectCondition = (item) => {
    return true
  },
  add = "",
}: TableProps) => {
  const [openExport, setOpenExport] = React.useState(false)
  const [exportData, setExportData] = React.useState<any>([])
  const [search, setSearch] = React.useState(keywords)
  const [exportReady, setExportReady] = React.useState(false)
  const [download, setDownload] = React.useState(false)
  const [selectKey, setSelectKey] = React.useState(exportKey)
  const [openModal, setOpenModal] = React.useState(false)

  const checkboxChange = (e: any) => {
    const { checked, value } = e.target
    if (checked) {
      setSelectList((old: Array<any>) => [...old, value])
    } else if (!checked && selectList && selectList.indexOf(value) !== -1) {
      setSelectList((old: Array<any>) => [...old.filter((i: any) => i != value)])
    }
  }

  const checkboxAllChange = (e: any) => {
    const { checked } = e.target
    if (checked) {
      setSelectAll(true)
    } else if (!checked) {
      setSelectAll(false)
    }
  }

  React.useEffect(() => {
    if (exportReady && items && items.length > 0 && items.length === itemsPerPage) {
      let objs = []
      ;(async () => {
        for await (let i of items) {
          let obj = {}
          for await (let e of exportKey) {
            obj = {
              ...obj,
              [e.key]: e.value ? e.value(i) : getDotStringObject(e.key, i),
            }
          }
          objs.push(obj)
        }
        setExportData(objs)
      })().catch((error) => {
        // Handle any potential errors here
        console.error(error)
      })
    }
  }, [items, exportReady])

  React.useEffect(() => {
    if (exportReady && items && items.length > 0 && items.length === exportData.length) {
      setTimeout(() => {
        setDownload(true)
      }, 1500)
    }
  }, [exportData, items, exportReady])

  const clickImport = () => {
    setOpenModal(true)
  }
  const reload = () => {
    refetch()
  }
  return (
    <div className="mx-4 w-full flex">
      <div className="py-8 flex flex-column w-full">
        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
          <h2 className="text-2xl leading-tight">{titre}</h2>
          <div className="text-end">
            <form
              className="flex flex-col md:flex-row w-3/4 md:w-full max-w-100 md:space-x-3 space-y-3 md:space-y-0 justify-center"
              onSubmit={(e) => {
                e.preventDefault()
                if (!exportReady) {
                  setPage(0)
                  setKeywords(search)
                }
                e.stopPropagation()
              }}
            >
              <div className=" relative ">
                <input
                  type="text"
                  id={`${id}_filter`}
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-100 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  placeholder="Mots-clé"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-700 focus:outline-none"
                type="button"
                disabled={exportReady}
                onClick={() => {
                  setPage(0)
                  setKeywords(search)
                }}
              >
                Rechercher
              </button>

              {exportAll && (
                <button
                  onClick={() => {
                    setOpenExport(!openExport)
                  }}
                  type={"button"}
                  className="flex-shrink-0 px-2 py-2 text-base font-semibold text-white bg-green-200 rounded-lg hover:bg-green-300 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#90A4AE"
                  >
                    <g>
                      <rect fill="none" height="24" width="24" />
                    </g>
                    <g>
                      <path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z" />
                    </g>
                  </svg>
                </button>
              )}
              {add.length > 0 && (
                <Link
                  href={add}
                  className="flex-shrink-0 px-2 py-2 text-base font-semibold text-white bg-teal-200 rounded-lg hover:bg-teal-300 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#90A4AE"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                </Link>
              )}
            </form>
          </div>
        </div>
        {openExport && (
          <>
            <Select
              exportPartial={exportPartial}
              exportAll={exportAll}
              items={exportKey}
              setDownload={setDownload}
              setExportData={setExportData}
              setExportReady={setExportReady}
              setItemsPerPage={setItemsPerPage}
              count={count}
              setSelectKey={setSelectKey}
              setOpenExport={setOpenExport}
            />
          </>
        )}
        {download && (
          <Export
            exportKey={selectKey}
            exportData={exportData}
            setExportReady={setExportReady}
            setItemsPerPage={setItemsPerPage}
          />
        )}
        {exportReady === true ? (
          <div className={"flex flex-col -mx-4 sm:-mx-5 px-4 sm:px-8 py-4 overflow-x-auto"}>
            <div className={"flex flex-col -mx-4 sm:-mx-5 px-4 sm:px-8 py-4 overflow-x-auto"}>
              <div className="flex items-center">
                <div className="w-6 h-6 border-b-2 border-gray-900 rounded-full animate-spin mr-4"></div>
                Création de votre csv en cours ...
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={`flex flex-row w-full justify-content-between items-end`}>
              {multiOptions && <ActionsDropdown {...multiOptions} />}
              <span></span>
              <TablePagination {...paginationTop} />
            </div>
            <div className="flex flex-col -mx-4 sm:-mx-5 px-4 sm:px-8 py-12">
              <div className="inline-block min-w-full rounded-lg min-h-10em">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr className={tableTheadTrClasses}>
                      {multiSelect && (
                        <Th
                          thSpanClasses={`flex my-auto`}
                          key={`${id}_thead_tr_multiselect`}
                          parentKey={`${id}_tbody_th`}
                          id={"multiselect"}
                          colone={"multiselect"}
                          text={
                            <input
                              type="checkbox"
                              className="mx-1.5"
                              name="all"
                              onChange={(e) => checkboxAllChange(e)}
                              checked={selectAll}
                            />
                          }
                          order={false}
                          currentOrder={{ colone: id, order: "asc" }}
                          setCurrentOrder={() => {}}
                        />
                      )}
                      {config.map((component) => (
                        <Th
                          thClasses={`${multiSelect ? "border-l" : ""}`}
                          key={`${id}_thead_tr_${component.id}`}
                          parentKey={`${id}_tbody_th`}
                          id={component.id}
                          {...component.th}
                        />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items &&
                      items.length > 0 &&
                      items.map((item) => (
                        <tr
                          key={`${id}_tbody_tr_${item.id}`}
                          className={`${tableTbodyClassesTr} hover:bg-indigo-50`}
                        >
                          {multiSelect && (
                            <>
                              {multiSelectCondition(item) ? (
                                <Td
                                  key={`${id}_tbody_tr_${item.id}_multiselect_td`}
                                  parentKey={`${id}_tbody_tr_${item.id}_multiselect_td`}
                                  text={(item) => {
                                    return (
                                      <>
                                        <input
                                          type="checkbox"
                                          name="multiselect[]"
                                          value={multiSelectValue(item).toString()}
                                          checked={
                                            selectList.indexOf(
                                              multiSelectValue(item).toString()
                                            ) !== -1
                                          }
                                          onChange={(e) => checkboxChange(e)}
                                        />
                                      </>
                                    )
                                  }}
                                  item={item}
                                  items={items}
                                />
                              ) : (
                                <td
                                  className={`px-3 py-2.5 border-b border-gray-200 text-sm group relative`}
                                />
                              )}
                            </>
                          )}
                          {config.map((components, l) => (
                            <Td
                              tdClasses={`${multiSelect ? "border-l" : ""}`}
                              key={`${id}_tbody_tr_${item.id}_${components.id}_td`}
                              parentKey={`${id}_tbody_tr_${item.id}_${components.id}_td`}
                              {...components.td}
                              item={item}
                              items={items}
                            />
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <TablePagination {...paginationBottom} />
          </>
        )}
      </div>
    </div>
  )
}

export default Table
