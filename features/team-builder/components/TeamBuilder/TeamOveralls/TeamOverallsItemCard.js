import { styled } from "@mui/system"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

const StatNumber = styled(Typography)`
    font-size: 1.25rem;
`
const StatTitle = styled(Typography)`
    font-size: 1.25rem;
`
const StatWrapper = styled(CardContent)`
    text-align: center;
    padding: 1rem !important;
`

const TeamOverallsItemCard = ({ title, value }) => (
  <Grid item>
    <Card>
      <StatWrapper>
        <StatTitle component="p" variant="h6">
          {title}
        </StatTitle>
        <StatNumber component="p" variant="h2">
          {value ?? "--"}
        </StatNumber>
      </StatWrapper>
    </Card>
  </Grid>
)

export default TeamOverallsItemCard
