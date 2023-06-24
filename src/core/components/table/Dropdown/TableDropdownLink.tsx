import React from "react"
import Link from "next/link"

type TableDropdownLinkProps = {
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

const TableDropdownLink = ({
  item,
  text,
  href,
  confirm = null,
  hrefClasses = "",
  spanClasses = "",
  target = "",
  parentKey,
  condition,
}: TableDropdownLinkProps): JSX.Element | null => {
  if (condition != null && condition(item) === false) {
    return null
  }
  return (
    <Link
      href={href(item)}
      className={`block px-4 py-2 text-sm text-gray-700 ${hrefClasses}`}
      key={`${parentKey}_link`}
      role="link"
      tabIndex={0}
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
    </Link>
  )
}

export default TableDropdownLink
