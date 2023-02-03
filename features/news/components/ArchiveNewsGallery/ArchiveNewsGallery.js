import { useRouter } from "next/router"
import Grid from "@mui/material/Grid"
import Pagination from "@mui/material/Pagination"
import ArchiveNewsPost from "./ArchiveNewsPost"
import LoaderBaseball from "@components/LoaderBaseball"

const ArchiveNewsGallery = ({ posts, totalPages, page }) => {
  const router = useRouter()

  const NextRoute = (e,pagenumber ) => {
    e.preventDefault()
    if (!pagenumber){
      const number= parseInt(router.query.page);
      router.push(`/news/page/${(number+1)}`)
    }else{
      router.push(`/news/page/${(pagenumber)}`)
    }
  }
  if (router.isFallback) return <LoaderBaseball />
  return (
    <>
      <Grid container spacing={6}>
        {posts.map(
          ({ id, title, date, excerpt, better_featured_image, slug, acf }) => (
            <Grid item xs={12} sm={6} xl={4} key={id}>
              <ArchiveNewsPost
                title={title?.rendered ?? ""}
                date={
                  new String(
                    new Date(date).toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  ) ?? ""
                }
                description={
                  <div
                    dangerouslySetInnerHTML={{
                      __html: excerpt?.rendered ?? "",
                    }}
                  />
                }
                image={better_featured_image?.source_url ?? ""}
                slug={slug ?? ""}
                external_url={acf?.external_url}
              />
            </Grid>
          )
        )}
      </Grid>
      <Pagination
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
        count={parseInt(totalPages)}
        variant="outlined"
        onChange={NextRoute}
      />
    </>
  )
}

export default ArchiveNewsGallery
