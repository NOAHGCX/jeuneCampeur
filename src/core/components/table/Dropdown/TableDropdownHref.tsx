import React from "react"

type TableDropdownHrefProps = {
  item: any
  href: (item: any) => string
  text: (item: any) => string
  hrefClasses?: string
  spanClasses?: string
  parentKey: string
  confirm?: string | null
  condition?: (item: any) => boolean
  target?: string
}

const TableDropdownHref = ({
  item,
  text,
  href,
  confirm = null,
  hrefClasses = "",
  spanClasses = "",
  parentKey,
  condition,
  target = "",
}: TableDropdownHrefProps): JSX.Element | null => {
  if (condition != null && condition(item) === false) {
    return null
  }
  return (
    <a
      href={href(item)}
      className={`block px-4 py-2 text-sm text-gray-700 ${hrefClasses}`}
      key={`${parentKey}_link`}
      target={target}
      onClick={() => {
        if (confirm && window.confirm(confirm)) {
          return true
        }
      }}
      onKeyPress={() => {
        if (confirm && window.confirm(confirm)) {
          return true
        }
      }}
    >
      <span className={spanClasses}>{text(item)}</span>
    </a>
  )
}

export default TableDropdownHref
