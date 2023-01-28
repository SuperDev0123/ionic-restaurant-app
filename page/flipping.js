import React, { useState } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { styled } from "@mui/system"
import Grid from "@mui/material/Grid"
import SectionHeader from "@components/Typography/SectionHeader"
import SidebarGeneric from "@components/SidebarGeneric"
import MuiAccordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import NavLink from "@components/OurNavLink"
import useAuth from "@useAuth"
import Alert from "@mui/material/Alert"

const MarketListings = dynamic(
  () => import("../features/flippings/components/MarketListings"),
  { ssr: false }
)

const Accordion = styled(MuiAccordion)`
  border-top: 3px solid ${props => props.theme.palette.primary.main};
  margin-bottom: 1rem;
  padding: 0.5rem;
`

const Styles = styled("div")`
  tr {
    white-space: nowrap;
  }
`

function FlippingPage() {
  const [sidebarHidden, setSidebarHidden] = useState(false)
  const { currentUserIsGoldPlus } = useAuth()
  return (
    <Styles>
      <SectionHeader
        breadcrumbsItems={[
          { name: "Homeplate", href: "/" },
          { name: "Flipping" },
        ]}
        smallText="MLB The Show"
        title="Flipping"
      />
      <Grid container spacing={12} justifyContent="space-between">
        <Grid sx={{ maxWidth: "100%", width: "calc(100% - 350px)" }} item xs>
          {currentUserIsGoldPlus ? (
            <Alert severity="info" style={{ marginBottom: "1rem" }}>
              1-Minute Pricing Updates Enabled.
            </Alert>
          ) : (
            <Alert severity="info" style={{ marginBottom: "2rem" }}>
              Prices update every <b>5 minutes.</b> <br />
              <i>
                For 1 minute updates, an ad-free experience and many more
                features,
              </i>{" "}
              <NavLink href="/pro">
                <span style={{ color: "#FFD700" }}>
                  <b>upgrade to </b>
                  <span style={{ fontFamily: "Road Rage" }}>ShowZone Pro</span>
                  <b> Gold or higher.</b>
                </span>
              </NavLink>
            </Alert>
          )}
          <MarketListings />
        </Grid>
        <SidebarGeneric relatedPostsCategory="22" relatedPostsText="Flipping" />
      </Grid>
    </Styles>
  )
}

export default FlippingPage
