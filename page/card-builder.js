import React, { useState } from "react"
import Head from "next/head"
import Chip from "@mui/material/Chip"
import SectionHeader from "@components/Typography/SectionHeader"
import CardBuilder from "../features/card-builder/components/CardBuilder/CardBuilder"
import useAuth from "@useAuth"
import SidebarGeneric from "@components/SidebarGeneric"
import { Grid } from "@mui/material"

function CardBuilderPage() {
  const { currentUserIsDiamondPlus } = useAuth()

  return (
    <>
      <Head>
        <title>MLB The Show: Card Builder - ShowZone</title>
        <meta
          name="description"
          content="Build your very own MLB The Show cards! Who will you create?!"
        />
      </Head>

      <SectionHeader
        smallText="MLB The Show"
        title="Card Builder"
        breadcrumbsItems={[
          { name: "Homeplate", href: "/" },
          { name: "Card Builder" },
        ]}
      />

      <Grid container spacing={12} justifyContent="space-between">
        <Grid sx={{ maxWidth: "100%", width: "calc(100% - 350px)" }} item xs>
          <CardBuilder />
        </Grid>
        <SidebarGeneric />
      </Grid>
    </>
  )
}

export default CardBuilderPage
