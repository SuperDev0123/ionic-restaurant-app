import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import PlayerCard from "@components/PlayerCard";

const TeamBuilderGroupSaved = ({ title, players}) => {
  return (
    <>
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      <Grid container sx={{ marginBottom: "2rem" }}>
        {players.map(item => (
          <div style={{marginRight: "1rem", marginBottom: "1rem"}} key={item?.player?.name}>
            <Typography variant="caption">{item?.position}</Typography>
            <PlayerCard data={item?.player} width={168} style={{marginTop: "40px"}}/>
          </div>
        ))}
      </Grid>
    </>
  )
}

export default TeamBuilderGroupSaved
