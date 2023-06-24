export const getDotKeyObjectValue = (str: any, obj: any) => {
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
