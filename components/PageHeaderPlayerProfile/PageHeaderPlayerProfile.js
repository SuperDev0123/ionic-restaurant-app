import React, { useEffect, useState } from "react"
import { styled, spacing } from "@mui/system"
import Typography from "@mui/material/Typography"
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import MuiDivider from "@mui/material/Divider"
import NavLink from "../OurNavLink"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import MuiAlert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { useRouter } from "next/router"
import Image from "next/image"
import gameImage18 from "../../public/images/game-logo-18.png"
import gameImage19 from "../../public/images/game-logo-19.png"
import gameImage20 from "../../public/images/game-logo-20.png"
import gameImage21 from "../../public/images/game-logo-21.png"
import gameImage22 from "../../public/images/game-logo-22.png"
import SectionHeader from "@components/Typography/SectionHeader"
import FollowButton from "../FollowButton/FollowButton"

import qs from "qs"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import StarIcon from "@mui/icons-material/Star"
import useAuth from "@useAuth"
import useNotifs from "../../features/notifications/contexts/useNotifs"

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)
const Divider = styled(MuiDivider)(spacing)
const Alert = styled(MuiAlert)`
  position: absolute;
  margin-top: 0.5rem;
  ${props => props.theme.breakpoints.up("md")} {
    right: 1rem;
    text-align: right;
  }
`
const Spacer = styled("div")(spacing)
const StatRow = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`
const StatBox = styled("div")`
  min-width: 70px;
  font-weight: bold;
  color: #fff;
  background: #252525;
  text-align: center;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  position: relative;

  &.parallel-1 {
    background: #385156;
    transition: 0.5s;
  }
  &.parallel-2 {
    background: #bc6432;
    transition: 0.5s;
  }
  &.parallel-3 {
    background: #392095;
    transition: 0.5s;
  }
  &.parallel-4 {
    background: #812019;
    transition: 0.5s;
  }
  &.parallel-5 {
    background: #286790;
    transition: 0.5s;
  }
