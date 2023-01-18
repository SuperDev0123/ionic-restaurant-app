import React, { useEffect, useState, useCallback } from "react"
import { Grid as MuiGrid } from "@mui/material"
import { useRouter } from "next/router"
import AdBlock from "@components/AdBlock"
import RevueSignUp from "@components/Widgets/NewsletterSignUp"
import { styled } from "@mui/system"
import FlippingPlayers from "../Widgets/FlippingPlayers"
import Posts from "@features/home-page/components/PostsSlider/Posts"
import CardTop from "@components/Typography/CardTop"
import RelatedContent from "@components/Widgets/RelatedContent"
import axios from "axios"

const Grid = styled(MuiGrid)`
  ${props => props.theme.breakpoints.up("lg")} {
    max-width: 350px;
    min-width: 350px;
    width: 350px;
  }
`

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

function GenericSidebar(props) {
  const router = useRouter()

  return (
    <>
      <Grid item xs={12}>
        <AdBlock
          id="pw-sidebar-top"
          type="margin-bottom margin-top medium-rec"
        />

        {props.relatedPostsCategory ? (
          <>
            <CardTop
              smallText="Content Related to"
              text={props.relatedPostsText}
            />
            <RelatedContent
              relatedPostsCategory={props.relatedPostsCategory}
              relatedPostsText={props.relatedPostsText}
            />
          </>
        ) : (
          ""
        )}
        <CardTop text="Newsletter" smallText="ShowZone" />
        <RevueSignUp />

        <AdBlock
          id="pw-sidebar-bottom"
          type="margin-top margin-bottom medium-rec"
        />

        <CardTop smallText="Best Cards to" text="Flip Right Now" />
        <FlippingPlayers />
      </Grid>
    </>
  )
}

export default GenericSidebar
