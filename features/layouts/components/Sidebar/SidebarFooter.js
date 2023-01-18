import React from "react"
import { styled } from "@mui/system"
import Badge from "@mui/material/Badge"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import TwitterIcon from "@mui/icons-material/Twitter"
import YouTubeIcon from "@mui/icons-material/YouTube"
import InstagramIcon from "@mui/icons-material/Instagram"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTiktok } from "@fortawesome/free-brands-svg-icons"

import Link from "@components/OurLink"

const Footer = styled("div")`
  background-color: ${props =>
    props.theme.sidebar.footer.background} !important;
  padding: ${props => props.theme.spacing(2.75)}
    ${props => props.theme.spacing(4)};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`

const FooterText = styled(Typography)`
  color: ${props => props.theme.sidebar.footer.color};
`

const FooterSubText = styled(Typography)`
  color: ${props => props.theme.sidebar.footer.color};
  font-size: 0.7rem;
  display: block;
  padding: 1px;
`

const FooterBadge = styled(Badge)`
  margin-right: ${props => props.theme.spacing(1)};
  span {
    background-color: ${props => props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${props => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`

const SocialIcons = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 2rem;
  a {
    color: #fff;
  }
`

const SidebarFooter = ({ ...rest }) => {
  return (
    <Footer {...rest}>
      <Grid container spacing={2}>
        <SocialIcons>
          <Link target="_blank" href="https://twitter.com/mlbtheshowzone">
            <TwitterIcon />
          </Link>
          <Link
            target="_blank"
            href="https://www.instagram.com/mlbtheshowzone/"
          >
            <InstagramIcon />
          </Link>
          <Link
            target="_blank"
            href="https://www.youtube.com/channel/UCxAGJsa3nHPsgE0i_si8ITw"
          >
            <YouTubeIcon />
          </Link>
          <Link target="_blank" href="https://www.tiktok.com/@mlbtheshowzone">
            <FontAwesomeIcon icon={faTiktok} size="lg" />
          </Link>
        </SocialIcons>
      </Grid>
    </Footer>
  )
}

export default SidebarFooter
