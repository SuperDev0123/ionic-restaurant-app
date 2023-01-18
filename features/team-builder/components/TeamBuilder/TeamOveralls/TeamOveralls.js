import Grid from "@mui/material/Grid"
import TeamOverallsItemCard from "./TeamOverallsItemCard"
import { useTeamBuilderContext } from "../../../contexts/TeamBuilderContext"
import formatCost from "./utils/format-cost"

const TeamOveralls = () => {
  const { teamOveralls } = useTeamBuilderContext()

  return (
    <Grid container spacing={4} mb={6}>
      <TeamOverallsItemCard
        title="Overall"
        value={teamOveralls["Team Overall Rating"]}
      />
      <TeamOverallsItemCard
        title="True Overall"
        value={teamOveralls["Team True Overall Rating"]}
      />
      <TeamOverallsItemCard
        title="Power"
        value={teamOveralls["Team Power Rating"]}
      />
      <TeamOverallsItemCard
        title="Contact"
        value={teamOveralls["Team Contact Rating"]}
      />
      <TeamOverallsItemCard
        title="Pitching"
        value={teamOveralls["Team Pitching Rating"]}
      />
      <TeamOverallsItemCard
        title="Speed"
        value={teamOveralls["Team Speed Rating"]}
      />
      <TeamOverallsItemCard
        title="Defense"
        value={teamOveralls["Team Defense Rating"]}
      />
      <TeamOverallsItemCard
        title="Cost"
        value={formatCost(teamOveralls["Team Costs"])}
      />
    </Grid>
  )
}

export default TeamOveralls
