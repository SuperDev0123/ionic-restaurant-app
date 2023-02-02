import React, { useState } from "react"
import dynamic from "next/dynamic"
import { styled, spacing } from "@mui/system"
import MuiGrid from "@mui/material/Grid"
import SidebarGeneric from "@components/SidebarGeneric"
import SectionHeader from "@components/Typography/SectionHeader"
import { getOGUrl } from "../../features/og-image/utils"

const Grid = styled(MuiGrid)(spacing)

const PlayerSearch = dynamic(
  () => import("../../features/players-db/components/PlayerSearch"),
  { ssr: false }
)

const Styles = styled("div")`
  tr {
    white-space: nowrap;
  }
`

function PlayersPage() {

  return (
    <Styles>
      <SectionHeader
        shareButton
        breadcrumbsItems={[
          { name: "Homeplate", href: "/" },
          { name: "Players" },
        ]}
        smallText="MLB The Show"
        title="Player Database"
      />
      <Grid container spacing={12} justifyContent="space-between">
        <Grid sx={{ maxWidth: "100%", width: "calc(100% - 350px)" }} item xs>
          <PlayerSearch />
        </Grid>
        <SidebarGeneric/>
      </Grid>
    </Styles>
  )
}

export default PlayersPage
