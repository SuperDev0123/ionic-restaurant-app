import { useState, useEffect } from "react"
import { styled, css } from "@mui/system"
import ReactPerfectScrollbar from "react-perfect-scrollbar"
import List from "@mui/material/List"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import SidebarNavSection from "./SidebarNavSection"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { rgba, darken } from "polished"
import SearchIcon from "@mui/icons-material/Search"
import PlayerSearchModal from  "../../../navigation/PlayerSearchModal"

const baseScrollbar = (props) => css`
  background-color: ${props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`

const Scrollbar = styled("div")`
  ${baseScrollbar}
`

const PerfectScrollbar = styled(ReactPerfectScrollbar)`
  ${baseScrollbar}
`

const Items = styled("div")`
  padding-top: ${props => props.theme.spacing(2.5)};
  padding-bottom: ${props => props.theme.spacing(2.5)};
`

const SmallNav = styled("div")`
  padding-left: 2rem;
  font-size: 0.75rem;
  a {
    color: #fff;
  }
`

const Title = styled(ListItemText)`
  margin: 0;
  span {
    color: ${props =>
      rgba(
        props.theme.sidebar.color,
        props.depth && props.depth > 0 ? 0.7 : 1
      )};
    font-size: ${props => props.theme.typography.body1.fontSize}px;
    padding: 0 ${props => props.theme.spacing(4)};
  }
`

const Item = styled(ListItemButton)`
  padding-top: ${props =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  padding-bottom: ${props =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  padding-left: ${props =>
    props.theme.spacing(props.depth && props.depth > 0 ? 14 : 8)};
  padding-right: ${props =>
    props.theme.spacing(props.depth && props.depth > 0 ? 4 : 7)};
  font-weight: ${props => props.theme.typography.fontWeightRegular};
  svg {
    color: ${props => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.08);
    color: ${props => props.theme.sidebar.color};
  }
  &.${props => props.activeclassname} {
    background-color: ${props => darken(0.03, props.theme.sidebar.background)};
    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`

const SidebarNav = ({ items }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const ScrollbarComponent = matches ? PerfectScrollbar : Scrollbar

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  return (
    <>
      <PlayerSearchModal
        openModal={openModal}
        handleCloseModal={handleCloseModal} 
      />
      <ScrollbarComponent>
        <List disablePadding>
          <Items>
            {items &&
              items.map((item, index) => {
                return (
                <SidebarNavSection
                  component="div"
                  key={item.title + index}
                  pages={item.pages}
                  title={item.title}
                />
              )})}
          </Items>
        </List>
      </ScrollbarComponent>
    </>
  )
}

export default SidebarNav
