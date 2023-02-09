import { forwardRef, useState } from "react"
import { styled } from "@mui/system"
import { rgba, darken } from "polished"

import Chip from "@mui/material/Chip"
import Collapse from "@mui/material/Collapse"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import NavLink from "@components/OurNavLink"

// import { IonRouterLink } from "@ionic/react" // this breaks the app


const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref}>
    <NavLink {...props} />
  </div>
))

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

const Text = styled('div')`
    clear: both;
    font-size: .75rem;
    width: 100%;
`

const SpecialText = styled('span')`
    font-family: 'Road Rage', sans-serif;  
    padding: 0 !important;
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

const Badge = styled(Chip)`
  font-weight: ${props => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 26px;
  top: 12px;
  background: ${props => props.theme.sidebar.badge.background};
  z-index: 1;
  span.MuiChip-label,
  span.MuiChip-label:hover {
    font-size: 11px;
    cursor: pointer;
    color: ${props => props.theme.sidebar.badge.color};
    padding-left: ${props => props.theme.spacing(2)};
    padding-right: ${props => props.theme.spacing(2)};
  }
`

const NewChip = styled(Chip)`
  background: red;
  font-weight: 700;
  font-size: 10px !important;
  text-transform: uppercase;
  height: 18px;
  
  span {
    font-size: 11px !important;
  }
`

const ExpandLessIcon = styled(ExpandLess)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`

const ExpandMoreIcon = styled(ExpandMore)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`

const SidebarNavListItem = props => {
  const {
    title,
    href,
    text,
    depth = 0,
    children,
    icon: Icon,
    badge,
    isNew,
    isUpdated,
    color,
    specialFontText,
    open: openProp = false,
  } = props

  const [open, setOpen] = useState(openProp)

  const handleToggle = () => {
    setOpen(state => !state)
  }

  if (children) {
    return (
      <>
        <Item depth={depth} onClick={handleToggle}>
          {Icon && <Icon />}
          <Title depth={depth}>
            {title} {specialFontText}
            {badge && <Badge label={badge} />}
            <Text>{text}</Text>
            { isNew ? <NewChip label="New!" color="primary" size="small"></NewChip> : '' }
            { isUpdated ? <NewChip label="Updated!" color="primary" size="small"></NewChip> : '' }
          </Title>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Item>
        <Collapse in={open}>{children}</Collapse>
      </>
    )
  }

  return (
    <>
      <Item
        depth={depth}
        component={CustomRouterLink}
        href={href}
        activeclassname="active"
        style={{ backgroundColor: color }}
      >
        {Icon && <Icon />}
        <Title depth={depth}>
          {title} <SpecialText >{specialFontText}</SpecialText>
          {badge && <Badge label={badge} />}
          <Text>{text}</Text>
          { isNew ? <NewChip label="New!" color="primary" size="small"></NewChip> : '' }
          { isUpdated ? <NewChip label="Updated!" color="primary" size="small"></NewChip> : '' }
        </Title>
      </Item>
    </>
  )
}

export default SidebarNavListItem
