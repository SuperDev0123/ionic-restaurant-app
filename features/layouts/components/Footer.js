import * as React from "react"
import { useRouter } from "next/router"
import { styled } from "@mui/system"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import List from "@mui/material/List"
import Hidden from "@mui/material/Hidden"
import MuiListItemText from "@mui/material/ListItemText"
import MuiListItemButton from "@mui/material/ListItemButton"
// import ListItem from "@mui/material/ListItem"
import TwitterIcon from "@mui/icons-material/Twitter"
import YouTubeIcon from "@mui/icons-material/YouTube"
import InstagramIcon from "@mui/icons-material/Instagram"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTiktok, faDiscord } from "@fortawesome/free-brands-svg-icons"
import Typography from "@mui/material/Typography"
import Image from "next/image"
// import Link from "@components/OurLink"
import NavLink from "@components/OurNavLink"
import AdBlock from "@components/AdBlock"

const Wrapper = styled("div")`
  padding: 6rem 3rem;
  background: ${props => props.theme.footer.background};
  position: relative;
  margin-top: 2rem;
  border-width: 5px;
  border-style: solid;
  border-image: linear-gradient(to right, #161616 0%, #ed2024 50%, #161616 100%)
    100% 0 0 0;
  img {
    max-width: 100%;
  }
`

const FooterLink = styled(Link)`
  display: block;
  color: #fff;
  margin-top: 0.5rem;
`

const SocialIcons = styled("div")`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  align-items: center;
  a {
    color: #fff;
    margin-right: 1rem;
    &:hover {
      color: ${props => props.theme.palette.primary.main};
    }
  }
`

function Footer() {
  // const router = useRouter()

  return (
    <>
      <AdBlock id="pw-footer-leaderboard" type="leaderboard" />{" "}
      <Wrapper>
        <Grid container spacing={20}>
          <Grid item xs={12} md={3}>
            <Image
              src="/images/logo.svg"
              width={350}
              height={40}
              alt="ShowZone logo"
              style={{ marginBottom: ".5rem" }}
            />
            <SocialIcons>
              <FooterLink style={{ marginTop: "1px" }}>
                <FontAwesomeIcon icon={faDiscord} size="md" />
              </FooterLink>
              <FooterLink href="https://twitter.com/mlbtheshowzone">
                <TwitterIcon />
              </FooterLink>
              <FooterLink href="https://www.instagram.com/mlbtheshowzone/">
                <InstagramIcon />
              </FooterLink>
              <FooterLink href="https://www.youtube.com/channel/UCxAGJsa3nHPsgE0i_si8ITw">
                <YouTubeIcon />
              </FooterLink>
              <FooterLink href="https://www.tiktok.com/@mlbtheshowzone" style={{ marginTop: "-3px" }}>
                <FontAwesomeIcon icon={faTiktok} size="md" />
              </FooterLink>
            </SocialIcons>

            <Typography variant="subtitle1" gutterBottom>
              ShowZone is not affiliated with Sony San Diego Studios or Major
              League Baseball.
            </Typography>
            <Typography variant="subtitle1">
              ShowZone LLC ©{new Date().getFullYear()}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h3" style={{ textTransform: "uppercase" }}>
              TOP CONTENT
            </Typography>
            <FooterLink href="/">What are the best Kontrol Freeks for MLB The Show?</FooterLink>
            <FooterLink href="/">What are the best Kontrol Freeks for MLB The Show?</FooterLink>
            <FooterLink href="/">What are the best Kontrol Freeks for MLB The Show?</FooterLink>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h3" style={{ textTransform: "uppercase" }}>
              Quick Links
            </Typography>
            <FooterLink href="/">Contact</FooterLink>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h3" style={{ textTransform: "uppercase" }}>
              Site Information
            </Typography>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/app">Mobile App</FooterLink>
            <FooterLink href="/advertising">Advertising & Partnerships</FooterLink>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  )
}

export default Footer
