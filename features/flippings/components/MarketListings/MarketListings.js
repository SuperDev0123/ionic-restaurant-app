import React, { useState } from "react"
import FlippingTable from "@components/Table/FlippingTable"
import useTableDefinition from "@features/tables/hooks/use-table-definition"
import useTableData from "@features/tables/hooks/use-table-data"
import FiltersModal, { FiltersSubsetUtil } from "@components/FiltersModal"

const TABLE_DATA_SOURCE_URI = "https://api.showzone.io/api/market-listings/"

const PlayerListings = () => {
  const [openFilters, setOpenFilters] = useState(false)
  const maxMin = [
    {
      name: "Profit Percentage Min/Max",
      min: 0,
      max: 50,
    },
    {
      name: "Profit/Minute Min/Max",
      min: 0,
      max: 1000,
    },
    {
      name: "Sales/Minute Min/Max",
      min: 0,
      max: 10,
    },
  ]
  const { filterParams, columns, columnsData } = useTableDefinition("market-listings")

  const {
    data,
    count,
    page,
    dataFilters,
    isLoading,
    updateDataFilters,
    refreshData,
  } = useTableData(TABLE_DATA_SOURCE_URI)

  const handleFilterOpen = () => setOpenFilters(true)
  const handleFilterClose = () => setOpenFilters(false)

  let graphDatasets = []

  for (const player of data) {
    graphDatasets.push({
      label: player.name,
      data: [
        {
          x: player.profit_minute,
          y: player.profit,
          r: parseInt(player.profit_percentage),
        },
      ],
    })
  }

  // const graphData = {
  //   datasets: graphDatasets,
  // }

  return (
    <>
      <FiltersModal
        subset={FiltersSubsetUtil.MARKET}
        isOpen={openFilters}
        onClose={handleFilterClose}
        columnsData={columnsData}
        filterParams={filterParams}
        updateDataFilters={updateDataFilters}
        dataFilters={dataFilters}
      />
      <FlippingTable
        refreshData={refreshData}
        data={data}
        count={count}
        loading={isLoading}
        page={page}
        maxMin={maxMin}
        columns={columns}
        updateDataFilters={updateDataFilters}
        handleFilterOpen={handleFilterOpen}
      />
    </>
  )
}

export default PlayerListings
