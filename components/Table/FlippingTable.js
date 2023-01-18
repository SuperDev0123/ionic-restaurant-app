import React, { useState, useEffect, useCallback } from "react"
import { styled, spacing } from "@mui/system"
import Button from "@components/Buttons/Button"
import useAuth from "@useAuth"
import {
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar as MuiToolbar,
  IconButton,
  Typography,
  TableSortLabel,
  Paper as MuiPaper,
  Checkbox,
  FormControlLabel,
  Modal,
  TablePagination,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import FilterListIcon from "@mui/icons-material/FilterList"
import RefreshIcon from "@mui/icons-material/Refresh"
import ViewWeekIcon from "@mui/icons-material/ViewWeek"
import { useTable, useSortBy } from "react-table"
import LoaderBaseball from "../LoaderBaseball"
import Image from "next/image"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import { getSortFilterValue } from "@features/tables/utils/table-data-utils"

const Paper = styled(MuiPaper)(spacing)
const Toolbar = styled(MuiToolbar)`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  ${props => props.theme.breakpoints.up("md")} {
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
  }
`
const ModalPaper = styled(MuiPaper)`
  position: relative;
  width: 500px;
  padding: 2rem;
  max-width: 100%;
  max-height: 80vh;
  overflow: scroll;
  h2 {
    margin-bottom: 2rem;
  }
  .closeModalIcon {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
  .doneModalIcon {
    position: absolute;
    right: 4rem;
    top: 1rem;
  }
  .MuiFormControl-root {
    margin-bottom: 2rem;
  }
`
const StickyStyles = styled("div")`
  .Name {
      position: sticky;
      left: 0;
      width: 200px;
      max-width: 200px;
      min-width: 150px;
      white-space: normal;
      z-index: 1000;
      background: inherit;
  } 
  .icon-size {
      width: 10px;
      height: 10px;
      margin-right: 10px;
  }
  tr:nth-child(odd) {
    background: ${props => props.theme.palette.background.paper};
  }
  tr:nth-child(even) {
    background: ${props => props.theme.palette.secondary.main};
  }
  td {
    font-size: 16px;
    white-space: nowrap !important;
  }
  th {
    font-weight: bold;
    text-transform: uppercase;
  }
}
`

const FlippingTable = ({
  columns = [],
  data,
  page,
  count,
  handleFilterOpen,
  refreshData,
  maxMin,
  loading,
  updateDataFilters,
}) => {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    state: { sortBy },
  } = useTable(
    {
      initialState: {
        hiddenColumns: columns.map(column => {
          if (column.show === false) return column.accessor || column.id
        }),
      },
      columns,
      data,
      manualSortBy: true,
      disableMultiSort: true,
    },
    useSortBy
  )

  // const { currentUserIsGoldPlus } = useAuth()
  const { currentUserIsSilverPlus } = useAuth()
  const [openColumns, setOpenColumns] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)

  const handleColumnOpen = useCallback(() => {
    setOpenColumns(true)
  }, [])

  const handleColumnClose = useCallback(() => {
    setOpenColumns(false)
  }, [])

  const handlePageChange = (_, value) => {
    updateDataFilters({ page: value + 1 })
  }

  const goFullscreen = () => {
    setFullscreen(!fullscreen)
    document.body.classList.toggle("fullscreen")
  }

  useEffect(() => {
    if (sortBy[0]) {
      const sortFilterValue = getSortFilterValue(sortBy[0])
      updateDataFilters({ order_by: sortFilterValue })
    }
  }, [sortBy])

  const grabImage = value => {
    if (value === "Diamond") {
      return (
        <Image
          src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-diamond.png"
          alt="Shield Diamond"
          width={10}
          height={10}
          className={"icon-size"}
        />
      )
    }
    if (value === "Gold") {
      return (
        <Image
          src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-gold.png"
          alt="Shield Gold"
          width={10}
          height={10}
          className={"icon-size"}
        />
      )
    }
    if (value === "Silver") {
      return (
        <Image
          src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-silver.png"
          alt="Shield Silver"
          width={10}
          height={10}
          className={"icon-size"}
        />
      )
    }
    if (value === "Bronze") {
      return (
        <Image
          src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-bronze.png"
          alt="Shield Bronze"
          width={10}
          height={10}
          className={"icon-size"}
        />
      )
    }
    if (value === "Common") {
      return (
        <Image
          src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-common.png"
          alt="Shield Common"
          width={10}
          height={10}
          className={"icon-size"}
        />
      )
    } else {
      return <></>
    }
  }

  const displayColour = cell => {
    var color = "hsl(0,50%,20%)"
    if (maxMin) {
      if (
        cell.column.Header === "Profit %" ||
        cell.column.Header === "Sales/Minute" ||
        cell.column.Header === "Profit/Minute"
      ) {
        var sortMin = 0
        var sortMax = 100
        if (cell.column.Header === "Profit %") {
          sortMax = maxMin[0].max
        }
        if (cell.column.Header === "Sales/Minute") {
          sortMax = maxMin[2].max
        }
        if (cell.column.Header === "Profit/Minute") {
          sortMax = maxMin[1].max
        }

        var cell_value = cell.value

        if (cell.value > sortMax) {
          cell_value = sortMax
        }

        var percent = 0
        percent = (cell_value * 100) / sortMax
        var hue = Math.floor(percent * 120) / 100

        return { backgroundColor: `hsl(${hue},50%,20%)` }
      }
      return { backgroundColor: "transparent" }
    }
    return { backgroundColor: "transparent" }
  }

  const renderTableCell = cell => {
    const { key: cellKey, ...cellProps } = cell.getCellProps()
    if (
      cell.column.Header === "Profit %" ||
      cell.column.Header === "Sales/Minute" ||
      cell.column.Header === "Profit/Minute"
    ) {
      return (
        <TableCell style={displayColour(cell)} key={cellKey} {...cellProps}>
          {cell.render("Cell")}
        </TableCell>
      )
    } else {
      return (
        <TableCell
          className={`${cell.column.Header}`}
          key={cellKey}
          {...cellProps}
        >
          <span>
            {cell.column.Header === "Rarity" ? grabImage(cell.value) : ""}
          </span>
          {cell.render("Cell")}
        </TableCell>
      )
    }
  }

  if (loading) return <LoaderBaseball />

  return (
    <Paper
      style={
        fullscreen
          ? {
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 9998,
              height: "100%",
            }
          : {}
      }
    >
      <Toolbar>
        <div>
          <Button
            variant="filled"
            size="sm"
            onClick={handleColumnOpen}
            style={{ marginRight: "1rem" }}
          >
            <ViewWeekIcon style={{ marginRight: ".5rem" }} />
            Columns
          </Button>
          <Button
            variant="filled"
            size="sm"
            onClick={handleFilterOpen}
            style={{ marginRight: "1rem" }}
          >
            <FilterListIcon style={{ marginRight: ".5rem" }} /> Filters
          </Button>
          <Button
            style={{ marginRight: "1rem", marginTop: ".5rem" }}
            variant="filled"
            size="sm"
            onClick={refreshData}
          >
            <RefreshIcon style={{ marginRight: ".5rem" }} /> Refresh
          </Button>
          {currentUserIsSilverPlus ? (
            <Button
              style={{ marginRight: "1rem", marginTop: ".5rem" }}
              variant="filled"
              size="sm"
              onClick={goFullscreen}
            >
              <FullscreenIcon style={{ marginRight: ".5rem" }} /> Fullscreen
            </Button>
          ) : (
            ""
          )}
        </div>
      </Toolbar>
      <TableContainer>
        <Modal
          open={openColumns}
          onClose={handleColumnClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ModalPaper>
            <Typography component="h2" variant="h6">
              Show Columns
            </Typography>
            <IconButton
              aria-label="close"
              className="closeModalIcon"
              onClick={handleColumnClose}
            >
              <CloseIcon />
            </IconButton>
            {allColumns.map(column => (
              <div key={column.id}>
                <FormControlLabel
                  control={<Checkbox {...column.getToggleHiddenProps()} />}
                  label={column.Header}
                />
              </div>
            ))}
          </ModalPaper>
        </Modal>
        <StickyStyles>
          <MuiTable component={Paper} {...getTableProps()}>
            <TableHead>
              {headerGroups.map(headerGroup => {
                const { key: headerGroupKey, ...headerGroupProps } =
                  headerGroup.getHeaderGroupProps()
                return (
                  <TableRow key={headerGroupKey} {...headerGroupProps}>
                    {headerGroup.headers.map(column => (
                      <TableCell
                        className={column.Header}
                        key={column.id}
                        {...(column.id === "selection"
                          ? column.getHeaderProps()
                          : column.getHeaderProps(
                              column.getSortByToggleProps()
                            ))}
                      >
                        {column.render("Header")}
                        {column.id !== "selection" ? (
                          <TableSortLabel
                            active={column.isSorted}
                            // react-table has a unsorted state which is not treated here
                            direction={column.isSortedDesc ? "desc" : "asc"}
                          />
                        ) : null}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableHead>
            <TableBody className="body">
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <TableRow key={row.id} {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return renderTableCell(cell)
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </MuiTable>
        </StickyStyles>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25]}
        component="div"
        count={count}
        rowsPerPage={25}
        page={page - 1}
        onPageChange={handlePageChange}
      />
    </Paper>
  )
}

export default FlippingTable
