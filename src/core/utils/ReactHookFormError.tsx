import React from "react"
import { getDotKeyObjectValue } from "./getDotKeyObjectValue"

type ErrorsProps = {
  errors: any
  name: string
  errorsMessage: any
  classesAlert?: string
  value?: string | null
}

const ReactHookFormError = ({
  errors,
  name,
  errorsMessage,
  classesAlert = "",
  value = null,
}: ErrorsProps) => {
  return (
    <>
      {((getDotKeyObjectValue(name, errors) &&
        value == null &&
        getDotKeyObjectValue(name, errors).type === "required") ||
        (getDotKeyObjectValue(name, errors) &&
          getDotKeyObjectValue(name, errors).type !== "required")) && (
        <span
          role="alert"
          className={`${classesAlert} flex flex-row justify-start items-center text-web-orange`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          {errorsMessage[getDotKeyObjectValue(name, errors).type]}
        </span>
      )}
    </>
  )
}

export default ReactHookFormError
