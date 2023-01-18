import Button from "@mui/material/Button"

import Link from "@components/OurLink"

import formatTableNumber from "../utils/format-table-number"

export const findColumns = () => {
  const cols = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
        Header: "Cards Required",
        accessor: "cards_required",
        Cell: ({ value }) => formatTableNumber(value),
      },
    {
      Header: "Buy Low",
      accessor: "buy",
      Cell: ({ value }) => formatTableNumber(value),
    },
    {
      Header: "Buy High",
      accessor: "sell",
      Cell: ({ value }) => formatTableNumber(value),
    },
    {
      Header: "Reward",
      accessor: "reward_name",
    },
    {
      Header: "Profile",
      accessor: "reward_id",
      Cell: ({ value }) => {
        return (
          <Link href={"/players/" + value}>
            <Button size="small" variant="contained">
              View Card
            </Button>
          </Link>
        )
      },
    },
  ]

  return cols.map(col => ({ ...col, id: col.accessor }))
}

export const columns = findColumns()
