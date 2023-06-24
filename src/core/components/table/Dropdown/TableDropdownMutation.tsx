import React from "react"

type TableDropdownMutationProps = {
  item: any
  text: (text: any) => string
  mutation: (item: any) => void
  confirm?: string | null
  buttonClassName?: string
  spanClasses?: string
  parentKey: string
  condition?: (item: any) => boolean
}

const TableDropdownMutation = ({
  item,
  text,
  confirm = null,
  buttonClassName = "",
  spanClasses = "",
  parentKey,
  mutation,
  condition,
}: TableDropdownMutationProps): JSX.Element | null => {
  if (condition != null && condition(item) === false) {
    return null
  }
  return (
    <button
      className={`block px-4 py-2 text-sm text-gray-700 w-full justify-start text-left border-0 ${buttonClassName}`}
      key={`${parentKey}_link`}
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
    >
      <span className={spanClasses}>{text(item)}</span>
    </button>
  )
}

export default TableDropdownMutation
