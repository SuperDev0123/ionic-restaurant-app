import React, { useState, useEffect, useRef } from "react"
import { styled, spacing } from "@mui/system"
import useAuth from "@useAuth"
import Button from "@components/Buttons/Button"
import {
  Alert,
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
  Switch,
  Modal,
  TablePagination,
  Select,
  MenuItem,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import FilterListIcon from "@mui/icons-material/FilterList"
// import RefreshIcon from "@mui/icons-material/Refresh"
import DownloadIcon from "@mui/icons-material/Download"
import ViewWeekIcon from "@mui/icons-material/ViewWeek"
import CompareIcon from "@mui/icons-material/Compare"
import { useTable, useSortBy, useRowSelect, usePagination } from "react-table"
// import LoaderBaseball from "../LoaderBaseball"
import axios from "axios"
import LoadingButton from "@mui/lab/LoadingButton"
import SaveIcon from "@mui/icons-material/Save"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import MLBColours from "./mlbColors.json"
import { getSortFilterValue } from "@features/tables/utils/table-data-utils"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const { Parser } = require("json2csv")

const Toolbar = styled(MuiToolbar)`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  ${props => props.theme.breakpoints.up("md")} {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }
`

const Paper = styled(MuiPaper)(spacing)
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

  .Diamond {
    background: rgba(57,175,250, 0.3);
  }
  .Gold {
    background: rgba(250,207,57,0.3);
  }
  .Silver {
    background: rgba(150,150,150,0.3)
  }
  .Bronze {
    background: rgba(218,112,17,0.3)
  }
  tr:nth-child(odd) {
    background: ${props => props.theme.palette.background.paper};
  }
  tr:nth-child(even) {
    background: ${props => props.theme.palette.secondary.main};
  }
  td {
    font-size: 16px;
  }
  th {
    font-weight: bold;
    text-transform: uppercase;
  }
}
`

const IndeterminateCheckbox = React.forwardRef(function IndeterminateCheckbox(
  { indeterminate, ...rest },
  ref
) {
  const defaultRef = useRef()
  const resolvedRef = ref || defaultRef

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return <input type="checkbox" ref={resolvedRef} {...rest} />
})

const TableCompare = ({
  columns = [],
  data,
  page,
  count = 0,
  handleFilterOpen,
  loading,
  header,
  handleInventoryTypeChange,
  inventoryType,
  updateDataFilters,
}) => {
  const [openColumns, setOpenColumns] = React.useState(false)
  const [errorNoPlayers, setErrorNoPlayers] = React.useState(false)
  const [errorTooManyPlayers, setErrorTooManyPlayers] = React.useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [working, setWorking] = React.useState(false)
  const { currentUserIsSilverPlus } = useAuth()

  const handlePageChange = (_, value) => {
    updateDataFilters({ page: value + 1 })
  }

  const [colourCode, setColourCode] = React.useState(false)
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    selectedFlatRows,
    state: { sortBy, selectedRowIds = [] },
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
      autoResetSelectedRows: false,
      getRowId: row => row.card_id,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => "",
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ])
    }
  )

  const handleColumnOpen = () => {
    setOpenColumns(true)
  }

  const handleColumnClose = () => {
    setOpenColumns(false)
  }

  const comparePlayers = () => {
    if (Object.keys(selectedRowIds).length < 2) {
      toast.error("Please select at least 2 players.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "dark",
      })
      return
    }
    if (Object.keys(selectedRowIds).length > 5) {
      toast.error("Please select no more than 5 players.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "dark",
      })
      return
    }
    let playerIds = []
    for (const playerId in selectedRowIds) {
      playerIds.push(playerId)
    }
    playerIds = playerIds.toString()
    window.open(`/players/compare/?players=${playerIds}`)
  }

  const handleColor = data => {
    if (colourCode === true) {
      if (
        Number(data.value) !== NaN &&
        data.column.Header !== "Buy" &&
        data.column.Header !== "Sell"
      ) {
        if (data.value > 84) {
          return "Diamond"
        }
        if (data.value > 79 && data.value < 85) {
          return "Gold"
        }
        if (data.value > 74 && data.value < 80) {
          return "Silver"
        }
        if (data.value > 64 && data.value < 75) {
          return "Bronze"
        }
      }
      return ""
    }
    return ""
  }

  useEffect(() => {
    if (sortBy[0]) {
      const sortFilterValue = getSortFilterValue(sortBy[0])
      updateDataFilters({ order_by: sortFilterValue })
    }
  }, [sortBy])

  useEffect(() => {}, [columns])

  const downloadCSV = async () => {
    const queryString = window.location.search

    var urlParams = new URLSearchParams(queryString)
    urlParams.delete("page")
    // ?format=json&order_by=desc%20playerprofileadvanced__overall_true&page=1
    setWorking(true)

    var columnsForCSV = []
    for (const column of columns) {
      if (typeof column.show == "undefined") {
        var accessor = column.accessor
        // if(column.accessor.includes('.')) {
        //   accessor = column.accessor.split('.')[1]
        // }
        columnsForCSV.push(accessor)
      }
    }

    var selectedRowKeys = Object.keys(selectedRowIds)
    var dataToParse = []
    if (selectedRowKeys.length === 0) {
      const pages = Math.ceil(count / 100)
      let i = 1
      for (i; i < pages + 1; i++) {
        var resData = await axios.get(
          `https://api.showzone.io/api/player-profiles?${urlParams.toString()}&page=${i}&page_size=100`
        )
        var players = resData.data

        var array = players.results

        array.map(player => {
          var advanced = player.playerprofileadvanced

          for (const key in advanced) {
            player[key] = advanced[key]
          }

          delete player.playerprofileadvanced
        })

        dataToParse.push(...array)
      }
    }
    if (selectedRowKeys.length > 0) {
      // grab the appropriate rows and create a CSV
      for (const row of selectedRowKeys) {
        var resData = await axios.get(
          `https://api.showzone.io/api/player-profiles/${row}`
        )
        var player = resData.data

        var advanced = player.playerprofileadvanced

        for (const key in advanced) {
          player[key] = advanced[key]
        }

        delete player.playerprofileadvanced

        dataToParse.push(player)
      }
    }

    const opts = columnsForCSV
    const parser = new Parser(opts)
    const csv = parser.parse(dataToParse)

    var hiddenElement = document.createElement("a")
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv)
    hiddenElement.target = "_blank"

    //provide the name for the CSV file to be downloaded
    hiddenElement.download = "ShowZonePlayerData.csv"
    hiddenElement.click()
    setWorking(false)
  }

  const DownloadCSVButton = () => {
    const { currentUserIsGoldPlus } = useAuth()
    if (currentUserIsGoldPlus) {
      if (working === false) {
        return (
          <Button
            variant="filled"
            size="sm"
            onClick={() => downloadCSV()}
            style={{ marginRight: "1rem", marginTop: ".5rem" }}
          >
            <DownloadIcon style={{ marginRight: ".5rem" }} />
            {Object.keys(selectedRowIds).length > 0
              ? `Download Selected (${Object.keys(selectedRowIds).length})`
              : `Download`}
          </Button>
        )
      }
      if (working === true) {
        return (
          <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            Preparing your CSV..
          </LoadingButton>
        )
      }
    }
  }

  const goFullscreen = () => {
    setFullscreen(!fullscreen)
    document.body.classList.toggle("fullscreen")
  }

  const grabLogo = value => {
    var data = MLBColours.mlbColors.find(team => {
      return team.name === value
    })
    console.log("data", data)
    return <img src={data?.logo} style={{ maxWidth: 10, marginRight: 10 }} />
  }

  const grabImage = value => {
    let image = <></>
    if (value === "Diamond") {
      image = (
        <img
          src="https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbnlIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--482e97411f887bae7a54cc95dcdfe726d5512825/shield-diamond.png"
          style={{ maxWidth: 10, marginRight: 10 }}
        />
      )
    }
    if (value === "Gold") {
      image = (
        <img
          src="https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbm1IIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--df5953c715ffe28929cc11bf11b366874dbc5375/shield-gold.png"
          style={{ maxWidth: 10, marginRight: 10 }}
        />
      )
    }
    if (value === "Silver") {
      image = (
        <img
          src="https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbnFIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3510745fbb510b080d2d2b8cebef1e97ffaeb2ae/shield-silver.png"
          style={{ maxWidth: 10, marginRight: 10 }}
        />
      )
    }
    if (value === "Bronze") {
      image = (
        <img
          src="https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbnVIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4784d25db477c6853340dcbad61e8f682a52f7ae/shield-bronze.png"
          style={{ maxWidth: 10, marginRight: 10 }}
        />
      )
    }
    if (value === "Common") {
      image = (
        <img
          src="https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmlIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--35507e20ab49ae94353b607ed2960b6eaaf6daf7/shield-common.png"
          style={{ maxWidth: 10, marginRight: 10 }}
        />
      )
    }

    return image
  }

  const handleSwitchChange = ev => {
    setColourCode(ev.target.checked)
  }

  // if (loading) return <LoaderBaseball />

  // Render the UI for your table
  return (
    <div>
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
            {inventoryType ? (
              <Select
                id="inventory_type_select"
                value={inventoryType}
                onChange={handleInventoryTypeChange}
              >
                <MenuItem value="owned">Owned Inventory</MenuItem>
                <MenuItem value="not-owned">Not Owned Inventory</MenuItem>
              </Select>
            ) : (
              ""
            )}
          </div>
          <div>
            {DownloadCSVButton()}
            <Button
              variant="filled"
              size="sm"
              onClick={handleColumnOpen}
              style={{ marginRight: "1rem", marginTop: ".5rem" }}
            >
              <ViewWeekIcon style={{ marginRight: ".5rem" }} />
              Columns
            </Button>
            <Button
              variant="filled"
              size="sm"
              onClick={handleFilterOpen}
              style={{ marginRight: "1rem", marginTop: ".5rem" }}
            >
              <FilterListIcon style={{ marginRight: ".5rem" }} /> Filters
            </Button>
            <Button
              style={{ marginRight: "1rem", marginTop: ".5rem" }}
              variant="filled"
              size="sm"
              onClick={comparePlayers}
            >
              <CompareIcon style={{ marginRight: ".5rem" }} /> Compare
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

        <TablePagination
          rowsPerPageOptions={[25]}
          component="div"
          count={count}
          rowsPerPage={25}
          page={page - 1}
          onPageChange={handlePageChange}
        />
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
            <FormControlLabel
              control={<Switch onChange={handleSwitchChange} />}
              label={"Color Code Columns"}
            />
            {allColumns.map(column => {
              var header = column.Header
              if (
                typeof column.Header !== "string" &&
                typeof column.Header !== "number"
              ) {
                // fix for error on string/number
                header = "Compare"
              }
              return (
                <div key={column.id}>
                  <FormControlLabel
                    control={<Checkbox {...column.getToggleHiddenProps()} />}
                    label={header}
                  />
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    style={{ marginBottom: "1rem" }}
                  >
                    {column.description}
                  </Typography>
                </div>
              )
            })}
          </ModalPaper>
        </Modal>
        <StickyStyles>
          <TableContainer>
            <MuiTable {...getTableProps()}>
              <TableHead>
                {headerGroups.map(headerGroup => {
                  const { key: headerGroupKey, ...headerGroupProps } =
                    headerGroup.getHeaderGroupProps()
                  return (
                    <TableRow key={headerGroupKey} {...headerGroupProps}>
                      {headerGroup.headers.map(column => (
                        <TableCell
                          className={
                            typeof column.Header === "string"
                              ? column.Header
                              : ""
                          }
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
              <TableBody>
                {rows.map((row, index) => {
                  prepareRow(row)
                  const { key: rowKey, ...rowProps } = row.getRowProps()
                  return (
                    <TableRow key={rowKey} {...rowProps}>
                      {row.cells.map(cell => {
                        const { key: cellKey, ...cellProps } =
                          cell.getCellProps()

                        return (
                          <TableCell
                            className={`${cell.column.Header} ${handleColor(
                              cell
                            )}`}
                            key={cellKey}
                            {...cellProps}
                          >
                            <span>
                              {cell.column.Header === "Rarity"
                                ? grabImage(cell.value)
                                : ""}
                            </span>
                            <span>
                              {cell.column.Header === "Team"
                                ? grabLogo(cell.value)
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
          </TableContainer>
        </StickyStyles>
        <TablePagination
          rowsPerPageOptions={[25]}
          component="div"
          count={count}
          rowsPerPage={25}
          page={page - 1}
          onPageChange={handlePageChange}
        />
      </Paper>
    </div>
  )
}

export default TableCompare
