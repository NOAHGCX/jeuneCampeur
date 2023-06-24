import React from "react"
import TableLink from "./TableLink"
import TableMutation from "./TableMutation"
import TableDropdown from "./TableDropdown"

type TdProps = {
  tdClasses?: string
  parentKey: string
  item: any
  text: (item: any, items?: any) => any
  type?: string | null
  dropdown?: any
  tdSpanClasses?: string
  container?: any
  link?: any | null
  title?: string
  hrefClasses?: string
  items?: any
}

const Td = ({
  tdClasses = "",
  tdSpanClasses = "",
  type = null,
  parentKey,
  item,
  text,
  title = "",
  dropdown = null,
  container = "",
  link = null,
  hrefClasses = "",
  items = {},
}: TdProps): JSX.Element => {
  if (type === "link") {
    return (
      <td className={`${tdClasses} px-3 py-2.5 border-b border-gray-200 text-sm group relative`}>
        <TableLink
          item={item}
          parentKey={`${parentKey}_td`}
          text={text}
          title={title}
          {...link}
          spanClasses={tdSpanClasses}
          hrefClasses={hrefClasses}
        />
      </td>
    )
  }
  if (type === "mutation") {
    return (
      <td className={`${tdClasses} px-3 py-2.5 border-b border-gray-200 text-sm group relative`}>
        <TableMutation
          item={item}
          parentKey={`${parentKey}_td`}
          text={text}
          title={title}
          {...link}
          spanClasses={tdSpanClasses}
          hrefClasses={hrefClasses}
        />
      </td>
    )
  }
  if (type === "dropdown") {
    return (
      <td className={`${tdClasses} px-3 py-2.5 border-b border-gray-200 text-sm group relative`}>
        <TableDropdown
          item={item}
          parentKey={`${parentKey}_td`}
          dropdown={dropdown}
          text={text}
          spanClasses={tdSpanClasses}
          container={container}
        />
      </td>
    )
  }
  return (
    <td className={`${tdClasses} px-3 py-2.5 border-b border-gray-200 text-sm group relative`}>
      <span className={tdSpanClasses}>{text(item, items)}</span>
    </td>
  )
}

export default Td
