import React from "react"

type ActionsDropdownProps = {
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
    condition?: () => boolean
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

const ActionsDropdown = ({
  text,
  spanClasses = "",
  dropdownClasses = "",
  dropdown,
  container = "",
}: ActionsDropdownProps): JSX.Element => {
  return (
    <div className={container}>
      <span className={`${spanClasses} outline-none`}>{text()}</span>
      <div
        className={`${dropdownClasses} hidden group-hover:flex flex-col z-10
          left-[50%] top-full absolute w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none
        `}
      >
        {dropdown &&
          dropdown.map((dropdownItem, k) => {
            if (dropdownItem.type === "button") {
              return (
                <button
                  className={`block px-2 py-1 text-sm text-gray-700`}
                  onClick={() => {
                    if (dropdownItem.onClick) {
                      dropdownItem.onClick()
                    }
                  }}
                  key={`action_dropdown_${k}`}
                >
                  <span>{dropdownItem.text()}</span>
                </button>
              )
            }
          })}
      </div>
    </div>
  )
}

export default ActionsDropdown
