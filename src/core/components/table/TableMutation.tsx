import React from "react"

type TableMutationProps = {
  item: any
  text: (text: any) => string
  mutation: (item: any) => void
  confirm?: string | null
  hrefClasses?: string
  spanClasses?: string
  parentKey: string
  title?: string
}

const TableMutation = ({
  item,
  text,
  confirm = null,
  hrefClasses = "",
  spanClasses = "",
  parentKey,
  mutation,
  title = "",
}: TableMutationProps): JSX.Element => {
  return (
    <button
      className={`w-full ${hrefClasses}`}
      key={`${parentKey}_mutation`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (confirm) {
          if (window.confirm(confirm)) {
            mutation(item)
          }
        } else {
          mutation(item)
        }
      }}
      title={title}
    >
      <span className={spanClasses}>{text(item)}</span>
    </button>
  )
}

export default TableMutation
