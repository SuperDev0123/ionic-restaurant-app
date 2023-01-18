import Grid from "@mui/material/Grid"

import TableCompare from "@components/Table/TableCompare"
import useTableDefinition from "@features/tables/hooks/use-table-definition"
import PlayerSearchFilterModal from "./PlayerSearchFilterModal"
import { useState } from "react"
import useTableData from "@features/tables/hooks/use-table-data"

const InventoryPlayerSearch = (props) => {
  const [inventoryType, setInventoryType] = useState("owned");

  const TABLE_DATA_SOURCE_URI = `https://api.showzone.io/api/user-inventory/${props.id}/${inventoryType}/`

  const [openFilters, setOpenFilters] = useState(false)
  const handleFilterOpen = () => setOpenFilters(true)
  const handleFilterClose = () => setOpenFilters(false)

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

  const { columns, columnsData } = useTableDefinition("players")

  const handleInventoryTypeChange = (event) => {
    setInventoryType(event.target.value);
  };

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
            handleInventoryTypeChange={handleInventoryTypeChange}
            inventoryType={inventoryType}
            updateDataFilters={updateDataFilters}
          />
        </Grid>
      </Grid>
      <PlayerSearchFilterModal
        isOpen={openFilters}
        onClose={handleFilterClose}
        columnsData={columnsData}
        removeGameFilter
        updateDataFilters={updateDataFilters}
        dataFilters={dataFilters}
      />
    </>
  )
}

export default InventoryPlayerSearch
