import React, { useEffect, useState } from "react"
import { styled, spacing } from "@mui/system"
import Grid from "@mui/material/Grid"
import Posts from "../features/home-page/components/PostsSlider"
import AdBlock from "@components/AdBlock"
import SectionHeader from "@components/Typography/SectionHeader"
import HomepageBanner from "@components/Banners/HomepageBanner"
import ToolsResourcesButtons from "@components/Buttons/ToolsResourcesButtons"
import TrueOverallSlider from "@components/PlayerSliders/TrueOverallSlider"
import { CapacitorHttp } from "@capacitor/core"
import Skeleton from "@mui/material/Skeleton"

const Spacer = styled("div")(spacing)

function HomePage() {
  const [homeplatePosts, setHomeplatePosts] = useState("")
  const [topPlayers, setTopPlayers] = useState("")
  const [loadingPosts, setLoadingPosts] = useState(false)
  const [loadingTopPlayers, setLoadingTopPlayers] = useState(false)

  const getHomeplatePosts = async () => {
    setLoadingPosts(true)
    let options = {
      url: "https://content.showzone.io/wp-json/wp/v2/posts?per_page=6&tags=2",
    }
    const response = await CapacitorHttp.request({ ...options, method: 'GET' })
    setHomeplatePosts(response.data)
    setLoadingPosts(false)
  }

  const getTopPlayers = async () => {
    setLoadingTopPlayers(true)
    let options = {
      url: "https://api.showzone.io/api/player-profiles/?game=MLB The Show 22&order_by=desc playerprofileadvanced__overall_true",
    }
    const response = await CapacitorHttp.request({ ...options, method: 'GET' })
    setTopPlayers(response.data.results)
    setLoadingTopPlayers(false)
  }

  useEffect(() => {
    getHomeplatePosts()
    getTopPlayers()
  }, [])

  return (
    <>
      <HomepageBanner />
      <Grid container spacing={12} justifyContent="space-between">
        <Grid item xs justify="space-between">
          <Grid container spacing={12} justifyContent="space-between">
            <Grid item xs={12}>
              <SectionHeader
                smallText="Featured MLB The Show"
                title="News & Tips"
                h2
              />
            </Grid>
          </Grid>
          {loadingPosts ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={300}
            />
          ) : (
            <Posts posts={homeplatePosts} />
          )}

          <Spacer mb={20} />

          <AdBlock id="pw-homepage-leaderboard" type="margin-top leaderboard" />

          <Grid container spacing={0}>
            <Grid item xs={12}>
              <SectionHeader
                smallText="Tools & Resources to"
                title="Step Up Your Game"
                h2
              />
            </Grid>
          </Grid>
          <ToolsResourcesButtons />

          <Spacer mb={20} />

          <Grid container spacing={0}>
            <Grid item xs={12}>
              <SectionHeader
                smallText="MLB The Show 22"
                title="Highest Rated Cards"
                h2
              />
            </Grid>
          </Grid>
          {loadingTopPlayers ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={300}
            />
          ) : (
            <TrueOverallSlider players={topPlayers} />
          )}
          <Spacer mb={20} />
        </Grid>
      </Grid>
    </>
  )
}

export default HomePage

export const getServerSideProps = getHomeplateProps

export async function getStaticProps() {
  const results = await Promise.all(
    [
      `https://content.showzone.io/wp-json/wp/v2/posts?per_page=6&tags=2`,
      `https://api.showzone.io/api/player-profiles/?format=json&game=MLB The Show 22&order_by=desc%20playerprofileadvanced__overall_true`,
    ].map(url => fetch(url))
  )
  const [homeplatePosts, highestRatedCards] = await Promise.all(
    results.map(result => result.json())
  )

  return {
    props: {
      homeplatePosts,
      highestRatedCards,
    },
    revalidate: 5 * 60, // Revalidate every 5 minutes
  }
}
