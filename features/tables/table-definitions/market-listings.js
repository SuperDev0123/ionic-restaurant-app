import Button from "@components/Buttons/Button"
// import NavLink from "@components/OurNavLink"
import Link from "@components/OurLink"
import NavLink from "@components/OurNavLink"

import formatTableNumber from "../utils/format-table-number"
import FollowButton from "@components/FollowButton/FollowButton"
export const columnsData = {
  positions: ["SP", "RP", "CP", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"],
  rarity: ["Common", "Bronze", "Silver", "Gold", "Diamond"],
  series: [
    "2022 All-Star",
    "2022 Finest",
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
    "Free Agents",
  ],
  slots: [
    "Bat",
    "Bat Grips",
    "Battings Gloves",
    "Catcher Masks",
    "Chest Protector",
    "Cleats",
    "Compression Sleeve",
    "Elbow Guard",
    "Eyewear",
    "Fielding Glove",
    "Leg Guards",
    "Ritual",
    "Shin Guard",
    "Socks",
    "Wrist Guard",
  ],
  itemTypes: [
    "Equipment",
    "Perk",
    "Player",
    "Sponsorship",
    "Stadium",
    "Unlockable",
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
        profit: "profit_pro",
        min_profit: "min_profit_pro",
        max_profit: "max_profit_pro",
        profit_percentage: "profit_percentage_pro",
        min_profit_percentage: "min_profit_percentage_pro",
        max_profit_percentage: "max_profit_percentage_pro",
        sales_minute: "sales_minute_pro",
        profit_minute: "profit_minute_pro",
        min_profit_minute: "min_profit_minute_pro",
        max_profit_minute: "max_profit_minute_pro",
        quick_sell_value: "quick_sell_value",
        close_to_quick_sell: "close_to_quick_sell_pro",
      }
    : {
        best_buy: "best_buy_price",
        min_best_buy: "min_buy",
        max_best_buy: "max_buy",
        best_sell: "best_sell_price",
        min_best_sell: "min_sell",
        max_best_sell: "max_sell",
        profit: "profit",
        min_profit: "min_profit",
        max_profit: "max_profit",
        profit_percentage: "profit_percentage",
        min_profit_percentage: "min_profit_percentage",
        max_profit_percentage: "max_profit_percentage",
        sales_minute: "sales_minute",
        profit_minute: "profit_minute",
        min_profit_minute: "min_profit_minute",
        max_profit_minute: "max_profit_minute",
        quick_sell_value: "quick_sell_value",
        close_to_quick_sell: "close_to_quick_sell",
      }

export const findColumns = ({
  best_buy,
  best_sell,
  profit,
  profit_percentage,
  profit_minute,
  quick_sell_value,
  close_to_quick_sell,
}) => {
  const cols = [
    {
      Header: "",
      accessor: "player_profile.card_id",
      disableSortBy: true,
      Cell: ({ value }) => {
        return (
          <>
            <NavLink href={"/players/" + String(value)}>
              <Button size="xs" variant="filled">
                View Card
              </Button>
            </NavLink>
            &nbsp;&nbsp;
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
      show: false,
    },
    {
      Header: "Rarity",
      accessor: "rarity",
      disableSortBy: true,
    },
    {
      Header: "Series",
      accessor: "player_profile.series",
      show: false,
    },
    {
      Header: "Position",
      accessor: "player_profile.display_position",
      show: false,
    },
    {
      Header: "Buy",
      accessor: best_buy,
      Cell: ({ value }) => formatTableNumber(value),
    },
    {
      Header: "Sell",
      accessor: best_sell,
      Cell: ({ value }) => formatTableNumber(value),
    },
    {
      Header: "Quick Sell",
      accessor: quick_sell_value,
      Cell: ({ value }) => formatTableNumber(value),
    },
    {
      Header: "Close to Quick Sell",
      accessor: close_to_quick_sell,
      show: false,
      Cell: ({ value }) => {
        if (value == true) {
          return "Yes"
        } else {
          return "No"
        }
      },
    },
    {
      Header: "Profit",
      accessor: profit,
      Cell: ({ value }) => formatTableNumber(value),
    },
    {
      Header: "Profit %",
      accessor: profit_percentage,
      Cell: ({ value }) => formatTableNumber(value, true),
    },
    {
      Header: "Sales/Minute",
      accessor: "sales_minute",
    },
    {
      Header: "Profit/Minute",
      accessor: profit_minute,
      Cell: ({ value }) => formatTableNumber(value),
    },
    {
      Header: "Team",
      accessor: "team",
      show: false,
    },
    {
      Header: "View on TheShow.com",
      accessor: "tsn_link",
      Cell: ({ value }) => (
        <Link href={value} target="_blank">
          <Button size="xs" variant="filled" color="primary">
            Open Card
          </Button>
        </Link>
      ),
    },
  ]

  return cols.map(col => ({ ...col, id: col.accessor }))
}
