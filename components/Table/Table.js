import React, { useState, useEffect, useMemo, useCallback } from "react"
import { styled, spacing } from "@mui/system"
import {
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableCell,
  Button,
  TableHead,
  TableRow,
  Toolbar,
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
import Image from "next/image";

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
      background: ${props => props.theme.palette.secondary.main};
      width: 200px;
      max-width: 200px;
      min-width: 150px;
      white-space: normal;
      z-index: 1000;
  }
}
`

const Table = ({
  columns = [],
  data,
  page,
  count,
  onSort = () => ({}),
  handlePageChange,
  handleFilterOpen,
  fetchData,
  loading,
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

  const handleColumnOpen = useCallback(() => {
    setOpenColumns(true)
  }, [])

  const handleColumnClose = useCallback(() => {
    setOpenColumns(false)
  }, [])

  useEffect(() => {
    onSort(sortBy)
  }, [sortBy, onSort])

  const grabImage = (value) => {
    if(value === 'Diamond') {
      return ( <Image src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-diamond.png" alt="Shield Diamond" width={10} height={10} style={{ maxWidth: 10, marginRight: 10 }} /> )
    }
    if(value === 'Gold') {
      return ( <Image src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-gold.png" alt="Shield Gold" width={10} height={10} style={{ maxWidth: 10, marginRight: 10 }} /> )
    }
    if(value === 'Silver') {
      return ( <Image src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-silver.png" alt="Shield Silver" width={10} height={10} style={{ maxWidth: 10, marginRight: 10 }} /> )
    }
    if(value === 'Bronze') {
      return ( <Image src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-bronze.png" alt="Shield Bronze" width={10} height={10} style={{ maxWidth: 10, marginRight: 10 }} /> )
    }
    if(value === 'Common') {
      return ( <Image src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-common.png" alt="Shield Common" width={10} height={10} style={{ maxWidth: 10, marginRight: 10 }} /> )
    }
    else {
      return ( <></> )
    }
  }

  const displayColour = (cell) => {
    var color = 'hsl(0,50%,20%)'
    if(cell.column.Header === 'Profit %') {
      var percent = cell.value

      var hue = (Math.floor((percent) * 120)/100)

      return { backgroundColor: `hsl(${hue},50%,20%)` }
    }

    return { backgroundColor: 'transparent' }
  }

  if (loading) return <LoaderBaseball />

  return (
    <Paper>
      <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}>
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleColumnOpen}
          style={{ marginRight: "1rem" }}
        >
          <ViewWeekIcon style={{ marginRight: ".5rem" }} />
          Columns
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterOpen}
          style={{ marginRight: "1rem" }}
        >
          <FilterListIcon style={{ marginRight: ".5rem" }} /> Filters
        </Button>
        <Button variant="contained" color="primary" onClick={fetchData}>
          <RefreshIcon style={{ marginRight: ".5rem" }} /> Refresh
        </Button>
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
            <MuiTable
            component={Paper}
            {...getTableProps()}
            >
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
                            : column.getHeaderProps(column.getSortByToggleProps()))}
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
                    <TableRow key={row.id}  {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        const { key: cellKey, ...cellProps } = cell.getCellProps()
                        return (
                        <TableCell className={`${cell.column.Header}`} key={cellKey} {...cellProps}>
                            <span>{ cell.column.Header === 'Rarity' ? grabImage(cell.value) : '' }</span>{cell.render("Cell")}
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
  )
}

export default Table
