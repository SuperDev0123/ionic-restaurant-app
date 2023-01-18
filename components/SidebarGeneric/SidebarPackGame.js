import React, { useState, useCallback, useEffect } from "react"
import { Grid as MuiGrid } from "@mui/material"
import CardTop from "@components/Typography/CardTop"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import Link from "@mui/material/Link"
import Button from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import { CardActionArea } from "@mui/material"
import AdBlock from "../AdBlock"
import RevueSignUp from "../Widgets/NewsletterSignUp"
import { styled, spacing } from "@mui/system"
import FlippingPlayers from "../Widgets/FlippingPlayers"
import WidgetCollections from "../../features/home-page/components/WidgetCollections/WidgetCollections"
import useAuth from "@useAuth"
import axios from "axios"
import InfoIcon from "@mui/icons-material/Info"
import Tooltip from "@mui/material/Tooltip"

const Grid = styled(MuiGrid)`
  ${props => props.theme.breakpoints.up("lg")} {
    max-width: 350px;
    min-width: 350px;
    width: 350px;
  }
`

const ActiveBonusGrid = styled(MuiGrid)`
  padding: 0.5rem;
  opacity: 0.5;
  .bonus {
    font-weight: bold;
  }
  &.is-active-bonus {
    font-weight: bold;
    background: #ed2024;
    opacity: 1;
  }
  &.inactive-bonus {
    color: #aaa;
  }
`

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const checkIfAllCardsFlipped = props => {
  console.log("packIsFlipped", props.packIsFlipped)
  for (const item of props.packIsFlipped) {
    if (item === false) {
      return false
    }
  }

  if (props.rerollCount !== 0) {
    return false
  }

  return true
}

const checkIfActiveBonus = (props, multiplier) => {
  for (const item of props.packIsFlipped) {
    if (item === false) {
      return null
    }
  }

  if (props.packBonuses) {
    if (parseInt(props.packBonuses[multiplier.variableName]) > 0) {
      return "is-active-bonus"
    }
  }
  return "inactive-bonus"
}

