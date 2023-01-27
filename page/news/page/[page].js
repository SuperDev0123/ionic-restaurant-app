import React, { useState, useCallback, useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import Grid from "@mui/material/Grid"
import ArchiveNewsGallery from "../../../features/news/components/ArchiveNewsGallery"
import LoaderBaseball from "@components/LoaderBaseball"
import SidebarGeneric from "@components/SidebarGeneric"
import SectionHeader from "@components/Typography/SectionHeader"
import { getOGUrl } from "../../../features/og-image/utils"

const REVALIDATION_MINS = 60 * 6

function NewsArchivePage({ posts, totalPages, page }) {
  const router = useRouter()
  const [sidebarHidden, setSidebarHidden] = useState(false)

  if (router.isFallback) return <LoaderBaseball />
  return (
    <>
      <Head>
        <title>MLB The Show News and Tips - ShowZone</title>
        <meta
          name="description"
          content="Get the latest MLB The Show news and tips."
        />
        <meta
          property="og:title"
          content="MLB The Show News & Tips"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Get the latest MLB The Show news and tips."
          key="ogdescription"
        />
        <meta
          property="og:image"
          content={getOGUrl("default", {
            title: "The Latest MLB The Show News & Tips",
            smallText: "MLB The Show",
          })}
          key="ogimage"
        />
      </Head>
      <SectionHeader
        breadcrumbsItems={[
          { name: "Homeplate", href: "/" },
          { name: "News & Tips" },
        ]}
        smallText="MLB The Show"
        title="News & Tips"
      />
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
