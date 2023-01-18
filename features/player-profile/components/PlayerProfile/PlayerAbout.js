import { spacing, styled } from "@mui/system"

import {
  Card as MuiCard,
  CardContent,
  Grid as MuiGrid,
  Typography as MuiTypography,
} from "@mui/material"

const Card = styled(MuiCard)(spacing)

const Grid = styled(MuiGrid)(spacing)

const Spacer = styled("div")(spacing)

const Typography = styled(MuiTypography)(spacing)

const PlayerAbout = props => (
  <Card mb={6}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        About
      </Typography>

      <Spacer mb={4} />
      {props.player.display_secondary_positions != "" ? (
        <Grid container direction="row" alignItems="center" mb={2}>
          <Grid item>
            <strong>Secondary Positions:</strong>{" "}
            {props.player?.display_secondary_positions?.join(", ") ?? ""}
          </Grid>
        </Grid>
      ) : (
        ""
      )}
      <Grid container direction="row" alignItems="center" mb={2}>
        <Grid item>
          <strong>Bats/Throws:</strong> {props.player?.bat_hand ?? ""} /{" "}
          {props.player?.throw_hand ?? ""}
        </Grid>
      </Grid>
      {props?.player?.weight ? (
        <Grid container direction="row" alignItems="center" mb={2}>
          <Grid item>
            <strong>Height/Weight: </strong> {props.player?.height ?? ""}/
            {props.player?.weight ?? ""}
          </Grid>
        </Grid>
      ) : (
        ""
      )}
      {props.player.born ? (
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <strong>Born: </strong> {props.player?.born ?? ""}
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </CardContent>
  </Card>
)

export default PlayerAbout