function GenericSidebar(props) {
  const [value, setValue] = React.useState(0)
  const [leaderboard, setLeaderboard] = React.useState([])

  useEffect(() => {
    // const item = localStorage.getItem('sidebarHidden')
    // console.log('setSidebarHidden', item)
    // setSidebarHidden(item)
  }, [])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  let multipliers = [
    {
      name: "Major Collection",
      description: "Find Randy, Brett, McCutchen or Mickey reward cards",
      variableName: "pack_major_collection_bonus",
      multiplier: 10,
    },
    {
      name: "Sidekick",
      description: "Find Frank, Clemente or Jackie reward cards",
      variableName: "pack_sidekick_bonus",
      multiplier: 9,
    },
    {
      name: "Spiderman Meme",
      description: "Find 2 or more cards with the same name",
      variableName: "pack_spiderman_meme_bonus",
      multiplier: 9,
    },
    {
      name: "Cheesy",
      description: "Find 3 or more cards with 90+ bunting",
      variableName: "pack_cheesy_bonus",
      multiplier: 9,
    },
    {
      name: "Speed Kills",
      description: "Find 3 or more cards with 90+ speed",
      variableName: "pack_speed_kills_bonus",
      multiplier: 8,
    },
    {
      name: "Finish Strong",
      description: "Find 2 or more cards with 90+ overall RP/CP",
      variableName: "pack_finish_strong_bonus",
      multiplier: 8,
    },
    {
      name: "Defense Wins Championships",
      description: "Find 3 or more cards with 90+ fielding",
      variableName: "pack_defense_wins_championships_bonus",
      multiplier: 7,
    },
    {
      name: "Same Series",
      description:
        "Find 3 or more cards from the same series (excluding Live Series)",
      variableName: "pack_same_series_bonus",
      multiplier: 7,
    },
    {
      name: "Gone Fishin",
      description: "Find a card with a fish in their name",
      variableName: "pack_gone_fishin_bonus",
      multiplier: 6,
    },
    {
      name: "Full Rotation",
      description: "Find 5 or more starting pitchers",
      variableName: "pack_full_rotation_bonus",
      multiplier: 5,
    },
    {
      name: "Teammates",
      description: "Find 3 or more cards from the same team",
      variableName: "pack_teammates_bonus",
      multiplier: 4,
    },
    {
      name: "1-2 Punch",
      description: "Find 2 or more 90+ overall SP",
      variableName: "pack12_punch_bonus",
      multiplier: 3,
    },
    {
      name: "Innings Eater",
      description: "Find exactly 1 SP",
      variableName: "pack_innings_eater_bonus",
      multiplier: 3,
    },
    {
      name: "Infinite Power",
      description: "Find 3 or more cards with 90+ power",
      variableName: "pack_infinite_power_bonus",
      multiplier: 3,
    },
    {
      name: "He Gets On Base",
      description: "Find 3 or more cards with 90+ contact",
      variableName: "pack_he_gets_on_base_bonus",
      multiplier: 3,
    },
    {
      name: "Homies",
      description: "Find 3 or more cards from the same country/state",
      variableName: "pack_homies_bonus",
      multiplier: 2,
    },
    {
      name: "Loaded",
      description: "Find 3 or more cards at same position",
      variableName: "pack_loaded_bonus",
      multiplier: 2,
    },
  ]

  const { currentUser, userLoaded } = useAuth()
  const seasonStartDate = "2022-10-01"
  const seasonEndDate = "2023-03-01"
  const leaderboardLoad = () => {
    axios
      .get(
        `https://api.showzone.io/api/pack-game-saved-packs/?date_after=${seasonStartDate}&date_before=${seasonEndDate}&order_by=dsc%20pack_score`
      )
      .then(results => {
        var data = results.data.results.slice(0, 5)
        setLeaderboard(data)
      })
  }

  const clickedBonus = item => {
    console.log("item", item)
    props.clickedBonus(item)
  }

  useEffect(() => {
    leaderboardLoad()
  }, [])

  return (
    <>
      {props.sidebarHidden === "true" ? (
        <></>
      ) : (
        <>
          <Grid item xs={12}>
            <AdBlock
              id="pw-sidebar-top"
              type="margin-bottom margin-top medium-rec"
            />
            <CardTop smallText="" text="Pack Bonuses" />
            <Card sx={{ marginBottom: "1rem" }}>
              <CardContent>
                {multipliers.map((multiplier, index) => {
                  return (
                    <MuiGrid
                      onClick={() => clickedBonus(multiplier)}
                      style={{ cursor: "pointer" }}
                      container
                      key={index}
                    >
                      <ActiveBonusGrid
                        xs={2}
                        item
                        className={
                          "bonus " + checkIfActiveBonus(props, multiplier)
                        }
                      >
                        <strong>+{multiplier.multiplier}x</strong>
                      </ActiveBonusGrid>
                      <ActiveBonusGrid
                        xs={10}
                        item
                        className={checkIfActiveBonus(props, multiplier)}
                      >
                        {multiplier.name}{" "}
                        <Tooltip
                          title={multiplier.description}
                          enterTouchDelay={0}
                        >
                          <InfoIcon fontSize="small" />
                        </Tooltip>
                      </ActiveBonusGrid>
                    </MuiGrid>
                  )
                })}
              </CardContent>
            </Card>
            <CardTop smallText="Season 3" text="Top Packs" />
            <Card>
              <CardContent>
                {leaderboard.map((player, index) => {
                  return (
                    <Box key={index} p={2} sx={{ display: "flex" }}>
                      <Box sx={{ marginRight: "1rem" }}>
                        <Typography variant="h3" component="p">
                          #{index + 1}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontWeight: "normal" }}
                          variant="h3"
                          component="p"
                        >
                          {parseInt(player.pack_score).toLocaleString("en-US")}
                        </Typography>
                        <Link href={`/pack-derby/${player.id}`}>
                          {player.user_name}
                        </Link>
                      </Box>
                    </Box>
                  )
                })}
                <Button href="/pack-derby/leaderboard">View Leaderboard</Button>
              </CardContent>
            </Card>
            <AdBlock
              id="pw-sidebar-bottom"
              type="margin-top margin-bottom medium-rec"
            />
          </Grid>
        </>
      )}
    </>
  )
}

export default GenericSidebar
