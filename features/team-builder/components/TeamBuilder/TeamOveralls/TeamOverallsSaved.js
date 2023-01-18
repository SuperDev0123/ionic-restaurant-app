import Grid from "@mui/material/Grid"
import TeamOverallsItemCard from "./TeamOverallsItemCard"

const TeamOverallsSaved = (props) => {

  return (
    <Grid container spacing={4} mb={6}>
      <TeamOverallsItemCard
        title="Overall"
        value={props?.data?.team_overall}
      />
      <TeamOverallsItemCard
        title="True Overall"
        value={props?.data?.team_true_overall}
      />
      <TeamOverallsItemCard
        title="Power"
        value={props?.data?.team_power}
      />
      <TeamOverallsItemCard
        title="Contact"
        value={props?.data?.team_contact}
      />
      <TeamOverallsItemCard
        title="Pitching"
        value={props?.data?.team_pitching}
      />
      <TeamOverallsItemCard
        title="Speed"
        value={props?.data?.team_speed}
      />
      <TeamOverallsItemCard
        title="Defense"
        value={props?.data?.team_defense}
      />
      {/* <TeamOverallsItemCard
        title="Cost"
        value={props?.data?.team_overall}
      /> */}
    </Grid>
  )
}

export default TeamOverallsSaved
