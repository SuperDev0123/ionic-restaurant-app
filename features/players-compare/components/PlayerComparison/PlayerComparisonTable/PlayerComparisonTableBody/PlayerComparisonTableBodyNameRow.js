import { styled } from "@mui/system"
import { TableRow, TableCell as MuiTableCell } from "@mui/material"

import Link from "@components/OurLink"

const TableCell = styled(MuiTableCell)`
  width: 210px !important;
  max-width: 210px !important;
`

const PlayerComparisonTableBodyNameRow = ({ players }) => (
    <>
  <TableRow
    sx={{
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    }}
  >
    <TableCell className="rowHeader" component="th" scope="row">
      Name
    </TableCell>
    {players.map(player => (
      <TableCell
        key={`player-name-row-${player.card_id}`}
        sx={{
          width: "210px",
          maxWidth: "210px",
        }}
      >
        <Link href={"/players/" + player?.card_id}>{player?.name}</Link>
      </TableCell>
    ))}
  </TableRow>
  <TableRow
    sx={{
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    }}
  >
    <TableCell className="rowHeader" component="th" scope="row">
      Game
    </TableCell>
    {players.map(player => (
      <TableCell
        key={`player-name-row-${player.card_id}`}
        sx={{
          width: "210px",
          maxWidth: "210px",
        }}
      >
        {player?.game}
      </TableCell>
    ))}
  </TableRow>
  <TableRow
    sx={{
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    }}
  >
    <TableCell className="rowHeader" component="th" scope="row">
      Series
    </TableCell>
    {players.map(player => (
      <TableCell
        key={`player-name-row-${player.series}`}
        sx={{
          width: "210px",
          maxWidth: "210px",
        }}
      >
        {player?.series}
      </TableCell>
    ))}
  </TableRow>
  <TableRow
    sx={{
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    }}
  >
    <TableCell className="rowHeader" component="th" scope="row">
      Position
    </TableCell>
    {players.map(player => (
      <TableCell
        key={`player-name-row-${player.display_position}`}
        sx={{
          width: "210px",
          maxWidth: "210px",
        }}
      >
        {player?.display_position}
      </TableCell>
    ))}
  </TableRow>
  <TableRow
    sx={{
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    }}
  >
    <TableCell className="rowHeader" component="th" scope="row">
      Secondary Positions
    </TableCell>
    {players.map(player => (
      <TableCell
        key={`player-name-row-${player.display_secondary_positions}`}
        sx={{
          width: "210px",
          maxWidth: "210px",
        }}
      >
        {player?.display_secondary_positions.join(", ")}
      </TableCell>
    ))}
  </TableRow>
  </>
)

export default PlayerComparisonTableBodyNameRow
