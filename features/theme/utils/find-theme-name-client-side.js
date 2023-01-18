import Cookies from "js-cookie"
import { THEMES } from "../../../constants"

const findThemeNameClientSide = () => {
  const themeName = Cookies.get("theme") || localStorage.getItem("theme")
  return THEMES[themeName] || THEMES.DEFAULT
}

export default findThemeNameClientSide
