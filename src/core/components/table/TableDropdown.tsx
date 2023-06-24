import React from "react"
import TableDropdownLink from "./Dropdown/TableDropdownLink"
import TableDropdownMutation from "./Dropdown/TableDropdownMutation"
import TableDropdownButton from "./Dropdown/TableDropdownButton"
import TableDropdownHref from "./Dropdown/TableDropdownHref"

type TableDropdownProps = {
  item: any
  text: (item: any) => string
  spanClasses?: string
  dropdownClasses?: string
  container?: string
  parentKey: string
  dropdown?: Array<{
    type: string
    target?: string
    href?: (item: any) => string
    to?: (item: any) => string
    text: (item: any) => string
    function?: (item: any) => void
    condition?: (item: any) => boolean
    download?: (item: any) => void
    classes?: string
    mutation?: (item: any) => void
    confirm?: string
    hrefClasses?: string
    spanClasses?: string
    buttonClasses?: string
    buttonClassName?: string
    onClick?: (item: any) => any
  }>
}

const TableDropdown = ({
  item,
  text,
  spanClasses = "",
  dropdownClasses = "",
  dropdown,
  container = "",
  parentKey,
}: TableDropdownProps): JSX.Element => {
  return (
    <div className={container}>
      <span className={`${spanClasses} outline-none`}>{text(item)}</span>
      <div
        className={`${dropdownClasses} hidden group-hover:flex flex-col z-10
          origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-sm py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none
        `}
      >
        {dropdown &&
          dropdown.map((dropdownItem, k) => {
            if (dropdownItem.type === "button" && dropdownItem.onClick) {
              return (
                <TableDropdownButton
                  item={item}
                  key={`${parentKey}_dropdown_item_${k}`}
                  parentKey={`${parentKey}_dropdown_item_${k}`}
                  text={dropdownItem.text}
                  onClick={dropdownItem.onClick}
                  confirm={dropdownItem.confirm}
                  condition={dropdownItem?.condition}
                  buttonClassName={dropdownItem.buttonClassName}
                  spanClasses={dropdownItem.spanClasses}
                />
              )
            }

            if (dropdownItem.type === "link" && dropdownItem.href) {
              return (
                <TableDropdownLink
                  item={item}
                  key={`${parentKey}_dropdown_item_${k}`}
                  parentKey={`${parentKey}_dropdown_item_${k}`}
                  href={dropdownItem.href}
                  text={dropdownItem.text}
                  confirm={dropdownItem.confirm}
                  condition={dropdownItem?.condition}
                  hrefClasses={dropdownItem.hrefClasses}
                  spanClasses={dropdownItem.spanClasses}
                  target={dropdownItem?.target}
                />
              )
            }

            if (dropdownItem.type === "href" && dropdownItem.href) {
              return (
                <TableDropdownHref
                  item={item}
                  key={`${parentKey}_dropdown_item_${k}`}
                  parentKey={`${parentKey}_dropdown_item_${k}`}
                  href={dropdownItem.href}
                  text={dropdownItem.text}
                  target={dropdownItem?.target}
                  confirm={dropdownItem.confirm}
                  condition={dropdownItem?.condition}
                  hrefClasses={dropdownItem.hrefClasses}
                  spanClasses={dropdownItem.spanClasses}
                />
              )
            }

            if (dropdownItem.type === "mutation" && dropdownItem.mutation) {
              return (
                <TableDropdownMutation
                  item={item}
                  key={`${parentKey}_dropdown_item_${k}`}
                  parentKey={`${parentKey}_dropdown_item_${k}`}
                  mutation={dropdownItem.mutation}
                  text={dropdownItem.text}
                  condition={dropdownItem?.condition}
                  confirm={dropdownItem.confirm}
                  buttonClassName={dropdownItem.buttonClassName}
                  spanClasses={dropdownItem.spanClasses}
                />
              )
            }

            return null
          })}
      </div>
    </div>
  )
}

export default TableDropdown
