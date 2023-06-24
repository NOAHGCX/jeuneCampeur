import React from "react"
import { CSVLink } from "react-csv"

const useMountEffect = (fun: any) => React.useEffect(fun, [])

const Export = ({ exportData, exportKey, setExportReady, setItemsPerPage }: any) => {
  const csvLink = React.useRef<any>()

  useMountEffect(() => {
    setTimeout(() => {
      csvLink.current.link.click()
    }, 250)
    setTimeout(() => {
      setItemsPerPage(15)
      setExportReady(false)
    }, 500)
  })

  return (
    <CSVLink
      separator={";"}
      data={exportData}
      headers={exportKey}
      filename="data.csv"
      className="hidden"
      ref={csvLink}
      target="_blank"
    />
  )
}

export default Export
