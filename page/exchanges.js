import React, { useState } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { styled } from "@mui/system"
import SidebarGeneric from "@components/SidebarGeneric"
import SectionHeader from "@components/Typography/SectionHeader"
import { Grid } from "@mui/material"
import NavLink from "@components/OurNavLink"
import useAuth from "@useAuth"
import Alert from "@mui/material/Alert"

const PlayerExchanges = dynamic(
  () => import("../features/exchanges/components/PlayerExchanges"),
  { ssr: false }
)

const Styles = styled("div")`
  tr {
    white-space: nowrap;
  }
`

function ExchangesPlayersPage() {
  const [sidebarHidden, setSidebarHidden] = useState(false)
  const { currentUserIsGoldPlus } = useAuth()
  return (
    <Styles>
      <Head>
        <title>MLB The Show: Player Exchanges - ShowZone</title>
        <meta
          name="description"
          content="Find the fastest, cheapest or most effecient cards to exchange."
        />
      </Head>
      <SectionHeader
        shareButton
        breadcrumbsItems={[
          { name: "Homeplate", href: "/" },
          { name: "Exchanges" },
        ]}
        smallText="MLB The Show"
        title="Exchanges"
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
          <PlayerExchanges />
        </Grid>
        <SidebarGeneric sidebarHidden={sidebarHidden} />
      </Grid>
    </Styles>
  )
}

export default ExchangesPlayersPage
