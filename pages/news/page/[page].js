import React, { useState, useCallback, useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { styled, spacing } from "@mui/system"
import MuiTypography from "@mui/material/Typography"
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import MuiDivider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import NavLink from "../../../components/OurNavLink"
import ArchiveNewsGallery from "../../../features/news/components/ArchiveNewsGallery"
import LoaderBaseball from "../../../components/LoaderBaseball"
import SidebarGeneric from "../../../components/SidebarGeneric"


const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)
const Divider = styled(MuiDivider)(spacing)
const Typography = styled(MuiTypography)(spacing)

const REVALIDATION_MINS = 60 * 6

function NewsArchivePage({ posts, totalPages, page }) {
  const router = useRouter()
  const [sidebarHidden, setSidebarHidden] = useState(false)
  
  if (router.isFallback) return <LoaderBaseball />
  return (
    <>
      <Head>
        <title>MLB The Show News and Tips</title>
        <meta
          name="description"
          content="Get the latest MLB The Show news and tips here."
        />
      </Head>
      <Typography variant="h3" component="h1" gutterBottom display="inline">
        News & Tips
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <NavLink href="/">Homeplate</NavLink>
        <Typography>News & Tips</Typography>
      </Breadcrumbs>
      <Divider my={6} />
      <Grid container spacing={12} justifyContent="space-between">
        <Grid sx={{ maxWidth: "100%", width: "calc(100% - 350px)" }} item xs>
          
          <ArchiveNewsGallery
            posts={posts}
            totalPages={totalPages}
            page={page}
          />
        </Grid>
        <SidebarGeneric sidebarHidden={sidebarHidden} />
      </Grid>
    </>
  )
}

export default NewsArchivePage

export async function getStaticProps({ params: { page } }) {
  const archivePostsRes = await fetch(
    `https://content.showzone.io/wp-json/wp/v2/posts?page=${page}`
  )

  const archivePosts = await archivePostsRes.json()

  return {
    props: {
      posts: archivePosts,
      page,
      totalPages: archivePostsRes.headers.get("x-wp-totalpages"),
    },
    revalidate: REVALIDATION_MINS * 60,
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { page: "1" } }],
    fallback: true,
  }
}
