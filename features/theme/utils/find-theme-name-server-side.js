import Cookies from "cookies"
import { THEMES } from "../../../constants"

const findThemeNameServerSide = ({ req, res }) => {
  let themeName = THEMES.DEFAULT
  try {
    const cookies = new Cookies(req, res)
    themeName =
      cookies.get("theme") in THEMES ? cookies.get("theme") : THEMES.DEFAULT
  } catch (err) {
    // console.error(err)
  } finally {
    return themeName
  }
}

export default findThemeNameServerSide
