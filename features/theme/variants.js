import merge from "deepmerge"
import { green, grey, indigo, red } from "@mui/material/colors"
import { THEMES } from "../../constants"

const showzoneRed = "#ed2024"
const showzoneRedLight = "#FF584D"
const showzoneRedDark = "#ca000c"
const showzoneGrey = "#212121"
const showzoneGreyLight = "#292929"
const showzoneGreyDark = "#1c1c1c"
const showzoneGold = "#ba740c"
const showzoneBlack = "#161616"

// const defaultVariant = {
//   name: THEMES.DEFAULT,
//   palette: {
//     mode: "dark",
//     primary: {
//       main: showzoneRed,
//       contrastText: "#FFF",
//       gold: showzoneGold,
//     },
//     secondary: {
//       main: showzoneGreyLight,
//       contrastText: "#FFF",
//     },
//     background: {
//       default: showzoneGreyDark,
//       paper: showzoneGreyLight,
//     },
//   },
//   header: {
//     color: grey[300],
//     background: showzoneGreyDark,
//     search: {
//       color: grey[200],
//     },
//   },
//   footer: {
//     color: grey[300],
//     background: showzoneGreyLight,
//   },
// }

const defaultVariant = {
  name: THEMES.DARK,
  palette: {
    mode: "dark",
    primary: {
      main: showzoneRed,
      contrastText: "#FFF",
      gold: showzoneGold,
    },
    secondary: {
      main: showzoneGreyLight,
      contrastText: "#FFF",
    },
    background: {
      default: showzoneBlack,
      paper: showzoneGreyDark,
    },
    text: {
      primary: "rgba(255, 255, 255, 0.95)",
      secondary: "rgba(255, 255, 255, 0.5)",
    },
  },
  header: {
    color: grey[300],
    background: showzoneGreyDark,
    search: {
      color: grey[200],
    },
  },
  footer: {
    color: grey[300],
    background: showzoneGreyDark,
  },
  sidebar: {
    color: "#fff",
    background: showzoneGreyLight,
    header: {
      color: grey[200],
      background: showzoneGreyLight,
      brand: {
        color: showzoneRed,
      },
    },
    footer: {
      color: grey[200],
      background: showzoneGreyLight,
      online: {
        background: green[500],
      },
    },
    badge: {
      color: "#FFF",
      background: showzoneRed,
    },
  },
}

const variants = [
  defaultVariant,
]

export default variants
