import { styled } from "@mui/system"
import { TableRow, TableCell as MuiTableCell } from "@mui/material"

import CellHighlightHighValue from "./CellHighlightHighValue"
import rowsDefinition from "./rows-definition"

const TableCell = styled(MuiTableCell)`
  width: 210px !important;
  max-width: 210px !important;
`

const PlayerComparisonTableBodyAttrRows = ({ players }) =>
  rowsDefinition.map(({ attr, title }) => (
    <TableRow
      key={`player-row-${attr}`}
      sx={{
        "&:last-child td, &:last-child th": {
          border: 0,
        },
      }}
    >
      <TableCell className="rowHeader" component="th" scope="row">
        {title}
      </TableCell>
      {players.map(player => (
        <CellHighlightHighValue
          key={`player-${player.card_id}-attr-${attr}`}
          players={players}
          player={player}
          attribute_name={attr}
        />
      ))}
    </TableRow>
  ))

export default PlayerComparisonTableBodyAttrRows
