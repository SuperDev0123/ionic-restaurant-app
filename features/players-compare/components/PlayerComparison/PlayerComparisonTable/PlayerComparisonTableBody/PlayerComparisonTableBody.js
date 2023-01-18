import TableBody from "@mui/material/TableBody"

import PlayerComparisonTableBodyNameRow from "./PlayerComparisonTableBodyNameRow"
import PlayerComparisonTableBodyQuirksRow from "./PlayerComparisonTableBodyQuirksRow"
import PlayerComparisonTableBodyAttrRows from "./PlayerComparisonTableBodyAttrRows"

const PlayerComparisonTableBody = ({ players }) => (
  <TableBody>
    <PlayerComparisonTableBodyNameRow players={players} />
    <PlayerComparisonTableBodyAttrRows players={players} />
    <PlayerComparisonTableBodyQuirksRow players={players} />
  </TableBody>
)

export default PlayerComparisonTableBody
