import React from "react"
import Link from "next/link"

type TableLinkProps = {
  item: any
  href: (item: any) => string
  text: (item: any) => string
  condition?: any
  hrefClasses?: string
  spanClasses?: string
  parentKey: string
  title?: string
}

const TableLink = ({
  item,
  text,
  href,
  hrefClasses = "",
  spanClasses = "",
  parentKey,
  title = "",
  condition = null,
}: TableLinkProps): JSX.Element => {
  if (condition != null && condition(item) === false) {
    return <span className={spanClasses}>{text(item)}</span>
  }
  return (
    <Link
      href={href(item)}
      className={`${hrefClasses}`}
      key={`${parentKey}_link`}
      title={`${title}`}
      target="_blank"
    >
      <span className={spanClasses}>{text(item)}</span>
    </Link>
  )
}

export default TableLink
