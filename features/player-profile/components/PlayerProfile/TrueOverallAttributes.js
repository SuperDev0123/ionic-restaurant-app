import { spacing, styled } from "@mui/system"

import {
  Card as MuiCard,
  CardContent,
  Typography as MuiTypography,
} from "@mui/material"
import MuiGrid from "@mui/material/Grid"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import { Select, MenuItem } from "@mui/material"

const Card = styled(MuiCard)(spacing)
const Spacer = styled("div")(spacing)
const Typography = styled(MuiTypography)(spacing)
const Grid = styled(MuiGrid)(spacing)
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

const TrueOverallAttributes = props => {
  let isPitcher = false
  
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
          Overalls
        </Typography>    
        <Spacer mb={6} />
        <StatRow>
          <StatBox className={`parallel-${props.parallel}`}>
            <Typography className="stat-title" component="p">
              OVR
            </Typography>
            <Typography variant="h6" component="p">
              {props.player?.overall ?? ""}
            </Typography>
            { grabImage(props.player?.overall) }
          </StatBox>
          {parseInt(props.player?.playerprofileadvanced?.overall_sp) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                TRUE OVR SP
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_sp ?? "" : props.player?.playerprofileadvanced[`overall_sp_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_rp) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                TRUE OVR RP
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_rp ?? "" : props.player?.playerprofileadvanced[`overall_rp_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_cp) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                TRUE OVR CP
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_cp ?? "" : props.player?.playerprofileadvanced[`overall_cp_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_c) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                TRUE OVR C
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_c ?? "" : props.player?.playerprofileadvanced[`overall_c_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_1b) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                TRUE OVR 1B
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_1b ?? "" : props.player?.playerprofileadvanced[`overall_1b_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_2b) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                TRUE OVR 2B
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_2b ?? "" : props.player?.playerprofileadvanced[`overall_2b_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_ss) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                TRUE OVR SS
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_ss ?? "" : props.player?.playerprofileadvanced[`overall_ss_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_3b) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                TRUE OVR 3B
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_3b ?? "" : props.player?.playerprofileadvanced[`overall_3b_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_lf) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                TRUE OVR LF
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_lf ?? "" : props.player?.playerprofileadvanced[`overall_lf_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_cf) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                TRUE OVR CF
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_cf ?? "" : props.player?.playerprofileadvanced[`overall_cf_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_rf) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                TRUE OVR RF
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_rf ?? "" : props.player?.playerprofileadvanced[`overall_rf_${props.parallel}`] ?? "" }
                
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {/* <StatBox>
            <Typography className="stat-title" component="p">
              META OVR
            </Typography>
            <Typography variant="h6" component="p">
              {props.player?.playerprofileadvanced?.overall_meta ?? ""}
            </Typography>
          </StatBox> */}
          {parseInt(props.player?.playerprofileadvanced?.overall_meta_sp) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                META OVR SP
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_meta_sp ?? "" : props.player?.playerprofileadvanced[`overall_meta_sp_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_meta_rp) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                META OVR RP
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_meta_rp ?? "" : props.player?.playerprofileadvanced[`overall_meta_rp_${props.parallel}`] ?? "" }
                  
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_meta_cp) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                META OVR CP
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_meta_cp ?? "" : props.player?.playerprofileadvanced[`overall_meta_cp_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_meta_c) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                META OVR C
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_meta_c ?? "" : props.player?.playerprofileadvanced[`overall_meta_c_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_meta_1b) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                META OVR 1B
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_meta_1b ?? "" : props.player?.playerprofileadvanced[`overall_meta_1b_${props.parallel}`] ?? "" }
                
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_meta_2b) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                META OVR 2B
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_meta_2b ?? "" : props.player?.playerprofileadvanced[`overall_meta_2b_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_meta_ss) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                META OVR SS
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_meta_ss ?? "" : props.player?.playerprofileadvanced[`overall_meta_ss_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_meta_3b) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                META OVR 3B
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_meta_3b ?? "" : props.player?.playerprofileadvanced[`overall_meta_3b_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_meta_lf) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                META OVR LF
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_meta_lf ?? "" : props.player?.playerprofileadvanced[`overall_meta_lf_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_meta_cf) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                META OVR CF
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_meta_cf ?? "" : props.player?.playerprofileadvanced[`overall_meta_cf_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
          {parseInt(props.player?.playerprofileadvanced?.overall_meta_rf) ? (
            <StatBox className={`parallel-${props.parallel}`}>
              <Typography className="stat-title" component="p">
                META OVR RF
              </Typography>
              <Typography variant="h6" component="p">
                { props.parallel == 0 ? props.player?.playerprofileadvanced?.overall_meta_rf ?? "" : props.player?.playerprofileadvanced[`overall_meta_rf_${props.parallel}`] ?? "" }
              </Typography>
            </StatBox>
          ) : (
            ""
          )}
        </StatRow>
      </CardContent>
    </Card>
  )
}

export default TrueOverallAttributes
