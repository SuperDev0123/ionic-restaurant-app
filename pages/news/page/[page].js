import React, { useState, useCallback, useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { styled, spacing } from "@mui/system"
import MuiTypography from "@mui/material/Typography"
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import MuiDivider from "@mui/material/Divider"

import Grid from "@mui/material/Grid"
import NavLink from "../../../components/OurNavLink"
import ArchiveNewsGallery from "@features/news/components/ArchiveNewsGallery"
import LoaderBaseball from "@components/LoaderBaseball"
import SidebarGeneric from "@components/SidebarGeneric"
import SectionHeader from "@components/Typography/SectionHeader"
import { getOGUrl } from "@features/og-image/utils"
import { CapacitorHttp } from "@capacitor/core"
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)
const Divider = styled(MuiDivider)(spacing)
const Typography = styled(MuiTypography)(spacing)
const REVALIDATION_MINS = 60 * 6

function NewsArchivePage({ posts, totalPages, page }) {
  const router = useRouter()
  const [sidebarHidden, setSidebarHidden] = useState(false)
  const [totalPosts, setTotalposts] = useState(null)
  const [totalPage,setTotalpages]=useState(null);
  const pageNum=router.query.page;
  
  const getpages = async () => {
    let number=router.query.page;
    let options = {
      url: `https://content.showzone.io/wp-json/wp/v2/posts?page=${number}`,
    }
    const response = await CapacitorHttp.request({ ...options, method: 'GET' })
    console.log("response",response)
    setTotalposts(response.data);
    setTotalpages(response.headers["x-wp-totalpages"]);
  }
  
  useEffect(() => {
    
    getpages()
  }, [pageNum])

  if(totalPosts && totalPage){
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
              posts={totalPosts}
              totalPages={totalPage}
              page={pageNum}
            />
           </Grid>
        <SidebarGeneric sidebarHidden={sidebarHidden} />
      </Grid>
      </>
    )
  } else {
    return <LoaderBaseball />
  }
  
}

export default NewsArchivePage

// export async function getStaticProps({params: { category, page, totalPages }}) {
//   const pathsparam = [page]
//   for (let page = 0; page < totalPages; page++) {
//     pathsparam.push({ params: { page: (page + 1).toString() } })
//   }
//   const archivePostsRes = await fetch(
//     `https://content.showzone.io/wp-json/wp/v2/posts?page=${pathsparam}`)

//   const archivePosts = await archivePostsRes.json()

//   return {
//     props: {
//       posts: archivePosts,
//       page,
//       totalPages: archivePostsRes.headers.get("X-WP-TotalPages"),
//     },
//     revalidate: REVALIDATION_MINS * 60,
//   }
// }

// export async function getStaticPaths() {
  
//   // const pathsparam = []
//   // for (let page = 0; page < totalPages; page++) {
//   //   pathsparam.push({ params: { page: (page + 1).toString() } })
//   // }
//   // const archivePostsRes = await fetch(
//   //   `https://content.showzone.io/wp-json/wp/v2/posts?page=${pathsparam}`
//   // )
  
//   // const archivePosts = await archivePostsRes.json();
//   // // const totalPages = archivePostsRes.headers.get("X-WP-TotalPages");
//   // const paths= archivePosts.map((pathsparam)=>({params:{page:pathsparam}}));

//   // { params: { page: pathsparam.toString() } }
//   return {
//     paths: [{params:{page:"1"}}],
//     fallback: 'blocking',
//     // paths: [...pathsparam],
//     // paths: [{ params: { page: "1" } },{ params: { page: "2" } },{ params: { page: "3" } },{ params: { page: "4" } },{ params: { page: "5" } },{ params: { page: "6" } },{ params: { page: "7" } },{ params: { page: "8" } },{ params: { page: "9" } }],
//   }
// }
