import Button from "@mui/material/Button"
import MuiCard from "@mui/material/Card"
import MuiCardMedia from "@mui/material/CardMedia"
import MuiCardContent from "@mui/material/CardContent"
import MuiTypography from "@mui/material/Typography"
// import Box from "@mui/material/Box"
import { spacing, styled } from "@mui/system"
import OurLink from "@components/OurLink"
import Image from "next/image"

const Card = styled(MuiCard)`
  position: relative;
  border-radius: 0px;
  &:after {
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.9) 100%
  );
  }
  
`
const CardContent = styled(MuiCardContent)`
  position: absolute;
  bottom: 0;
  z-index: 9;
  padding-top: 7rem;
`
const CardMedia = styled(MuiCardMedia)`
  height: 300px;
`
const Link = styled(OurLink)`
  color: #fff;
`

// TODO: replace NavLink with an actual NavLink
const NavLink = styled(OurLink)`
  color: #fff;
`
const Typography = styled(MuiTypography)(spacing)

const Post = ({ image, title, description, date, slug, external_url }) => {
  return (
    <Card>
      {image ? (
        <CardMedia
          sx={{ position: "relative" }}
          target="_blank"
          component={Link}
          href={external_url ? external_url : "/news/" + slug}
        >
          <Image src={image} style={{ objectFit: "cover" }} fill alt="" />
        </CardMedia>
      ) : null}
      <CardContent>
        <Typography
          gutterBottom
          variant="h3"
          component="h2"
          sx={{ lineHeight: "1.25" }}
        >
          {external_url ? (
            <Link target="_blank" href={external_url}>
              {title}
            </Link>
          ) : (
            <Link href={"/news/" + slug}>{title}</Link>
          )}
        </Typography>
        <Typography color="textSecondary" component="div">
          {description}
        </Typography>
        <Typography variant="overline">{date}</Typography>
      </CardContent>
    </Card>
  )
}

export default Post
