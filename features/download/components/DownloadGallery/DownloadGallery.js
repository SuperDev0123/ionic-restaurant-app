import { styled, spacing } from "@mui/system"

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography as MuiTypography,
} from "@mui/material"
import Link from "@components/OurLink"
import useAuth from "@useAuth"
 
const Typography = styled(MuiTypography)(spacing)

const DownloadGallery = ({ dataDownloads }) => {
  const { currentUserIsGoldPlus } = useAuth()
  return (
    <>
      {!currentUserIsGoldPlus ? (
        <Typography display="block" mb={5}>
          Downloads are only available to ShowZone Pro Gold+ subscribers. To
          access the downloads, <Link href="/pro">upgrade to ShowZone Pro</Link>
          .
        </Typography>
      ) : (
        ""
      )}
      <Grid className="dataDownloads" container spacing={3}>
        {dataDownloads.map(download => (
          <Grid key={download.title?.rendered} item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {download.title?.rendered}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  gutterBottom
                >
                  {download?.acf?.description ?? ""}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Last Updated:{" "}
                  {new Date(download?.date).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) ?? ""}{" "}
                </Typography>
              </CardContent>
              <CardActions>
                {currentUserIsGoldPlus ? (
                  <Link href={download?.acf?.file} target="/blank">
                    <Button size="small" sx={{ color: "inherit" }}>
                      Download
                    </Button>
                  </Link>
                ) : (
                  <Link href="/pro" color="textSecondary">
                    <Button
                      size="small"
                      variant="text"
                      sx={{ color: "inherit" }}
                    >
                      Upgrade to Pro Gold to Download
                    </Button>
                  </Link>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default DownloadGallery
