import React from "react"

type TableDropdownButtonProps = {
  item: any
  text: (item: any) => string
  buttonClassName?: string
  spanClasses?: string
  onClick: (item: any) => any
  parentKey: string
  confirm?: string | null
  condition?: (item: any) => boolean
}

const TableDropdownButton = ({
  item,
  text,
  onClick,
  confirm = null,
  buttonClassName = "",
  spanClasses = "",
  parentKey,
  condition,
}: TableDropdownButtonProps): JSX.Element | null => {
  if (condition != null && condition(item) === false) {
    return null
  }
  return (
    <button
      className={`block px-4 py-2 text-sm text-gray-700 w-full justify-start text-left border-0 ${buttonClassName}`}
      onClick={() => {
        if (confirm && window.confirm(confirm)) {
          onClick(item)
        } else {
          onClick(item)
        }
      }}
    >
      <span className={spanClasses}>{text(item)}</span>
    </button>
  )
}

export default TableDropdownButton
