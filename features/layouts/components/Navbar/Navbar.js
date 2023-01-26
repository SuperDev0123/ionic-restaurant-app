import { useState } from "react"
import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { styled } from "@mui/system"
import { withTheme } from "@mui/styles"
// import { darken } from "polished"
// import Button from "@mui/material/Button"
// import Box from "@mui/material/Box"
// import Grow from "@mui/material/Grow"
import Grid from "@mui/material/Grid"
import Hidden from "@mui/material/Hidden"
// import InputBase from "@mui/material/InputBase"
import Link from "@components/OurLink"
import MuiAppBar from "@mui/material/AppBar"
// import Popper from "@mui/material/Popper"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MuiIconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import ListItemButton from "@mui/material/ListItemButton"
import MenuIcon from "@mui/icons-material/Menu"
import NavbarUserDropdown from "./NavbarUserDropdown"
import NavBarMainMenu from "./NavBarMainMenu"
// import AdBlock from "@components/AdBlock"
import dashboardItems from "../Sidebar/dashboardItems"
import { Box } from "@mui/material"
const AppBar = styled(MuiAppBar)`
  color: ${props => props.theme.header.color};
  border-top: 5px solid ${props => props.theme.palette.primary.main};
  margin-top: 28px;
`

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`
const Header = styled(Box)({
    height: "50px",
    width: "100%",
    backgroundColor: "#ed2024",
    zIndex: 1100,
})

const Brand = styled(ListItemButton)`
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
  color: ${props => props.theme.sidebar.header.color};
  font-family: ${props => props.theme.typography.fontFamily};
  padding-right: ${props => props.theme.spacing(2)};
  padding-left: ${props => props.theme.spacing(2)};
  justify-content: center;
  cursor: pointer;
  flex-grow: 0;
  ${props => props.theme.breakpoints.up("md")} {
    padding-right: ${props => props.theme.spacing(6)};
  }
  &:hover {
    background: none;
  }
`

const Navbar = ({ onDrawerToggle }) => {
  // const router = useRouter()
  const { pathname } = useRouter()
  const [navItemSelected, setNavItemSelected] = useState(null)
  var pages = dashboardItems[0].pages

  const selectNavItem = page => {
    console.log("selectNavItem", page)
    if (navItemSelected?.title === page.title) {
      setNavItemSelected(null)
    } else {
      setNavItemSelected(page)
    }
  }

  return (
    <React.Fragment>
      <Header position="fixed" elevation={0}></Header>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Hidden xlUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item>
              <Brand component={Link} href="/">
                <Image
                  src="/images/logo-sz.svg"
                  width={30}
                  height={27}
                  alt="ShowZone logo"
                />
              </Brand>
            </Grid>
            <Grid item>
              <NavBarMainMenu
                pathname={pathname}
                pages={pages}
                selectNavItem={page => selectNavItem(page)}
                navItemSelected={navItemSelected}
              />
            </Grid>
            <Grid item xs />
            <Grid item>
              <NavbarUserDropdown />
            </Grid>
          </Grid>
        </Toolbar>
        {navItemSelected ? (
          <Menu>
            {navItemSelected.children.map(item => {
              return (
                <MenuItem key={item.title} href={item.href}>
                  {item.title}
                </MenuItem>
              )
            })}
          </Menu>
        ) : (
          <></>
        )}
      </AppBar>
    </React.Fragment>
  )
}

export default withTheme(Navbar)
