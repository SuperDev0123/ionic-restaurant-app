import React, { useState } from "react"
import Head from "next/head"
import { styled } from "@mui/system"
import TrueOverallPageContent from "../../features/true-overall/TrueOverallPageContent"
import SidebarGeneric from "@components/SidebarGeneric"
import { Grid } from "@mui/material"
import { Typography } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import SectionHeader from "@components/Typography/SectionHeader"

const Styles = styled("div")``

const TrueOverallCalculator = ({}) => {
  const [sidebarHidden, setSidebarHidden] = useState(false)

  return (
    <Styles>
      <Head>
        <title>MLB The Show: True Overall™ Calculator - ShowZone</title>
        <meta
          name="description"
          content="Find out the True Overall™ of any combination of stats!"
        />
      </Head>
      <SectionHeader
        smallText="MLB The Show"
        title="True Overall Calculator"
        breadcrumbsItems={[
          { name: "Homeplate", href: "/" },
          { name: "True Overall™ Calculator" },
        ]}
      />

      <Grid container spacing={12} justifyContent="space-between">
        <Grid sx={{ maxWidth: "100%", width: "calc(100% - 350px)" }} item xs>
          <Card>
            <CardContent>
              <Typography variant="h2" gutterBottom color="text.secondary">
                How To Use the True Overall™ Calculator
              </Typography>
              <Typography paragraph>
                True Overall™ is a deep neural network model created by
                ShowZone. Since it is created via a neural network, extremely
                unique scenarios with attributes that would typically not be
                seen in-game may generate odd or non-standard results.
              </Typography>
              <Typography paragraph>
                In addition, if you are formulating the True Overall of a CAP
                hitter, it is recommended to place zeros for the pitching
                attributes instead of the default 30 base attributes (the neural
                network model will start to rate you like a 2-way player
                otherwise).
              </Typography>
            </CardContent>
          </Card>
          <TrueOverallPageContent />
        </Grid>
        <SidebarGeneric sidebarHidden={sidebarHidden} />
      </Grid>
    </Styles>
  )
}

export default TrueOverallCalculator
