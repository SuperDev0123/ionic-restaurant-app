import { useState, useCallback, useEffect } from "react"
import { Button } from "@mui/material"
import ModalPaper from "@components/ModalPaper"
import { convertPropsToArray } from "@features/tables/utils/table-data-utils"

import TitleAndButtons from "./components/common/TitleAndButtons"
import { FilterFields } from "./components/common/styledComponents"
import FiltersSubset from "./components/FiltersSubset"
import { FiltersSubsetUtil } from "./utils/FiltersSubsetUtil"

const FiltersModal = (params) => {
  const {
    subset = FiltersSubsetUtil.PLAYERS,
    isOpen,
    onClose = () => ({}),
    dataFilters,
    updateDataFilters,
  } = params

  const arrayTypeProps = FiltersSubsetUtil.getArrayTypeProps(subset)
  const [filters, setFilters] = useState({})

  useEffect(() => {
    setFilters(convertPropsToArray(dataFilters, arrayTypeProps));
  }, [dataFilters])

  const handleFilterChange = useCallback(event => {
    setFilters(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }, [])

  const handleFilterSubmit = () => {
    updateDataFilters(filters);
    onClose()
  }

  return (
    <ModalPaper isOpen={isOpen} onClose={onClose}>
      <TitleAndButtons
        onClose={onClose}
        handleFilterSubmit={handleFilterSubmit}
      />
      <FilterFields>
        <FiltersSubset 
          {...params}
          subset={subset}
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </FilterFields>
      <Button variant="contained" onClick={handleFilterSubmit}>
        Apply Filters
      </Button>
    </ModalPaper>
  )
}

export default FiltersModal
