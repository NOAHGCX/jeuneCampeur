export const parseDotStringToObject = (str: any, value: any, options: any) => {
  const recursive = (keys: any, obj: any, value: any, options: any): any => {
    if (keys.length === 1) {
      return { ...obj, ...options, [keys[0]]: value }
    }
    return { ...obj, [keys[0]]: recursive(keys.slice(1), obj, value, options) }
  }

  if (str.includes("every") || str.includes("some") || str.includes("none")) {
    return {
      AND: [
        recursive(str.split("."), {}, value, options),
        {
          NOT: {
            [str.split(".")[0]]: {
              none: {},
            },
          },
        },
      ],
    }
  } else {
    return recursive(str.split("."), {}, value, options)
  }
}

export const getDotStringObject = (str: any, obj: any) => {
  if (Object.keys(obj).length > 0) {
    const recursive = (keys: any, obj: any): any => {
      if (keys.length === 1) {
        return obj[keys[0]]
      }
      return recursive(keys.slice(1), { ...obj[keys[0]] })
    }

    return recursive(str.split("."), obj)
  }

  return ""
}

export const getStringFromObject = (obj: any): any => {
  let str = ""
  if (Object.keys(obj).length > 0) {
    if (str.length === 0) {
      str = Object.keys(obj)[0]
    } else {
      str = `${str}.${Object.keys(obj)[0]}`
    }

    const recursive = (obj: any, str: any): any => {
      str = `${str}.${Object.keys(obj)[0]}`

      if (typeof obj[Object.keys(obj)[0]] === "object") {
        return recursive(obj[Object.keys(obj)[0]], str)
      } else {
        return [str, obj[Object.keys(obj)[0]]]
      }
    }

    if (typeof obj[Object.keys(obj)[0]] === "object") {
      return recursive(obj[Object.keys(obj)[0]], str)
    } else {
      return [str, obj[Object.keys(obj)[0]]]
    }
  }
}
