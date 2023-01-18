import { useState } from "react"
import Grid from "@mui/material/Grid"

import TableCompare from "@components/Table/TableCompare"
import useTableDefinition from "@features/tables/hooks/use-table-definition"
import PlayerSearchFilterModal from "./PlayerSearchFilterModal"
import useTableData from "@features/tables/hooks/use-table-data"

const TABLE_DATA_SOURCE_URI = "https://api.showzone.io/api/player-profiles/"

const PlayerSearch = () => {
  const [openFilters, setOpenFilters] = useState(false)
  const handleFilterOpen = () => setOpenFilters(true)
  const handleFilterClose = () => setOpenFilters(false)

  const { columns, columnsData } = useTableDefinition("players")

  const {
    data,
    count,
    page,
    dataFilters,
    isLoading,
    updateDataFilters,
  } = useTableData(TABLE_DATA_SOURCE_URI, {
    game: "MLB The Show 22",
    order_by: "desc playerprofileadvanced__overall_true",
  })
  
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={12} xl={12}>
          <TableCompare
            data={data}
            count={count}
            loading={isLoading}
            page={page}
            columns={columns}
            handleFilterOpen={handleFilterOpen}
            updateDataFilters={updateDataFilters}
          />
        </Grid>
      </Grid>
      <PlayerSearchFilterModal
        isOpen={openFilters}
        onClose={handleFilterClose}
        columnsData={columnsData}
        dataFilters={dataFilters}
        updateDataFilters={updateDataFilters}
      />
    </>
  )
}

export default PlayerSearch
