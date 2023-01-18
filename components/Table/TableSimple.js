import {
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper as MuiPaper,
} from "@mui/material"
import { useTable, useSortBy } from "react-table"
import { spacing, styled } from "@mui/system"

const Paper = styled(MuiPaper)(spacing)

const TableSimple = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      initialState: {
        hiddenColumns: columns.map(column => {
          if (column.show === false) return column.accessor || column.id
        }),
      },
      columns,
      data,
      disableMultiSort: true,
    },
    useSortBy
  )

  return (
    <Paper>
      <TableContainer>
        <MuiTable component={Paper} {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => {
              const { key, ...headerGroupProps } =
                headerGroup.getHeaderGroupProps()
              return (
                <TableRow key={key} {...headerGroupProps}>
                  {headerGroup.headers.map(column => {
                    const { ket: headerKey, ...headerProps } =
                      column.id === "selection"
                        ? column.getHeaderProps()
                        : column.getHeaderProps(column.getSortByToggleProps())
                    return (
                      <TableCell sx={{whiteSpace: "nowrap"}} key={headerKey} {...headerProps}>
                        {column.render("Header")}
                        {column.id !== "selection" ? (
                          <TableSortLabel
                            active={column.isSorted}
                            // react-table has a unsorted state which is not treated here
                            direction={column.isSortedDesc ? "desc" : "asc"}
                          />
                        ) : null}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableHead>
          <TableBody>
            {rows.map(row => {
              prepareRow(row)
              const { key: rowKey, ...rowProps } = row.getRowProps()
              return (
                <TableRow key={rowKey} {...rowProps}>
                  {row.cells.map(cell => {
                    const { key: cellKey, ...cellProps } = cell.getCellProps()
                    return (
                      <TableCell key={cellKey} {...cellProps}>
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
    </Paper>
  )
}

export default TableSimple
