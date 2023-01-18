import MuiGlobalStyles from "@mui/material/GlobalStyles"

const defaultContainerStyles = {
  height: "100%",
  overflowX: "hidden",
}

const GlobalStyles = () => (
  <MuiGlobalStyles
    styles={theme => ({
      html: defaultContainerStyles,
      body: defaultContainerStyles,
      "#root": defaultContainerStyles,
      body: {
        background: theme.palette.background.default,
        margin: 0,
      },
      ".MuiCardHeader-action .MuiIconButton-root": {
        padding: "4px",
        width: "28px",
        height: "28px",
      },
    })}
  />
)

export default GlobalStyles
