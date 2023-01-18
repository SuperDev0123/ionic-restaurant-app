import { styled, spacing } from "@mui/system"
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia as MuiCardMedia,
  Chip,
  Link,
  Typography as MuiTypography,
} from "@mui/material"

const CardMedia = styled(MuiCardMedia)`
  width: 128px;
  height: 128px;
  object-fit: contain;
  margin: 1rem auto;
`
const Typography = styled(MuiTypography)(spacing)

const Quirk = ({ quirk }) => (
  <Card>
    <CardMedia
      className=""
      image={quirk?._embedded?.['wp:featuredmedia']['0']?.source_url ?? ""}
    />
    <CardContent>
      <Typography gutterBottom variant="h3" component="h3" >
        {quirk?.title.rendered ?? ""}
      </Typography>
      <Typography variant="overline" component="p">
        <strong>In-Game Description</strong>
      </Typography>
      <Typography variant="body" component="p" gutterBottom>
        {quirk?.acf.in_game_description ?? ""}
      </Typography>
      {quirk?.acf.additional_information ? (
        <>
            <Typography variant="overline" component="p">
                <strong>Additional Information</strong>
            </Typography>
            <Typography variant="body" component="p" gutterBottom>
                {quirk?.acf.additional_information ?? ""}
            </Typography>
        </>
      ):""}
      <Link href={"/players?format=json&order_by=desc%20playerprofileadvanced__overall_true&page=1&quirks=" + quirk?.title.rendered ?? ""}>
        <Button sx={{marginTop: "1rem"}} variant="contained">
          Find Players with this Quirk
        </Button>
      </Link>
    </CardContent>
  </Card>
)

export default Quirk
