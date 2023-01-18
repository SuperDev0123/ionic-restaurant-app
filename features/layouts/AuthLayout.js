import React, { useState } from "react"
import { styled, spacing } from "@mui/system"

import CssBaseline from "@mui/material/CssBaseline"

import GlobalStyles from "./components/GlobalStyles"

const Root = styled("div")`
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const AuthLayout = ({ children }) => {
  return (
    <Root>
      <CssBaseline />
      <GlobalStyles />
      {children}
      {/* <Settings /> */}
    </Root>
  )
}

export default AuthLayout
