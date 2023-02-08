import React, { useState, useCallback, useEffect } from "react"
import Grid from "@mui/material/Grid"
import ArchiveNewsGallery from "@features/news/components/ArchiveNewsGallery"
import LoaderBaseball from "@components/LoaderBaseball"
import SidebarGeneric from "@components/SidebarGeneric"
import SectionHeader from "@components/Typography/SectionHeader"
import Skeleton from "@mui/material/Skeleton"
import { useParams } from "react-router-dom"
import { CapacitorHttp } from "@capacitor/core"

function NewsArchiveCategoryPage({}) {
  let { category, page } = useParams()
  const [posts, setPosts] = useState("")
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [totalPages, setTotalPages] = useState(1)

  const getPosts = async () => {
    setLoadingPosts(true)
    let options = {
      url: `https://content.showzone.io/wp-json/wp/v2/posts?category_slug=${category}&page=${page}`,
    }
    const response = await CapacitorHttp.request({ ...options, method: "GET" })
    setPosts(response.data)
    console.log("***", response.data)
    setTotalPages(response.headers["x-wp-totalpages"])
    setLoadingPosts(false)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <SectionHeader
        breadcrumbsItems={[
          { name: "Homeplate", href: "/" },
          { name: "News & Tips", href: "/news" },
        ]}
        smallText="MLB The Show News & Tips"
        title={category.replace(/-/g, " ")}
      />
      <Grid container spacing={12} justifyContent="space-between">
        <Grid sx={{ maxWidth: "100%", width: "calc(100% - 350px)" }} item xs>
          {loadingPosts ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={300}
            />
          ) : (
            <ArchiveNewsGallery
              posts={posts}
              totalPages={totalPages}
              page={page}
            />
          )}
        </Grid>
        <SidebarGeneric />
      </Grid>
    </>
  )
}

export default NewsArchiveCategoryPage
