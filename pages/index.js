import { styled, spacing } from "@mui/system"
import Grid from "@mui/material/Grid"
import Head from "next/head"
import Posts from "../features/home-page/components/PostsSlider"
import AdBlock from "@components/AdBlock"
import SectionHeader from "@components/Typography/SectionHeader"
import HomepageBanner from "@components/Banners/HomepageBanner"
import ToolsResourcesButtons from "@components/Buttons/ToolsResourcesButtons"
import TrueOverallSlider from "@components/PlayerSliders/TrueOverallSlider"
import { getOGUrl } from "../features/og-image/utils"

const Spacer = styled("div")(spacing)

function HomePage() {
  return (
    <>
      <Head>
        <title>MLB The Show Tools & Resources - ShowZone</title>
        <meta
          name="description"
          content="MLB The Show player database, team builder, flipping tools, card builder, advanced data powered by AI and so much more."
        />
        <meta property="og:title" content="MLB The Show Tools & Resources - ShowZone" key="ogtitle" />
        <meta
          property="og:image"
          content={getOGUrl("default", {
            title: "Tools & Resources for MLB The Show Gamers",
            smallText: "Step Up Your Game",
          })}
          key="ogimage"
        />
      </Head>
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
          <Spacer mb={20} />
        </Grid>
      </Grid>
    </>
  )
}

export default HomePage

// export const getServerSideProps = getHomeplateProps

// export async function getStaticProps() {
//   const results = await Promise.all(
//     [
//       `https://content.showzone.io/wp-json/wp/v2/posts?per_page=6&tags=2`,
//       `https://api.showzone.io/api/player-profiles/?format=json&game=MLB The Show 22&order_by=desc%20playerprofileadvanced__overall_true`,
//     ].map(url => fetch(url))
//   )
//   const [homeplatePosts, highestRatedCards] = await Promise.all(
//     results.map(result => result.json())
//   )

//   return {
//     props: {
//       homeplatePosts,
//       highestRatedCards,
//     },
//     revalidate: 5 * 60, // Revalidate every 5 minutes
//   }
// }
