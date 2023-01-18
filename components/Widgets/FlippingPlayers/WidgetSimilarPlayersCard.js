import Box from "@mui/material/Box"
import MuiButton from "@mui/material/Button"
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

const Button = styled(MuiButton)`
  white-space: nowrap;
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
  width: 120px;
  height: 150px;
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

const WidgetSimilarPlayersCard = props => 
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
        <Typography variant="p" color="textSecondary">
        {props.name ?? ""}
        </Typography>
        <Typography variant="h3" mt={1}>
          { props.playerprofileadvanced.overall_true }
        </Typography>
        <Typography sx={{ fontSize: 10 }} variant="p" color="textSecondary" >
          True Overall™
        </Typography>
        <Spacer mb={2} />
        <Button size="small" variant="contained" href={`/players/${props.card_id}` ?? ""}>
          View Card
        </Button>
      </Box>
   
    </CardContent>
  </Card>
)}

export default WidgetSimilarPlayersCard
