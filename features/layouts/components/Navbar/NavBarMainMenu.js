import { useState } from "react"
import { styled } from "@mui/system"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MuiIconButton from "@mui/material/IconButton"
import MuiButton from "@mui/material/Button"
import Box from "@mui/material/Box"
import Link from "@components/OurLink"
// import Link from 'next/link'
import useAuth from "@useAuth"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Button = styled(MuiButton)`
  &.active-item {
    background-color: #ed2024;
  }
`

const DropDownMenu = props => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
 
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Button
        key={props.page.title}
        id={props.page.title + "-button"}
        onClick={handleClick}
        aria-controls={open ? props.page.title : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ color: "white", marginRight: ".25rem", textTransform: "uppercase" }}
        className={open ? "active-item" : undefined}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {props.page.title}
      </Button>
      <Menu
        anchorEl={anchorEl}
        key={props.page.title + '-Menu'}
        id={props.page.title}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
          {props.page.children.map(child => {
            return <MenuItem sx={{textTransform: "uppercase"}} key={child.title} component={Link} href={child.href}>{child.title}</MenuItem>
          })}
      </Menu>
    </>
  )
}

const NavBarMainMenu = ({
  pages,
  selectNavItem,
  navItemSelected,
  pathname,
}) => {
  const { currentUser, signOut, userLoaded } = useAuth()

  return (
    <>
   
      <Box sx={{ flexGrow: 1, display: { xs: "none", xl: "flex" } }}>
        {pages.map((page, key) => {
          if (page.children) {
            return <DropDownMenu page={page} key={key} />
          } else {
            return (
              <Button
                sx={{ color: "white", marginRight: ".25rem", textTransform: "uppercase" }}
                key={key}
                href={page.href}
                component={Link}
              >
                {page.title}{" "}
                <span
                  style={{
                    fontFamily: "Road Rage",
                    fontSize: 18,
                    marginTop: "2px",
                    color: page.color || "#fff",
                  }}
                >
                  {page.specialFontText}
                </span>
              </Button>
            )
          }
        })}
     
      </Box>
    </>
  )
}

export default NavBarMainMenu
