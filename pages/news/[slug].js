import React, { useState, useCallback, useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { styled, spacing } from "@mui/system"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import MuiDivider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import parse from "html-react-parser"
import NavLink from "../../components/OurNavLink"
import SingleNewsContent from "../../features/news/components/SingleNewsContent"
import LoaderBaseball from "../../components/LoaderBaseball"
import SidebarGeneric from "../../components/SidebarGeneric"

const REVALIDATION_MINS = 6 * 60

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)
const Divider = styled(MuiDivider)(spacing)

function SingleNewsPage({ post }) {
  const router = useRouter()
  const [sidebarHidden, setSidebarHidden] = useState(false)
  
  if (router.isFallback) return <LoaderBaseball />
  return (
    <>
      <Head>
        <title> {parse(post?.title?.rendered)} - ShowZone</title>
      </Head>
      <Typography variant="h1" gutterBottom display="inline">
        <span
          dangerouslySetInnerHTML={{
            __html: post?.title?.rendered ?? "",
          }}
        />
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <NavLink href="/">Homeplate</NavLink>
        <NavLink href="/news">News & Tips</NavLink>
        <Typography>
          <span
            dangerouslySetInnerHTML={{
              __html: post?.title?.rendered ?? "",
            }}
          />
        </Typography>
      </Breadcrumbs>

      <Divider my={6} />
      <Grid container spacing={12} justifyContent="space-between">
        <Grid sx={{ maxWidth: "100%", width: "calc(100% - 350px)" }} item xs>
          <SingleNewsContent post={post} />
        </Grid>
        <SidebarGeneric sidebarHidden={sidebarHidden} />
      </Grid>
    </>
  )
}

export default SingleNewsPage

export async function getStaticProps({ params: { slug } }) {
  const postsRes = await fetch(
    `https://content.showzone.io/wp-json/wp/v2/posts?_embed&slug=${slug}`
  )

  const [post] = await postsRes.json()

  return {
    props: {
      post,
      slug,
    },
    revalidate: REVALIDATION_MINS * 60,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
