import { useRouter } from "next/router"
import Grid from "@mui/material/Grid"
import Pagination from "@mui/material/Pagination"
import ArchiveNewsPost from "./ArchiveNewsPost"

const ArchiveNewsGallery = ({ posts, totalPages, page }) => {
  const router = useRouter()

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
        onChange={(e, newPage) => router.push(`/news/page/${newPage}`)}
      />
    </>
  )
}

export default ArchiveNewsGallery
