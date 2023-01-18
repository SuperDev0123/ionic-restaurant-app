import Button from "@components/Buttons/Button"
import NavLink from "@components/OurNavLink"
import Link from "@components/OurLink"
import FollowButton from "@components/FollowButton/FollowButton"
import formatTableNumber from "../utils/format-table-number"

export const columnsData = {
  game: [
    "MLB The Show 22",
    "MLB The Show 21",
    "MLB The Show 20",
    "MLB The Show 19",
    "MLB The Show 18",
  ],
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
  legacySeries: [
    "2019 All-Star",
    "2019 Postseason",
    "2020 Postseason",
    "2021 All-Star",
    "2021 Postseason",
    "Face of the Franchise",
    "Immortal",
    "Loyalty",
    "Official MLB Player Card",
    "Players League",
    "Prestige",
    "The 42",
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
  quirks: [
    "20 Vision",
    "Bomber",
    "Breaking Ball Hitter",
    "Buntmaster",
    "Cannon",
    "Catcher Pop Time",
    "Cheesy",
    "Control Artist",
    "Day Player",
    "Dead Red",
    "Fighter",
    "First-Pitch Hitter",
    "Grounded",
    "Hitting Machine",
    "Homebody",
    "Illusionist",
    "Knee Buckler",
    "Knuckleballer",
    "Mr. Splitee",
    "Night Player",
    "Outlier I",
    "Outlier II",
    "Pickoff Artist",
    "Pinch Hitter",
    "Platoon",
    "Pressure Cooker",
    "Quick Reflexes",
    "Rally Monkey",
    "Road Warrior",
    "Sinkerballer",
    "Situational Hitter",
    "Sniper",
    "Softhands",
    "Speedster",
    "Stingy",
    "Stopper",
    "Thief",
    "Unbreakable",
    "Unfazed",
    "Untouchable",
    "Vacuum",
    "Walker",
    "Workhorse",
  ],
  locations: [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "Aruba",
    "Australia",
    "Bahamas",
    "Brazil",
    "California",
    "Canada",
    "China",
    "Colombia",
    "Colorado",
    "Connecticut",
    "Cuba",
    "Curacao",
    "Czech Republic",
    "Delaware",
    "Dominican Republic",
    "Florida",
    "Georgia",
    "Germany",
    "Great Britain",
    "Guam",
    "Hawaii",
    "Honduras",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Japan",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maryland",
    "Massachusetts",
    "Mexico",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Netherlands",
    "Nevada",
    "New Jersey",
    "New Mexico",
    "New York",
    "Nicaragua",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Panama",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "South Korea",
    "Taiwan",
    "Tennessee",
    "Texas",
    "Utah",
    "Venezuela",
    "Virgin Islands",
    "Virginia",
    "Washington",
    "Washington, DC",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ],
}

export const findFilterParams = () => ({})

export const findColumns = () => {
  const cols = [
    {
      Header: "Profile",
      accessor: "card_id",
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
      Header: "Game",
      accessor: "game",
    },
    {
      Header: "Overall",
      accessor: "overall",
    },
    {
      Header: "True Overall",
      accessor: "playerprofileadvanced.overall_true",
      description:
        "This rating applies a weighted formula to each position, taking into account all player attributes weighted independently, then takes the cap off of the maximum 99 overall rating to provide a True reflection of a player’s overall rating.",
    },
    {
      Header: "Sec. True Ovr C",
      accessor: "playerprofileadvanced.overall_c",
      show: false,
    },
    {
      Header: "Sec. True Ovr 1B",
      accessor: "playerprofileadvanced.overall_1b",
      show: false,
    },
    {
      Header: "Sec. True Ovr 2B",
      accessor: "playerprofileadvanced.overall_2b",
      show: false,
    },
    {
      Header: "Sec. True Ovr 3B",
      accessor: "playerprofileadvanced.overall_3b",
      show: false,
    },
    {
      Header: "Sec. True Ovr SS",
      accessor: "playerprofileadvanced.overall_ss",
      show: false,
    },
    {
      Header: "Sec. True Ovr LF",
      accessor: "playerprofileadvanced.overall_lf",
      show: false,
    },
    {
      Header: "Sec. True Ovr CF",
      accessor: "playerprofileadvanced.overall_cf",
      show: false,
    },
    {
      Header: "Sec. True Ovr RF",
      accessor: "playerprofileadvanced.overall_rf",
      show: false,
    },
    {
      Header: "Meta Overall",
      accessor: "playerprofileadvanced.overall_meta",
    },
    {
      Header: "Meta Overall SP",
      accessor: "playerprofileadvanced.overall_meta_sp",
      show: false,
    },
    {
      Header: "Meta Overall RP",
      accessor: "playerprofileadvanced.overall_meta_rp",
      show: false,
    },
    {
      Header: "Meta Overall CP",
      accessor: "playerprofileadvanced.overall_meta_cp",
      show: false,
    },
    {
      Header: "Meta Overall C",
      accessor: "playerprofileadvanced.overall_meta_c",
      show: false,
    },
    {
      Header: "Meta Overall 1B",
      accessor: "playerprofileadvanced.overall_meta_1b",
      show: false,
    },
    {
      Header: "Meta Overall 2B",
      accessor: "playerprofileadvanced.overall_meta_2b",
      show: false,
    },
    {
      Header: "Meta Overall 3B",
      accessor: "playerprofileadvanced.overall_meta_3b",
      show: false,
    },
    {
      Header: "Meta Overall SS",
      accessor: "playerprofileadvanced.overall_meta_ss",
      show: false,
    },
    {
      Header: "Meta Overall LF",
      accessor: "playerprofileadvanced.overall_meta_lf",
      show: false,
    },
    {
      Header: "Meta Overall CF",
      accessor: "playerprofileadvanced.overall_meta_cf",
      show: false,
    },
    {
      Header: "Meta Overall RF",
      accessor: "playerprofileadvanced.overall_meta_rf",
      show: false,
    },
    {
      Header: "Rarity",
      accessor: "rarity",
      show: false,
      disableSortBy: true,
    },
    {
      Header: "Series",
      accessor: "series",
    },
    {
      Header: "Position",
      accessor: "display_position",
    },
    {
      Header: "Secondary Position(s)",
      accessor: "display_secondary_positions",
      Cell: ({ value }) => value.join(", "),
    },
    {
      Header: "All Position(s)",
      accessor: "all_positions",
      description: "Primary and secondary positions.",
      Cell: ({ value }) => value.join(", "),
    },
    {
      Header: "Event",
      accessor: "event",
      description:
        "Whether card is eligible for the current Diamond Dynasty event.",
      Cell: ({ value }) => {
        if (value == true) {
          return "Yes"
        } else {
          return "No"
        }
      },
    },
    {
      Header: "Buy",
      accessor: "marketlisting.best_buy_price",
      Cell: ({ value }) => {
        if (value) {
          return parseInt(value).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })
        } else {
          return ""
        }
      },
    },
    {
      Header: "Sell",
      accessor: "marketlisting.best_sell_price",
      Cell: ({ value }) => formatTableNumber(value),
    },
    {
      Header: "Team",
      accessor: "team",
    },
    {
      Header: "Bats",
      accessor: "bat_hand",
    },
    {
      Header: "Throws",
      accessor: "throw_hand",
    },
    {
      Header: "Number",
      accessor: "jersey_number",
      show: false,
    },
    {
      Header: "Weight",
      accessor: "weight",
      show: false,
    },
    {
      Header: "Height",
      accessor: "height",
      show: false,
    },
    {
      Header: "Age",
      accessor: "age",
      show: false,
    },
    {
      Header: "Born",
      accessor: "born",
    },
    {
      Header: "Contact - L",
      accessor: "contact_left",
    },
    {
      Header: "Contact - R",
      accessor: "contact_right",
    },
    {
      Header: "Average Contact",
      accessor: "playerprofileadvanced.average_contact",
      description:
        "Average contact rating against both lefty and righty pitching.",
    },
    {
      Header: "Power - L",
      accessor: "power_left",
    },
    {
      Header: "Power - R",
      accessor: "power_right",
    },
    {
      Header: "Average Power",
      accessor: "playerprofileadvanced.average_power",
      description:
        "Average power rating against both lefty and righty pitching.",
    },
    {
      Header: "Vision",
      accessor: "plate_vision",
    },
    {
      Header: "Discipline",
      accessor: "plate_discipline",
    },
    {
      Header: "Batting Clutch",
      accessor: "batting_clutch",
    },
    {
      Header: "Bunt",
      accessor: "bunting_ability",
    },
    {
      Header: "Drag Bunt",
      accessor: "drag_bunting_ability",
    },
    {
      Header: "Hitting Durability",
      accessor: "hitting_durability",
    },
    {
      Header: "Overall Batting",
      accessor: "playerprofileadvanced.overall_bat",
      description: "How much of this cards True Overall at their primary position is driven by their batting attributes.",
      show: false,
    },
    {
      Header: "Fielding",
      accessor: "fielding_ability",
    },
    {
      Header: "Arm Strength",
      accessor: "arm_strength",
    },
    {
      Header: "Arm Accuracy",
      accessor: "arm_accuracy",
    },
    {
      Header: "Reaction",
      accessor: "reaction_time",
    },
    {
      Header: "Blocking",
      accessor: "blocking",
    },
    {
      Header: "Overall Fielding",
      accessor: "playerprofileadvanced.overall_fielding",
      description: "How much of this cards True Overall at their primary position is driven by their fielding attributes.",
      show: false,
    },
    {
      Header: "Speed",
      accessor: "speed",
    },
    {
      Header: "Steal",
      accessor: "baserunning_ability",
    },
    {
      Header: "Baserunning Aggression",
      accessor: "baserunning_aggression",
    },
    {
      Header: "Overall Running",
      accessor: "playerprofileadvanced.overall_running",
      description: "How much of this cards True Overall at their primary position is driven by their running attributes.",
      show: false,
    },
    {
      Header: "Stamina",
      accessor: "stamina",
    },
    {
      Header: "Pitching Clutch",
      accessor: "pitching_clutch",
    },
    {
      Header: "Overall Stam/Cltch",
      accessor: "playerprofileadvanced.overall_stamina_clutch",
      description: "How much of this cards True Overall at their primary position is driven by their stamina and clutch attributes.",
      show: false,
    },
    {
      Header: "Pitching Durability",
      accessor: "pitching_durability",
    },
    {
      Header: "H/9",
      accessor: "hits_per_bf",
    },
    {
      Header: "K/9",
      accessor: "k_per_bf",
    },
    {
      Header: "BB/9",
      accessor: "bb_per_bf",
    },
    {
      Header: "HR/9",
      accessor: "hr_per_bf",
    },
    {
      Header: "Overall Per/9s",
      accessor: "playerprofileadvanced.overall_per_9s",
      description: "How much of this cards True Overall at their primary position is driven by their Per 9 attributes.",
      show: false,
    },
    {
      Header: "Velocity",
      accessor: "pitch_velocity",
    },
    {
      Header: "Control",
      accessor: "pitch_control",
    },
    {
      Header: "Break",
      accessor: "pitch_movement",
    },
    {
      Header: "Overall Stuff",
      accessor: "playerprofileadvanced.overall_stuff",
      description: "How much of this cards True Overall at their primary position is driven by their velocity, control, and break attributes.",
      show: false,
    },
    {
      Header: "Velo Diff",
      accessor: "playerprofileadvanced.velocity_diff",
      description: "The difference betwen a pitchers fastest pitch and their slowest pitch.",
      show: false,
    },
    {
      Header: "Pitches",
      accessor: "pitches",
      Cell: ({ value }) => {
        if (value) {
          return value.join(", ")
        } else {
          return ""
        }
      },
    },
    {
      Header: "Pitch 1",
      accessor: "pitch_1",
    },
    {
      Header: "Pitch 1 Speed",
      accessor: "pitch_1_speed",
    },
    {
      Header: "Pitch 1 Control",
      accessor: "pitch_1_control",
    },
    {
      Header: "Pitch 1 Break",
      accessor: "pitch_1_movement",
    },
    {
      Header: "Pitch 2",
      accessor: "pitch_2",
    },
    {
      Header: "Pitch 2 Speed",
      accessor: "pitch_2_speed",
    },
    {
      Header: "Pitch 2 Control",
      accessor: "pitch_2_control",
    },
    {
      Header: "Pitch 2 Break",
      accessor: "pitch_2_movement",
    },
    {
      Header: "Pitch 3",
      accessor: "pitch_3",
    },
    {
      Header: "Pitch 3 Speed",
      accessor: "pitch_3_speed",
    },
    {
      Header: "Pitch 3 Control",
      accessor: "pitch_3_control",
    },
    {
      Header: "Pitch 3 Break",
      accessor: "pitch_3_movement",
    },
    {
      Header: "Pitch 4",
      accessor: "pitch_4",
    },
    {
      Header: "Pitch 4 Speed",
      accessor: "pitch_4_speed",
    },
    {
      Header: "Pitch 4 Control",
      accessor: "pitch_4_control",
    },
    {
      Header: "Pitch 4 Break",
      accessor: "pitch_4_movement",
    },
    {
      Header: "Pitch 5",
      accessor: "pitch_5",
    },
    {
      Header: "Pitch 5 Speed",
      accessor: "pitch_5_speed",
    },
    {
      Header: "Pitch 5 Control",
      accessor: "pitch_5_control",
    },
    {
      Header: "Pitch 5 Break",
      accessor: "pitch_5_movement",
    },
    {
      Header: "Quirks",
      accessor: "quirks",
      Cell: ({ value }) => value.join(", "),
    },
    {
      Header: "View on TheShow.com",
      accessor: "tsn_link",
      Cell: ({ value }) => {
        if (value) {
          return (
            <Link href={value} target="/blank">
              <Button size="xs" variant="filled" color="primary">
                Open Card
              </Button>
            </Link>
          )
        } else {
          return ""
        }
      },
    },
  ]

  return cols.map(col => ({ ...col, id: col.accessor }))
}
