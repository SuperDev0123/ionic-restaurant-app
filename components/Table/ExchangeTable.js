import React, { useState, useEffect, useCallback } from "react"
import { styled, spacing } from "@mui/system"
import useAuth from "@useAuth"
import Button from "@components/Buttons/Button"
import {
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar as MuiToolbar,
  TextField as MuiTextField,
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
import { getSortFilterValue } from "@features/tables/utils/table-data-utils"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"

const Paper = styled(MuiPaper)(spacing)
const Toolbar = styled(MuiToolbar)`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  ${props => props.theme.breakpoints.up("md")} {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }
`
const TextField = styled(MuiTextField)`
  width: 100%;
  margin: 1rem 0;
  ${props => props.theme.breakpoints.up("md")} {
    max-width: 300px;
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

const ExchangeTable = ({
  columns = [],
  data,
  page,
  count,
  handleFilterOpen,
  loading,
  refreshData,
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

  const [openColumns, setOpenColumns] = useState(false)
  const [exchangeValue, setExchangeValue] = useState(0)
  const { currentUserIsSilverPlus } = useAuth()
  const [fullscreen, setFullscreen] = useState(false)

  const goFullscreen = () => {
    setFullscreen(!fullscreen)
    document.body.classList.toggle("fullscreen")
  }

  const handlePageChange = (_, value) => {
    updateDataFilters({ page: value + 1 })
  }

  const changeTargetValue = ev => {
    setExchangeValue(ev.target.value)
  }

  const handleColumnOpen = useCallback(() => {
    setOpenColumns(true)
  }, [])

  const handleColumnClose = useCallback(() => {
    setOpenColumns(false)
  }, [])

  useEffect(() => {
    if (sortBy[0]) {
      const sortFilterValue = getSortFilterValue(sortBy[0])
      updateDataFilters({ order_by: sortFilterValue })
    }
  }, [sortBy])

  const { currentUserIsGoldPlus } = useAuth()

  const grabImage = value => {
    if (value === "Diamond") {
      return (
        <Image
          src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-diamond.png"
          width={10}
          height={10}
          style={{ maxWidth: 10, marginRight: 10 }}
          alt="Shield Diamond"
        />
      )
    }
    if (value === "Gold") {
      return (
        <Image
          src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-gold.png"
          width={10}
          height={10}
          style={{ maxWidth: 10, marginRight: 10 }}
          alt="Shield Gold"
        />
      )
    }
    if (value === "Silver") {
      return (
        <Image
          src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-silver.png"
          width={10}
          height={10}
          style={{ maxWidth: 10, marginRight: 10 }}
          alt="Shield Silver"
        />
      )
    }
    if (value === "Bronze") {
      return (
        <Image
          src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-bronze.png"
          width={10}
          height={10}
          style={{ maxWidth: 10, marginRight: 10 }}
          alt="Shield Bronze"
        />
      )
    }
    if (value === "Common") {
      return (
        <Image
          src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-common.png"
          width={10}
          height={10}
          style={{ maxWidth: 10, marginRight: 10 }}
          alt="Shield Common"
        />
      )
    } else {
      return <></>
    }
  }

  const displayColour = cell => {
    var color = "hsl(0,50%,20%)"
    if (cell.column.Header === "Profit %") {
      var percent = cell.value

      var hue = Math.floor(percent * 120) / 100

      return { backgroundColor: `hsl(${hue},50%,20%)` }
    }
    return { backgroundColor: "transparent" }
  }

  const computeQtyNeeded = cell => {
    return Math.ceil(exchangeValue / cell.row.original.exchange_value)
  }

  const computeTotalCost = cell => {
    // add pro
    if (currentUserIsGoldPlus) {
      return (
        Math.ceil(exchangeValue / cell.row.original.exchange_value) *
        cell.row.original.best_buy_price_pro
      )
    } else {
      return (
        Math.ceil(exchangeValue / cell.row.original.exchange_value) *
        cell.row.original.best_buy_price
      )
    }
  }

  const computeTimeNeeded = cell => {
    return (
      Math.ceil(
        Math.ceil(exchangeValue / cell.row.original.exchange_value) *
          parseFloat(cell.row.original.sales_minute)
      ) + " mins"
    )
  }

  if (loading) return <LoaderBaseball />

  return (
    <>
      <TextField
        label="Exchange Cost"
        value={exchangeValue}
        onChange={changeTargetValue}
        style={{ width: "100%" }}
      />
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
          <div></div>
          <div>
            <Button
              variant="filled"
              size="sm"
              onClick={handleColumnOpen}
              style={{ marginRight: "1rem" }}
            >
              <ViewWeekIcon />
            </Button>
            <Button
              variant="filled"
              size="sm"
              onClick={handleFilterOpen}
              style={{ marginRight: "1rem" }}
            >
              <FilterListIcon />
            </Button>
            <Button
              style={{ marginRight: "1rem", marginTop: ".5rem" }}
              variant="filled"
              size="sm"
              onClick={refreshData}
            >
              <RefreshIcon />
            </Button>
            {currentUserIsSilverPlus ? (
              <Button
                style={{ marginRight: "1rem", marginTop: ".5rem" }}
                variant="filled"
                size="sm"
                onClick={goFullscreen}
              >
                {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </Button>
            ) : (
              ""
            )}
          </div>
        </Toolbar>
        <TablePagination
          rowsPerPageOptions={[25]}
          component="div"
          count={count}
          rowsPerPage={25}
          page={page - 1}
          onPageChange={handlePageChange}
        />
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
                        const { key: cellKey, ...cellProps } =
                          cell.getCellProps()
                        return (
                          <TableCell
                            className={`${cell.column.Header}`}
                            key={cellKey}
                            {...cellProps}
                          >
                            {cell.column.Header === "Cards Needed"
                              ? computeQtyNeeded(cell)
                              : null}
                            {cell.column.Header === "Total Cost"
                              ? computeTotalCost(cell)
                              : null}
                            {cell.column.Header === "Time Needed"
                              ? computeTimeNeeded(cell)
                              : null}
                            <span>
                              {cell.column.Header === "Rarity"
                                ? grabImage(cell.value)
                                : ""}
                            </span>
                            {cell.render("Cell")}
                          </TableCell>
                        )
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
    </>
  )
}

export default ExchangeTable
