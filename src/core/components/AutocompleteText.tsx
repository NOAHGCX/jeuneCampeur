import React from "react"
import { FaSearch } from "react-icons/fa"
import { FaTimes } from "react-icons/fa"

type AutocompleteTextProps = {
  items: Array<{
    name: string
  }>
  text: string
  setText: (text: string) => void
  sendResearch: () => void
  onChangeText: () => void
  selectedText: (value: string) => void
}

const AutocompleteText = ({
  items,
  text,
  setText,
  sendResearch,
  onChangeText,
  selectedText,
}: AutocompleteTextProps) => {
  interface Item {
    name: string
    title: string
  }

  var [suggestions, setSuggestions] = React.useState([])
  var [choice, setChoice] = React.useState<any>([])
  var [timesIcon, setTimesIcon] = React.useState(false)
  var [stateOfResearch, setStateOfResearch] = React.useState(false)

  //permet de voir l'evolution du text rentré par l'utilisateur
  const onTextChanged = (e) => {
    const value = e.target.value
    var selectSuggestions = [] as any
    if (value.length > 0) {
      setTimesIcon((timesIcon = true))
      const regex = new RegExp(`^${value}`, "i")
      if (
        items.sort().filter((v) => regex.test(v.name)).length > 0
      ) {
        selectSuggestions = items.sort().filter((v) => regex.test(v.name))
      }
    }
    setChoice([])
    setStateOfResearch(false)
    setText(value)
    setChoice(value)
    setSuggestions(selectSuggestions)
  }

  //permet de savoir qu'est ce qui a été selectionné
  const suggestionSelected = (value, value1) => {
    const table = value
    setChoice(table)
    setSuggestions(suggestions)
    selectedText(value1)
    sendResearch()
    setStateOfResearch(true)
    setSuggestions([])
  }

  /*render permettant de faire evoluer les suggestion*/
  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null
    }
    return (
      <ul className="border-orange border w-295 max-h-60 text-sm mt-3 rounded-5 sticky overflow-auto list-none">
        <div>
          <li className="hover:bg-gray-100 w-full h-40 mx-auto flex items-center pl-2.5">
            <button
              onClick={() => suggestionSelected([choice], choice)}
              className="text-left w-full focus:outline-none focus:border-transparent overflow-hidden "
            >
              {choice}
            </button>
          </li>
        </div>
        {suggestions.map((item: Item, index) => (
          <li
            key={index}
            className="hover:bg-gray-100 w-full h-40 mx-auto flex items-center pl-2.5"
          >
            <button
              onClick={() => suggestionSelected([item.name], item.name)}
              className="text-left w-full focus:outline-none  focus:border-transparent overflow-hidden "
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    )
  }

  const deleteResearch = () => {
    setChoice([])
    onChangeText()
    if (stateOfResearch === true) {
      sendResearch()
    } else if (stateOfResearch === false) {
      setSuggestions([])
    }
    setTimesIcon(false)
  }

  const buttonPress = () => {
    const value = [text]
    const value1 = text
    const table = value.join(" - ")
    setChoice(table)
    setText(value1)
    setStateOfResearch(true)
    setSuggestions([])
  }

  /*render principale permettant de faire evoluer le render suggestions en fonction de ce qui est ecrit*/
  return (
    <div>
      <div className=" container flex items-stretch ">
        <input
          value={choice}
          placeholder="Rechercher.."
          onChange={onTextChanged}
          type="text"
          className=" placeholder-gris border-l border-t border-b border-orange rounded-l-5 w-223 h-40 text-sm p-2  focus:outline-none focus:ring-orange "
        />
        <div className=" container border-t border-b flex border-orange justify-center items-center w-36 h-40 ">
          {timesIcon ? <FaTimes className="w-4 h-4 opacity-100" onClick={deleteResearch} /> : null}
        </div>
        <div className=" container  flex justify-center items-center bg-orange w-36 h-40 rounded-r-5">
          <FaSearch className="text-white w-18 h-18" onClick={buttonPress} />
        </div>
      </div>
      {renderSuggestions()}
    </div>
  )
}
export default AutocompleteText