`

const PageHeader = ({
  children,
  breadcrumbsItems = [],
  game,
  player,
  hideDivider = false,
}) => {
  const { asPath } = useRouter()
  const [value, setValue] = React.useState(0)
  const { currentUser, userLoaded } = useAuth()
  const { userFollows } = useNotifs()
  const [isFollowed, setIsFollowed] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    // if (newValue === 1) {
    // }
    // if (newValue === 1) {
    // }
    // if (newValue === 1) {
    // }
    // if (newValue === 1) {
    // }
    // if (newValue === 1) {
    // }
  }

  let gameImage
  if (game == "MLB The Show 21") {
    gameImage = gameImage21
  } else if (game == "MLB The Show 20") {
    gameImage = gameImage20
  } else if (game == "MLB The Show 19") {
    gameImage = gameImage19
  } else if (game == "MLB The Show 18") {
    gameImage = gameImage18
  } else if (game == "MLB The Show 22") {
    gameImage = gameImage22
  }

  useEffect(() => {
    // figure out if card is followed

    var find = userFollows.find(card => {
      return card.card_id === player.card_id
    })

    if (find) {
      setIsFollowed(true)
    }
  }, [userLoaded])

  const sendToCardBuilder = () => {
    var query = qs.stringify(player, { addQueryPrefix: true })
    window.open("/card-builder" + query)
  }

  const sendToPlayerCompare = () => {
    var query = qs.stringify(
      {
        players: player.card_id,
      },
      { addQueryPrefix: true }
    )
    window.open("/players/compare" + query)
  }

  const sendToTeamBuilder = () => {
    var query = null

    if (player.display_position === "SP") {
      var query = qs.stringify(
        {
          starter_1: player.card_id,
        },
        { addQueryPrefix: true }
      )
    }
    if (player.display_position === "RP") {
      var query = qs.stringify(
        {
          bullpen_1: player.card_id,
        },
        { addQueryPrefix: true }
      )
    }
    if (player.display_position === "CP") {
      var query = qs.stringify(
        {
          bullpen_1: player.card_id,
        },
        { addQueryPrefix: true }
      )
    }
    if (player.display_position === "C") {
      var query = qs.stringify(
        {
          catcher: player.card_id,
        },
        { addQueryPrefix: true }
      )
    }
    if (player.display_position === "1B") {
      var query = qs.stringify(
        {
          first_base: player.card_id,
        },
        { addQueryPrefix: true }
      )
    }
    if (player.display_position === "2B") {
      var query = qs.stringify(
        {
          second_base: player.card_id,
        },
        { addQueryPrefix: true }
      )
    }
    if (player.display_position === "SS") {
      var query = qs.stringify(
        {
          short_stop: player.card_id,
        },
        { addQueryPrefix: true }
      )
    }
    if (player.display_position === "3B") {
      var query = qs.stringify(
        {
          third_base: player.card_id,
        },
        { addQueryPrefix: true }
      )
    }
    if (player.display_position === "LF") {
      var query = qs.stringify(
        {
          left_field: player.card_id,
        },
        { addQueryPrefix: true }
      )
    }
    if (player.display_position === "CF") {
      var query = qs.stringify(
        {
          center_field: player.card_id,
        },
        { addQueryPrefix: true }
      )
    }
    if (player.display_position === "RF") {
      var query = qs.stringify(
        {
          right_field: player.card_id,
        },
        { addQueryPrefix: true }
      )
    }

    if (query) {
      window.open("/players/team-builder" + query)
    }
  }

  // const followThisCard = () => {
  //   if(isFollowed === false) {
  //     try {
  //       postUserCardFollow({
  //         userId: currentUser.uid,
  //         cardId: player.card_id
  //       })
  //       setIsFollowed(true)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   if(isFollowed === true) {
  //     try {
  //       deleteUserCardFollow({
  //         userId: currentUser.uid,
  //         cardId: player.card_id
  //       })
  //       setIsFollowed(false)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  // }

  return (
    <>
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item xs={12} sm={12} order={{ xs: 2, sm: 1 }}>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={11} order={{ xs: 2, sm: 1 }}>
              <SectionHeader
                smallText={player?.series ?? ""}
                title={player?.name ?? ""}
                breadcrumbsItems={[
                  { name: "Homeplate", href: "/" },
                  { name: "Players", href: "/players" },
                  { name: player?.name ?? ""}
                ]}
              />
              <StatRow>
                <StatBox>
                  <b>{player?.display_position ?? ""} </b>
                  {player?.display_secondary_positions.length > 0 ? (
                    <span style={{ color: "#999" }}>
                      | {player?.display_secondary_positions?.join(", ") ?? ""}
                    </span>
                  ) : (
                    <></>
                  )}
                </StatBox>

                <StatBox>
                  {player?.bat_hand ?? ""} / {player?.throw_hand ?? ""}
                </StatBox>

                <StatBox>{player?.team ?? ""}</StatBox>

              </StatRow>

              <FollowButton player={player} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={1}
              order={{ xs: 1, sm: 2 }}
              alignItems={"center"}
            >
              <Image src={gameImage} alt="MLB The Show Logo" />
            </Grid>
          </Grid>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Overview"
                onClick={() => (window.location.hash = "")}
              />
              <Tab
                label="Quirks"
                onClick={() => (window.location.hash = "quirks")}
              />
              <Tab
                label="Attributes"
                onClick={() => (window.location.hash = "attributes")}
              />
              {player?.marketlisting?.price_history ? (
                <Tab
                  label="Market"
                  onClick={() => (window.location.hash = "market")}
                />
              ) : (
                <></>
              )}
              <Tab
                label="Reviews"
                onClick={() => (window.location.hash = "reviews")}
              />
              <Tab label="Compare" onClick={() => sendToPlayerCompare()} />
              <Tab label="Card Builder" onClick={() => sendToCardBuilder()} />
              {/* <Tab label="Team Builder" onClick={() => sendToTeamBuilder()} /> */}
            </Tabs>
          </Box>
        </Grid>

        {/* <Grid item order={{ xs: 1, sm: 2 }}>
          
        </Grid> */}
      </Grid>
    </>
  )
}

export default PageHeader
