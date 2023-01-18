import { useState, useEffect, useCallback } from "react"
import { styled, spacing } from "@mui/system"
import { useRouter } from "next/router"

import Hidden from "@mui/material/Hidden"
import CssBaseline from "@mui/material/CssBaseline"
import MuiPaper from "@mui/material/Paper"
import AdBlock from "@components/AdBlock/AdBlock"

import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"

import GlobalStyles from "./components/GlobalStyles"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import dashboardItems from "./components/Sidebar/dashboardItems"

const drawerWidth = 258

const Root = styled("div")`
  display: flex;
  min-height: 100vh;
`

const AppContent = styled("div")`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow: hidden;
`

const Paper = styled(MuiPaper)(spacing)

const MainContent = styled(Paper)`
  flex: 1;
  width: 100%;
  background: ${props => props.theme.palette.background.default};
  margin: 0 auto;
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const theme = useTheme()
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"))

  const handleRouteChange = useCallback(() => setMobileOpen(false), [])

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange)

    return () => router.events.on("routeChangeStart", handleRouteChange)
  }, [router, handleRouteChange])

  return (
    <Root>
      <CssBaseline />
      <GlobalStyles />
      <Hidden xlUp implementation="js">
        <Sidebar
          PaperProps={{ style: { width: drawerWidth } }}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          items={dashboardItems}
        />
      </Hidden>
      <AppContent>
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <MainContent sx={{ marginTop: "5rem" }} p={isLgUp ? 12 : 5}>
          {/* <AdBlock id="pw-header-leaderboard" type="leaderboard margin-bottom" />{" "} */}
          {children}
          {/* <Outlet /> */}
        </MainContent>
        <Footer />
      </AppContent>
    </Root>
  )
}

export default DashboardLayout
