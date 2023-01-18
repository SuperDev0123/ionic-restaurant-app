import { spacing, styled } from "@mui/system"

import {
  Card as MuiCard,
  CardContent,
  Typography as MuiTypography,
} from "@mui/material"

const Card = styled(MuiCard)(spacing)
const Spacer = styled("div")(spacing)
const Typography = styled(MuiTypography)(spacing)

const StatRow = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`
const StatBox = styled("div")`
  min-width: 70px;
  font-weight: bold;
  color: #fff;
  background: #444;
  text-align: center;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  position: relative;

  &.parallel-1 {
    background: #385156;
    transition: 0.5s;
  }
  &.parallel-2 {
    background: #bc6432;
    transition: 0.5s;
  }
  &.parallel-3 {
    background: #392095;
    transition: 0.5s;
  }
  &.parallel-4 {
    background: #812019;
    transition: 0.5s;
  }
  &.parallel-5 {
    background: #286790;
    transition: 0.5s;
  }
`

const HittingAttributes = props => {
  const grabImage = (value) => {
    let image = <></>
    if(props.displayShields) {
      if(value > 84) {
        image = <img src="https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbnlIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--482e97411f887bae7a54cc95dcdfe726d5512825/shield-diamond.png" style={{ maxWidth: 30, marginTop: 5 }} />
      }
      if(value > 79 && value < 85) {
        image = <img src="https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbm1IIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--df5953c715ffe28929cc11bf11b366874dbc5375/shield-gold.png" style={{ maxWidth: 30, marginTop: 5}} />
      }
      if(value > 74 && value < 80) {
        image = <img src="https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbnFIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3510745fbb510b080d2d2b8cebef1e97ffaeb2ae/shield-silver.png" style={{ maxWidth: 30, marginTop: 5 }} />
      }
      if(value > 63 && value < 75) {
        image =  <img src="https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbnVIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4784d25db477c6853340dcbad61e8f682a52f7ae/shield-bronze.png" style={{ maxWidth: 30, marginTop: 5 }} />
      }
      if(value < 64) {
        image = <img src="https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmlIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--35507e20ab49ae94353b607ed2960b6eaaf6daf7/shield-common.png" style={{ maxWidth: 30, marginTop: 5 }} />
      }
    }
    return image
  }
  
  return (
  <Card mb={6}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Hitting Attributes
      </Typography>
      <Spacer mb={6} />
      <StatRow>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            CON L
          </Typography>
          <Typography variant="h6" component="p">
            {props.player?.contact_left ?? ""}
          </Typography>
          { grabImage(props.player?.contact_left) }
        </StatBox>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            CON R
          </Typography>
          <Typography variant="h6" component="p">
            {props.player?.contact_right ?? ""}
          </Typography>
          { grabImage(props.player?.contact_right) }
        </StatBox>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            AVG CON
          </Typography>
          <Typography variant="h6" component="p">
            {(props.player?.contact_left+props.player?.contact_right)/2 ?? ""}
          </Typography>
        </StatBox>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            PWR L
          </Typography>
          <Typography variant="h6" component="p">
            {props.player?.power_left ?? ""}
          </Typography>
          { grabImage(props.player?.power_left) }
        </StatBox>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            PWR R
          </Typography>
          <Typography variant="h6" component="p">
            {props.player?.power_right ?? ""}
          </Typography>
          { grabImage(props.player?.power_right) }
        </StatBox>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            AVG PWR
          </Typography>
          <Typography variant="h6" component="p">
            {(props.player?.power_left+props.player?.power_right)/2 ?? ""}
          </Typography>
        </StatBox>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            VIS
          </Typography>
          <Typography variant="h6" component="p">
            {props.player?.plate_vision ?? ""}
          </Typography>
          { grabImage(props.player?.plate_vision) }
        </StatBox>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            DISC
          </Typography>
          <Typography variant="h6" component="p">
            {props.player?.plate_discipline ?? ""}
          </Typography>
          { grabImage(props.player?.plate_discipline) }
        </StatBox>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            CLU
          </Typography>
          <Typography variant="h6" component="p">
            {props.player?.batting_clutch ?? ""}
          </Typography>
          { grabImage(props.player?.batting_clutch) }
        </StatBox>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            BNT
          </Typography>
          <Typography variant="h6" component="p">
            {props.player?.bunting_ability ?? ""}
          </Typography>
          { grabImage(props.player?.bunting_ability) }
        </StatBox>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            DRG BNT
          </Typography>
          <Typography variant="h6" component="p">
            {props.player?.drag_bunting_ability ?? ""}
          </Typography>
          { grabImage(props.player?.drag_bunting_ability) }
        </StatBox>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            DUR
          </Typography>
          <Typography variant="h6" component="p">
            {props.player?.hitting_durability ?? ""}
          </Typography>
          { grabImage(props.player?.hitting_durability) }
        </StatBox>
      </StatRow>
    </CardContent>
  </Card>
)}

export default HittingAttributes
