import { styled, spacing } from "@mui/system"
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia as MuiCardMedia,
  Chip as MuiChip,
  Link,
  Typography as MuiTypography,
} from "@mui/material"

const Chip = styled(MuiChip)`
  position: absolute;
  top: 5px;
  left: 5px;
`

const CardMedia = styled(MuiCardMedia)`
  height: 150px;
`
const Typography = styled(MuiTypography)(spacing)

const ConquestMap = ({ conquestMap }) => (
  <Card>
    <CardActionArea
      href={conquestMap?.better_featured_image?.source_url ?? ""}
      target="/blank"
    >
      {conquestMap?.acf.expired ? <Chip label="Expired" /> : ""}
      <CardMedia
        className=""
        image={conquestMap?.better_featured_image?.source_url ?? ""}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        <span
          dangerouslySetInnerHTML={{
            __html: conquestMap?.title?.rendered ?? "",
          }}
        />
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {conquestMap?.acf?.rewards ?? ""}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Link href={conquestMap?.acf?.provided_by?.url ?? ""} target="_blank">
        <Button size="small">
          Provided by {conquestMap?.acf?.provided_by?.title ?? ""}
        </Button>
      </Link>
    </CardActions>
  </Card>
)

export default ConquestMap
