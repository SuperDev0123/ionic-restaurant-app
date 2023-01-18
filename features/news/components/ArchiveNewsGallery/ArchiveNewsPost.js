import { styled, spacing } from "@mui/system"
import MuiTypography from "@mui/material/Typography"
import Button from "@components/Buttons/Button"
import MuiCard from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import MuiCardMedia from "@mui/material/CardMedia"
import Link from "@components/OurLink"
import Image from "next/image";

const Card = styled(MuiCard)(spacing)
const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`

const Typography = styled(MuiTypography)(spacing)

const TitleLink = styled(Link)`
  color: #fff;
`

const ArchiveNewsPost = ({
  image,
  title,
  description,
  slug,
  date,
  external_url,
}) => (
  <Card>
    {image ? (
      external_url ? (
        <CardMedia
          sx={{ position: "relative" }}
          target="_blank"
          component={Link}
          href={external_url}
        >
          <Image
            src={image}
            style={{objectFit: "cover"}}
            fill
            alt=""
          />
        </CardMedia>
      ) : (
        <CardMedia
          sx={{ position: "relative" }}
          target="_blank"
          component={Link}
          href={"/news/" + slug}
        >
          <Image
            src={image}
            style={{objectFit: "cover"}}
            fill
            alt=""
          />
        </CardMedia>
      )
    ) : null}
    <CardContent>
      <Typography variant="overline">{date}</Typography>
      <Typography gutterBottom variant="h5" component="h2">
        {external_url ? (
          <TitleLink target="_blank" href={external_url}>
            <span
              dangerouslySetInnerHTML={{
                __html: title ?? "",
              }}
            />
          </TitleLink>
        ) : (
          <TitleLink href={"/news/" + slug}>
            <span
              dangerouslySetInnerHTML={{
                __html: title ?? "",
              }}
            />
          </TitleLink>
        )}
      </Typography>
      <Typography mb={4} color="textSecondary" component="div">
        {description}
      </Typography>
    </CardContent>
  </Card>
)

export default ArchiveNewsPost
