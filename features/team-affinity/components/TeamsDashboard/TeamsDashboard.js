import { styled, spacing } from "@mui/system"
import MuiTypography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import MuiCardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import MuiCard from "@mui/material/Card"
import Button from "@mui/material/Button"

import Link from "@components/OurLink"

const Card = styled(MuiCard)`
  display: flex;
`

const CardMedia = styled(MuiCardMedia)`
  width: 100px;
  object-fit: contained;
`

const Typography = styled(MuiTypography)(spacing)

const TeamsDashboard = ({ teamsAffinityInfo }) => (
  <Grid container spacing={3}>
    {teamsAffinityInfo.map(({ team, players }) => (
      <Grid
        item
        xs={12}
        sm={6}
        xl={4}
        key={`team-affinity-card-${team.toLowerCase()}`}
      >
        <Paper elevation={2} className="teamAffinityCard">
          <CardContent>
            <Typography variant="h6">{team}</Typography>
          </CardContent>
          {players.map(({ season, playerName, playerImg, playerId }) => (
            <Card className="homeplateWidgetCard" key={playerId}>
              <CardMedia className="" image={playerImg} component="img" />
              <CardContent>
                <div className="cardStats">
                  <Typography variant="subtitle" color="textSecondary">
                    Season {season}
                  </Typography>
                  <Typography component="h3" variant="h4" gutterBottom>
                    {playerName}
                  </Typography>
                  <Typography
                    variant="subtitle"
                    color="textSecondary"
                  ></Typography>
                </div>
                <Link href={`/players/${playerId}`}>
                  <Button size="small" variant="contained">
                    View
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </Paper>
      </Grid>
    ))}
  </Grid>
)

export default TeamsDashboard
