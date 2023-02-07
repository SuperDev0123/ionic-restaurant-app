import React, { useState, useCallback, useEffect } from "react"
import { styled, spacing } from "@mui/system"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import MuiDivider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import parse from "html-react-parser"
import NavLink from "@components/OurNavLink"
import SingleNewsContent from "../../features/news/components/SingleNewsContent"
import LoaderBaseball from "@components/LoaderBaseball"
import SidebarGeneric from "@components/SidebarGeneric"
import { useParams } from "react-router-dom"
import { Skeleton } from "@mui/material"
import { CapacitorHttp } from "@capacitor/core"

const Breadcrumbs = styled(MuiBreadcrumbs)`
  margin-bottom: 0.25rem;
  li,
  p,
  a {
    font-size: 12px;
    line-height: 1;
  }
`
const Divider = styled(MuiDivider)(spacing)

function SingleNewsPage({}) {
  let { slug } = useParams()
  const [post, setPost] = useState("")
  const [loadingPost, setLoadingPost] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState("")
  const [loadingRelatedPosts, setLoadingRelatedPosts] = useState(true)

  const getPost = async () => {
    setLoadingPost(true)
    let options = {
      url: `https://content.showzone.io/wp-json/wp/v2/posts?_embed&slug=${slug}`,
    }
    const response = await CapacitorHttp.request({ ...options, method: "GET" })
    setPost(response.data[0])
    setLoadingPost(false)
  }

  const getRelatedPosts = async () => {
    setLoadingRelatedPosts(true)
    let options = {
      url: `https://content.showzone.io/wp-json/wp/v2/posts/?exclude=${post.id}&categories=${post.categories}&_embed&per_page=6`,
    }
    const response = await CapacitorHttp.request({ ...options, method: "GET" })
    setRelatedPosts(response.data)
    setLoadingRelatedPosts(false)
  }

  useEffect(() => {
    getPost()
  }, [])

  useEffect(() => {
    if (post) {
      getRelatedPosts()
    }
  }, [post])

  const BlogHero = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 300px;
    width: 100%;
    padding: 2rem;
    background-size: cover;
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0.9) 100%
      ),
      url(${post?.better_featured_image?.source_url ?? ""});
    ${props => props.theme.breakpoints.up("md")} {
      height: 550px;
      padding: 3rem 30rem 3rem 3rem;
    }
    h1 {
      text-transform: uppercase;
      font-size: 2rem;
      line-height: 1.1;
      margin-bottom: 0.5rem;
      ${props => props.theme.breakpoints.up("md")} {
        font-size: 4rem;
      }
    }
  `

  let breadcrumbsItems = [
    { name: "Homeplate", href: "/" },
    { name: "News", href: "/news" },
    { name: post?.title?.rendered },
  ]

  return (
    <>
      <BlogHero>
        <Breadcrumbs aria-label="Breadcrumb" mt={2}>
          {breadcrumbsItems.map(({ name, href }) =>
            href !== undefined ? (
              <NavLink key={`breadcrumbs-${name}`} href={href}>
                {name}
              </NavLink>
            ) : (
              <Typography key={`breadcrumbs-${name}`}>{name}</Typography>
            )
          )}
        </Breadcrumbs>
        <Typography variant="h1">{post?.title?.rendered ?? ""}</Typography>
        <Typography style={{ textTransform: "uppercase" }}>
          {new Date(post?.date).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) ?? ""}{" "}
          by {post?._embedded?.author[0]?.name ?? "ShowZone"}
        </Typography>
      </BlogHero>
      <Divider my={6} />
      <Grid container spacing={12} justifyContent="space-between">
        <Grid sx={{ maxWidth: "100%", width: "calc(100% - 350px)" }} item xs>
          {loadingPost ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={300}
            />
          ) : (
            <SingleNewsContent post={post} relatedPosts={relatedPosts} />
          )}
        </Grid>
        <SidebarGeneric />
      </Grid>
    </>
  )
}

export default SingleNewsPage
