import Image from "next/image";
import { styled } from "@mui/system"
import MuiDrawer from "@mui/material/Drawer"
import ListItemButton from "@mui/material/ListItemButton"

import Link from "@components/OurLink"

import Footer from "./SidebarFooter"
import SidebarNav from "./SidebarNav"

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`

const Brand = styled(ListItemButton)`
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
  color: ${props => props.theme.sidebar.header.color};
  background-color: ${props => props.theme.sidebar.header.background};
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${props => props.theme.spacing(6)};
  padding-right: ${props => props.theme.spacing(6)};
  justify-content: center;
  cursor: pointer;
  flex-grow: 0;
  img {
    height: 24px;
  }
  &:hover {
    background: none;
  }
`

const Sidebar = ({ items, showFooter = true, ...rest }) => {
  return (
    <Drawer variant="permanent" {...rest}>
      <Brand component={Link} href="/">
        <Image
          src="/images/logo.svg"
          width={210}
          height={24}
          alt="ShowZone logo"
        />
      </Brand>
      <SidebarNav items={items} />
      {!!showFooter && <Footer />}
    </Drawer>
  )
}

export default Sidebar
