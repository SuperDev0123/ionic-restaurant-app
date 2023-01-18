import { spacing, styled } from "@mui/system"
// import NavLink from "@components/OurNavLink"

import {
  // Box,
  // Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid as MuiGrid,
  LinearProgress as MuiLinearProgress,
  // Link,
  Typography as MuiTypography,
} from "@mui/material"

// const Button = styled(MuiButton)(spacing)

const Card = styled(MuiCard)(spacing)

// const Chip = styled(MuiChip)(spacing)

// const Divider = styled(MuiDivider)(spacing)

const Grid = styled(MuiGrid)(spacing)

// const LinearProgress = styled(MuiLinearProgress)(spacing)

const Spacer = styled("div")(spacing)

const Typography = styled(MuiTypography)(spacing)

// const Centered = styled("div")`
//   text-align: center;
// `

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

const PitchAttributes = props => {
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
        Pitch Attributes
      </Typography>
      <Spacer mb={6} />
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} xl={4}>
          <Typography variant="caption" component="p" gutterBottom>
            {props.player?.pitch_1 ?? ""}
          </Typography>
          <StatRow>
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                VEL
              </Typography>
              <Typography variant="h6" component="p">
                {props.player?.pitch_1_speed ?? ""}
              </Typography>
              
            </StatBox>
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                CTRL
              </Typography>
              <Typography variant="h6" component="p">
                {props.player?.pitch_1_control ?? ""}
              </Typography>
              { grabImage(props.player?.pitch_1_control) }
            </StatBox>
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                BRK
              </Typography>
              <Typography variant="h6" component="p">
                {props.player?.pitch_1_movement ?? ""}
              </Typography>
              { grabImage(props.player?.pitch_1_movement) }
            </StatBox>
          </StatRow>
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <Typography variant="caption" component="p" gutterBottom>
            {props.player?.pitch_2 ?? ""}
          </Typography>
          <StatRow>
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                VEL
              </Typography>
              <Typography variant="h6" component="p">
                {props.player?.pitch_2_speed ?? ""}
              </Typography>
            </StatBox>
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                CTRL
              </Typography>
              <Typography variant="h6" component="p">
                {props.player?.pitch_2_control ?? ""}
              </Typography>
              { grabImage(props.player?.pitch_2_control) }
            </StatBox>
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                BRK
              </Typography>
              <Typography variant="h6" component="p">
                {props.player?.pitch_2_movement ?? ""}
              </Typography>
              { grabImage(props.player?.pitch_2_movement) }
            </StatBox>
          </StatRow>
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <Typography variant="caption" component="p" gutterBottom>
            {props.player?.pitch_3 ?? ""}
          </Typography>
          <StatRow>
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                VEL
              </Typography>
              <Typography variant="h6" component="p">
                {props.player?.pitch_3_speed ?? ""}
              </Typography>
            </StatBox>
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                CTRL
              </Typography>
              <Typography variant="h6" component="p">
                {props.player?.pitch_3_control ?? ""}
              </Typography>
              { grabImage(props.player?.pitch_3_control) }
            </StatBox>
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                BRK
              </Typography>
              <Typography variant="h6" component="p">
                {props.player?.pitch_3_movement ?? ""}
              </Typography>
              { grabImage(props.player?.pitch_3_movement) }
            </StatBox>
          </StatRow>
        </Grid>
        {props.player?.pitch_4 ? (
          <Grid item xs={12} md={6} xl={4}>
            <Typography variant="caption" component="p" gutterBottom>
              {props.player?.pitch_4 ?? ""}
            </Typography>
            <StatRow>
              <StatBox className={`parallel-${props.parallel}`}>
                <Typography className="stat-title" component="p">
                  VEL
                </Typography>
                <Typography variant="h6" component="p">
                  {props.player?.pitch_4_speed ?? ""}
                </Typography>
              </StatBox>
              <StatBox className={`parallel-${props.parallel}`}>
                <Typography className="stat-title" component="p">
                  CTRL
                </Typography>
                <Typography variant="h6" component="p">
                  {props.player?.pitch_4_control ?? ""}
                </Typography>
                { grabImage(props.player?.pitch_4_control) }
              </StatBox>
              <StatBox className={`parallel-${props.parallel}`}>
                <Typography className="stat-title" component="p">
                  BRK
                </Typography>
                <Typography variant="h6" component="p">
                  {props.player?.pitch_4_movement ?? ""}
                </Typography>
                { grabImage(props.player?.pitch_4_movement) }
              </StatBox>
            </StatRow>
          </Grid>
        ) : (
          ""
        )}
        {props.player?.pitch_5 ? (
          <Grid item xs={12} md={6} xl={4}>
            <Typography variant="caption" component="p" gutterBottom>
              {props.player?.pitch_5 ?? ""}
            </Typography>
            <StatRow>
              <StatBox className={`parallel-${props.parallel}`}>
                <Typography className="stat-title" component="p">
                  VEL
                </Typography>
                <Typography variant="h6" component="p">
                  {props.player?.pitch_5_speed ?? ""}
                </Typography>
              </StatBox>
              <StatBox className={`parallel-${props.parallel}`}>
                <Typography className="stat-title" component="p">
                  CTRL
                </Typography>
                <Typography variant="h6" component="p">
                  {props.player?.pitch_5_control ?? ""}
                </Typography>
                { grabImage(props.player?.pitch_5_control) }
              </StatBox>
              <StatBox className={`parallel-${props.parallel}`}>
                <Typography className="stat-title" component="p">
                  BRK
                </Typography>
                <Typography variant="h6" component="p">
                  {props.player?.pitch_5_movement ?? ""}
                </Typography>
                { grabImage(props.player?.pitch_5_movement) }
              </StatBox>
            </StatRow>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </CardContent>
  </Card>
)}

export default PitchAttributes
