import Button from "@components/Buttons/Button"
import NavLink from "@components/OurNavLink"
import Link from "@components/OurLink"

import formatTableNumber from "../utils/format-table-number"
import FollowButton from "@components/FollowButton/FollowButton"
export const columnsData = {
  positions: ["SP", "RP", "CP", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"],
  rarity: ["Common", "Bronze", "Silver", "Gold", "Diamond"],
  series: [
    "2022 All-Star",
    "2022 Finest",
    "2022 Postseason",
    "2nd Half Heroes",
    "All-Star",
    "Awards",
    "Breakout",
    "Cover Athletes",
    "Faces of the Franchise",
    "Finest",
    "Future Stars",
    "Home Run Derby",
    "Live",
    "Milestone",
    "Monthly Awards",
    "Postseason",
    "Prime",
    "Prospect",
    "Rookie",
    "Signature",
    "Takashi Okazaki",
    "Topps Now",
    "Veteran",
  ],
  teams: [
    "Angels",
    "Astros",
    "Athletics",
    "Blue Jays",
    "Braves",
    "Brewers",
    "Cardinals",
    "Cubs",
    "Diamondbacks",
    "Dodgers",
    "Giants",
    "Guardians",
    "Mariners",
    "Marlins",
    "Mets",
    "Nationals",
    "Orioles",
    "Padres",
    "Pirates",
    "Phillies",
    "Rangers",
    "Rays",
    "Reds",
    "Red Sox",
    "Rockies",
    "Royals",
    "Tigers",
    "Twins",
    "White Sox",
    "Yankees",
  ],
  divisions: [
    "AL West",
    "AL Central",
    "AL East",
    "NL West",
    "NL Central",
    "NL East",
  ],
}

export const findFilterParams = isGold =>
  isGold
    ? {
        best_buy: "best_buy_price_pro",
        min_best_buy: "min_buy_pro",
        max_best_buy: "max_buy_pro",
        best_sell: "best_sell_price_pro",
        min_best_sell: "min_sell_pro",
        max_best_sell: "max_sell_pro",
        cost_per_point: "cost_per_exchange_point_pro",
        min_cost_per_point: "min_cost_per_point_pro",
        max_cost_per_point: "max_cost_per_point_pro",
      }
    : {
        best_buy: "best_buy_price",
        min_best_buy: "min_buy",
        max_best_buy: "max_buy",
        best_sell: "best_sell_price",
        min_best_sell: "min_sell",
        max_best_sell: "max_sell",
        cost_per_point: "cost_per_exchange_point",
        min_cost_per_point: "min_cost_per_point",
        max_cost_per_point: "max_cost_per_point",
      }

export const findColumns = ({
  best_buy,
  min_best_buy,
  max_best_buy,
  best_sell,
  min_best_sell,
  max_best_sell,
  cost_to_exchange_div,
  min_cost_to_exchange_div,
  max_cost_to_exchange_div,
  cost_per_point,
  min_cost_per_point,
  max_cost_per_point,
}) => {
  const cols = [
    {
      Header: "Profile",
      accessor: "player_profile.card_id",
      disableSortBy: true,
      Cell: ({ value }) => {
        return (
          <>
            <NavLink href={"/players/" + String(value)}>
              <Button variant="filled" size="xs">
                View Card
              </Button>
            </NavLink>
            <FollowButton player={{ card_id: value }} large={false} />
          </>
        )
      },
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Overall",
      accessor: "player_profile.overall",
    },
    {
      Header: "Rarity",
      accessor: "rarity",
      disableSortBy: true,
    },
    {
      Header: "Position",
      accessor: "player_profile.display_position",
      show: false,
    },
    {
      Header: "Series",
      accessor: "player_profile.series",
      show: false,
    },
    {
      Header: "Team",
      accessor: "player_profile.team",
    },
    {
      Header: "Division",
      accessor: "player_profile.division",
    },
    {
      Header: "Buy",
      accessor: best_buy,
      Cell: ({ value }) => formatTableNumber(value),
    },
    {
      Header: "Exchange Value",
      id: "exchange_value",
      accessor: "exchange_value",
      Cell: ({ value }) => formatTableNumber(value),
    },
    {
      Header: "Cards Needed",
      id: "qty_to_exchange_5000000",
      accessor: "qty_to_exchange_5000000",
      Cell: "",
    },
    {
      Header: "Total Cost",
      accessor: "cost_to_exchange_5000000",
      Cell: "",
    },
    {
      Header: "Time Needed",
      accessor: "time_to_exchange_5000000",
      Cell: "",
    },
    // {
    //   Header: "Qty/Division",
    //   accessor: "qty_to_exchange_div",
    // },
    // {
    //   Header: "Cost/Division",
    //   accessor: cost_to_exchange_div,
    //   Cell: ({ value }) => formatTableNumber(value),
    // },
    // {
    //   Header: "Time/Division",
    //   accessor: "time_to_exchange_div",
    // },
    {
      Header: "Cost Per Point",
      accessor: cost_per_point,
    },
    {
      Header: "View on TheShow.com",
      accessor: "player_profile.tsn_link",
      Cell: ({ value }) => {
        return (
          <Link href={value} target="/blank">
            <Button variant="filled" size="xs">
              Open Card
            </Button>
          </Link>
        )
      },
    },
  ]

  return cols.map(col => ({ ...col, id: col.id || col.accessor }))
}
