import React, { useState } from "react"
import ExchangeTable from "@components/Table/ExchangeTable"
import useTableDefinition from "@features/tables/hooks/use-table-definition"
import useTableData from "@features/tables/hooks/use-table-data"
import FiltersModal, { FiltersSubsetUtil } from "@components/FiltersModal"

const TABLE_DATA_SOURCE_URI = "https://api.showzone.io/api/market-listings/?item_type=Player"

const PlayerExchanges = () => {
  const [openFilters, setOpenFilters] = useState(false)

  const { filterParams, columns, columnsData } = useTableDefinition("exchange-players")

  const {
    data,
    count,
    page,
    isLoading,
    dataFilters,
    updateDataFilters,
    refreshData,
  } = useTableData(TABLE_DATA_SOURCE_URI, { order_by: "asc cost_per_exchange_point" })

  const handleFilterOpen = () => setOpenFilters(true)
  const handleFilterClose = () => setOpenFilters(false)

  return (
    <>
      <FiltersModal
        subset={FiltersSubsetUtil.EXCHANGE}
        isOpen={openFilters}
        onClose={handleFilterClose}
        columnsData={columnsData}
        filterParams={filterParams}
        dataFilters={dataFilters}
        updateDataFilters={updateDataFilters}
      />
      
      <ExchangeTable
        data={data}
        count={count}
        loading={isLoading}
        page={page}
        columns={columns}
        handleFilterOpen={handleFilterOpen}
        updateDataFilters={updateDataFilters}
        refreshData={refreshData}
      />
    </>
  )
}

export default PlayerExchanges
