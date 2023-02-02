import React, { useState } from "react"
import dynamic from "next/dynamic"
import { styled } from "@mui/system"
import Grid from "@mui/material/Grid"
import SidebarGeneric from "@components/SidebarGeneric"
import SectionHeader from "@components/Typography/SectionHeader"

const PlayerComparison = dynamic(
  () => import("../../features/players-compare/components/PlayerComparison"),
  { ssr: false }
)

const Styles = styled("div")`
  tr {
    white-space: nowrap;
  }
  th {
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
  }
  td {
    font-size: 16px;
    text-align: center;
  }
  .rowHeader {
    background: ${props => props.theme.palette.background.paper};
  }
  .highlightCell {
    background: rgba(236, 32, 36, 0.25);
    font-weight: bold;
  }
`

function PlayersComparePage() {

  return (
    <>
      <SectionHeader
        breadcrumbsItems={[
          { name: "Homeplate", href: "/" },
          { name: "Players", href: "/players" },
          { name: "Compare Players" },
        ]}
        shareButton
        smallText="MLB The Show"
        title="Compare Players"
      />
      <Grid container spacing={12} justifyContent="space-between">
        <Grid sx={{ maxWidth: "100%", width: "calc(100% - 350px)" }} item xs>
          <Styles>
            <PlayerComparison />
          </Styles>
        </Grid>
        <SidebarGeneric />
      </Grid>
    </>
  )
}

export default PlayersComparePage
