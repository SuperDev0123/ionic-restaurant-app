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
import NavLink from "@components/OurNavLink"
import SingleNewsContent from "../../features/news/components/SingleNewsContent"
import LoaderBaseball from "@components/LoaderBaseball"
import SidebarGeneric from "@components/SidebarGeneric"
import { getOGUrl } from "../../features/og-image/utils"

const REVALIDATION_MINS = 6 * 60

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

function SingleNewsPage({ post, relatedPosts, slug }) {
  const router = useRouter()
  const [sidebarHidden, setSidebarHidden] = useState(false)
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

  function addNewsSchema() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://showzone.io/news/${slug}"
        },
        "headline": "${post?.title?.rendered}",
        "image": [
          "${post?.better_featured_image?.source_url}"
        ],
        "datePublished": "${post?.date}",
        "dateModified": "${post?.modified}",
        "author": {
          "@type": "Person",
          "name": "${post?._embedded?.author[0]?.name}"
        },
        "publisher": {
          "@type": "Organization",
          "name": "ShowZone",
          "logo": {
            "@type": "ImageObject",
            "url": "https://content.showzone.io/wp-content/uploads/2023/01/logo.png"
          }
        },
        "description": "${post?.excerpt?.rendered}"
    }
  `,
    }
  }

  if (router.isFallback) return <LoaderBaseball />
  return (
    <>
      <Head>
        <title> {parse(post?.title?.rendered)} - ShowZone</title>
        <meta name="description" content={post?.excerpt?.rendered} />
        <meta
          property="og:title"
          content={post?.title?.rendered}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={post?.excerpt?.rendered}
          key="ogdescription"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addNewsSchema()}
          key="news-jsonld"
        />
        <meta
          property="og:image"
          content={getOGUrl("default", {
            title: post?.title?.rendered,
            smallText: "News & Tips",
          })}
          key="ogimage"
        />
      </Head>
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
          <SingleNewsContent post={post} relatedPosts={relatedPosts} />
        </Grid>
        <SidebarGeneric />
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

  const relatedPostsRes = await fetch(
    `https://content.showzone.io/wp-json/wp/v2/posts/?exclude=${post.id}&categories=${post.categories}&_embed&per_page=6`
  )
  const relatedPosts = await relatedPostsRes.json()

  return {
    props: {
      post,
      slug,
      relatedPosts,
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
