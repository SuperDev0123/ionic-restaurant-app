import Box from "@mui/material/Box"
import MuiButton from "@mui/material/Button"
import MuiCard from "@mui/material/Card"
import MuiCardContent from "@mui/material/CardContent"
import MuiCardMedia from "@mui/material/CardMedia"
import MuiTypography from "@mui/material/Typography"
import { spacing, styled, css } from "@mui/system"
import Image from "next/image";

import Link from "@components/OurLink"

const DiamondBg = "/images/bg-rarity-diamond.jpg"

const Typography = styled(MuiTypography)(spacing)

//TODO: share this Card component among all Widget components
const Card = styled(MuiCard)`
  display: flex;
  border-radius: 0 !important;
  position: relative;
  padding: {spacing};
	${props =>
    props.illustration &&
    props.theme.palette.mode !== "dark" &&
    css`
      background: ${props => rgba(props.theme.palette.primary.main, 0.125)};
      color: ${props => props.theme.palette.primary.main};
    `}
`

const CardContent = styled(MuiCardContent)`
  position: relative;
  width: 100%;
  ${props => props.theme.breakpoints.up("md")} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  Button {
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    ${props => props.theme.breakpoints.up("md")} {
      margin-top: 0;
      margin-left: 0;
    }
  }
  a {
    text-decoration: none;
  }
`

const Button = styled(MuiButton)`
  white-space: nowrap;
`

const CardMedia = styled(MuiCardMedia)`
  width: 120px;
  height: 150px;
  background-image: ${props =>
    props.rarity === "Diamond" ? `url( ${DiamondBg} )` : "none"};
`

const Spacer = styled("div")(spacing)

const WidgetCollectionsItem = props => (
  <Card className="homeplateWidgetCard">
    <CardMedia
      className={props.rarity ?? ""}
      sx={{position: "relative"}}
    >
      <Image
        src={props.image ?? ""}
        style={{objectFit: "cover"}}
        fill
        alt=""
      />
    </CardMedia>
    <CardContent>
      <Box>
        <Typography variant="p" color="textSecondary">
          {props.name ?? ""}
        </Typography>
        <Typography variant="h3" my={0}>
          <Image
            width={20}
            height={20}
            src="https://storage.googleapis.com/showzone-cloud/assets/icons/stubs.png"
            style={{
              position: "relative",
              marginRight: "10px",
              top: "1px",
            }}
            alt="Stubs icon"
          />
          {(props.cost ?? "").toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}
        </Typography>
        <Spacer mb={2} />
        <Link href={props.collectionLink}>
          <Button size="small" variant="contained">
            View
          </Button>
        </Link>
      </Box>
      
    </CardContent>
  </Card>
)

export default WidgetCollectionsItem
