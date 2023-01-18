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

const RunningAttributes = props => {
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
        Running Attributes
      </Typography>
      <Spacer mb={6} />
      <StatRow>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            SPD
          </Typography>
          <Typography variant="h6" component="p">
            {props.player?.speed ?? ""}
          </Typography>
          { grabImage(props.player?.speed) }
        </StatBox>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            STL
          </Typography>
          <Typography variant="h6" component="p">
            {props.player?.baserunning_ability ?? ""}
          </Typography>
          { grabImage(props.player?.baserunning_ability) }
        </StatBox>
        <StatBox className={`parallel-${props.parallel}`}>
          <Typography className="stat-title" component="p">
            BR AGG
          </Typography>
          <Typography variant="h6" component="p">
            {props.player?.baserunning_aggression ?? ""}
          </Typography>
          { grabImage(props.player?.baserunning_aggression) }
        </StatBox>
      </StatRow>
    </CardContent>
  </Card>
)}

export default RunningAttributes
