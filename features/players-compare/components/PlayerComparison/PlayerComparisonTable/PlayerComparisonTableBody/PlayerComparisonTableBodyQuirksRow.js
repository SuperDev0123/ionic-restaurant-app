import { styled } from "@mui/system"
import { TableRow, TableCell as MuiTableCell } from "@mui/material"

const TableCell = styled(MuiTableCell)`
  width: 210px !important;
  max-width: 210px !important;
`

const PlayerComparisonTableBodyQuirksRow = ({ players }) => (
  <TableRow
    sx={{
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    }}
  >
    <TableCell className="rowHeader" component="th" scope="row">
      Quirks
    </TableCell>
    {players.map(player => (
      <TableCell
        key={`player-table-quirks-${player.card_id}`}
        sx={{
          whiteSpace: "normal",
        }}
      >
        {player?.quirks.join(", ")}
      </TableCell>
    ))}
  </TableRow>
)

export default PlayerComparisonTableBodyQuirksRow
