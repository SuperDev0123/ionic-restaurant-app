import Box from "@mui/material/Box"
import Button from "@components/Buttons/Button"
import MuiCard from "@mui/material/Card"

import MuiCardContent from "@mui/material/CardContent"
import MuiCardMedia from "@mui/material/CardMedia"
import MuiTypography from "@mui/material/Typography"
import { spacing, styled, css } from "@mui/system"
import Image from "next/image";

const DiamondBg = "/images/bg-rarity-diamond.jpg"
const GoldBg = "/images/bg-rarity-gold.jpg"
const SilverBg = "/images/bg-rarity-silver.jpg"
const BronzeBg = "/images/bg-rarity-bronze.jpg"
const CommonBg = "/images/bg-rarity-common.jpg"

const Typography = styled(MuiTypography)(spacing)
const Spacer = styled("div")(spacing)

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
  Button,
  a {
    text-decoration: none;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    ${props => props.theme.breakpoints.up("md")} {
      margin-top: 0;
      margin-left: 0;
    }
  }
`

const CardMedia = styled(MuiCardMedia)`
  width: 250px;
  height: 225px;
  &.Common {
    background-image: url( ${CommonBg} );
  }
  &.Bronze {
    background-image: url( ${BronzeBg} );
  }
  &.Silver {
    background-image: url( ${SilverBg} );
  }
  &.Gold{
    background-image: url( ${GoldBg} );
  }
  &.Diamond {
    background-image: url( ${DiamondBg} );
  } 
`

const WidgetFlippingPlayerItem = props => 
 {
  return (
  <Card className="homeplateWidgetCard">
    <CardMedia
      className={props.rarity + " " + props.item_type}
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
      <Box >
        <Typography variant="h5" component="p" color="textSecondary">
        {props.name ?? ""}
        </Typography>
        <Typography variant="h2" component="p" my={0}>
          <Image
            className="stubs"
            width={20}
            height={20}
            src="https://storage.googleapis.com/showzone-cloud/assets/icons/stubs.png"
            alt="Stubs icon"
          />
          {(props.profitPerMinute ?? "").toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}

        </Typography>
        <Typography variant="p" color="textSecondary">
          Profit Per Minute
        </Typography>
        <Spacer mb={2} />
        { props.item_type === 'Player' ? <Button size="xs" variant="filled" href={`/players/${props.card_id}` ?? ""}>
          View Card
        </Button> : <Button target="_blank" size="xs" variant="filled" href={`${props.tsnLink}` ?? ""}>
          View Card
        </Button> }
      </Box>
   
    </CardContent>
  </Card>
)}

export default WidgetFlippingPlayerItem
