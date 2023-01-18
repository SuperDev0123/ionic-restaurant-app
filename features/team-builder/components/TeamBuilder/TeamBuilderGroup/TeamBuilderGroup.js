import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useTeamBuilderContext } from "../../../contexts/TeamBuilderContext"
import PlayerButtonAndSearch from "./PlayerButtonAndSearch"
import axios from "axios"
import recursiveSearch from "../../../utils/recursive-search"
import { newContextRoster } from "../../../utils/roster-for-builder-context"

const TeamBuilderGroup = ({ title, playerType, optimizeButton }) => {
  const { playersForRoster, setPlayersForRoster, filters, optimizeButtonActive, setOptimizeButtonActive } =
    useTeamBuilderContext()
  const players = playersForRoster[playerType]

  const optimizeLineup = () => {
    let playerIds = recursiveSearch(playersForRoster, "player")
    playerIds = playerIds.split(",")
    playerIds = playerIds.filter(Boolean)
    playerIds = playerIds.toString()
    axios({
      method: "post",
      url: "https://api.showzone.io/api/team-builder/optimize-lineup",
      data: {
        roster: playerIds,
      },
    })
      .then(function (response) {
        setPlayersForRoster(newContextRoster(response.data.Players))
      })
      .catch(function (error) {
        console.log(error)
      })
    }

  return (
    <>
      <Typography variant="h2" gutterBottom>
        {title}
        {optimizeButton ? (
          <Button
            sx={{ marginLeft: "1rem" }}
            variant="contained"
            size="small"
            onClick={optimizeLineup}
            disabled={!optimizeButtonActive}
          >
            Optimize
          </Button>
        ) : (
          ""
        )}
      </Typography>
      <Grid container sx={{ marginBottom: "2rem" }}>
        {Object.keys(players).map(item => (
          <PlayerButtonAndSearch
            key={`${playerType}-${item}`}
            player={players[item].player}
            playerImage={players[item].playerImage}
            positionLong={players[item].positionLong}
            positionShort={players[item].positionShort}
            position={players[item].position}
            overall={players[item].overall}
            setPlayersForRoster={setPlayersForRoster}
            playersForRoster={playersForRoster}
            playerType={playerType}
            filters={filters}
          />
        ))}
      </Grid>
    </>
  )
}

export default TeamBuilderGroup
