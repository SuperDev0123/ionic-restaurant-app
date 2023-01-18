import { React, useState, useCallback, useEffect } from "react"
import { Table, TableContainer } from "@mui/material"

import PlayerComparisonTableHead from "./PlayerComparisonTableHead"
import PlayerComparisonTableBody from "./PlayerComparisonTableBody"

const PlayerComparisonTable = ({
  players = [],
  hideAddButton = false,
  updatePlayer,
  parallel,
  onAddPlayer = () => ({}),
}) => {


  const updatedPlayer = (player, $event) => {
    updatePlayer(player, $event)
  }


  return (
    <TableContainer>
      <Table>
        <PlayerComparisonTableHead
          players={players}
          hideAddButton={hideAddButton}
          onAddPlayer={onAddPlayer}
          updatePlayer={updatedPlayer}
          parallel={parallel}
        />
        <PlayerComparisonTableBody players={players}  />
      </Table>
    </TableContainer>
  )
}

export default PlayerComparisonTable
