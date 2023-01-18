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

const Request = ({ request }) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        {request?.fields?.project_name ?? ""}
      </Typography>
      <Typography variant="overline" component="p">
        <strong>Requested On</strong>
      </Typography>
      <Typography variant="body" component="p" gutterBottom>
        {new Date(request.fields.date).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>
      <Typography variant="overline" component="p">
        <strong>Status</strong>
      </Typography>
      <Typography variant="body" component="p" gutterBottom>
        {request?.fields?.status ?? ""}
      </Typography>
    </CardContent>
  </Card>
)

export default Request
