import { React, useEffect, useState } from "react"
import { spacing, styled } from "@mui/system"
import Link from "@components/OurLink"
import {
  Box,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Menu,
  MenuItem,
  Typography as MuiTypography,
} from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

import qs from "qs"
import PlayerCard from "@components/PlayerCard"

const Button = styled(MuiButton)(spacing)

const Card = styled(MuiCard)(spacing)

const Spacer = styled("div")(spacing)

const Typography = styled(MuiTypography)(spacing)

const Centered = styled("div")`
  text-align: center;
`

const PlayerDetails = props => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  let isCurrentGame = false
  if (props.player.game == "MLB The Show 22") {
    isCurrentGame = true
  }
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const sendToCardBuilder = () => {
    var player = props.player
    var query = qs.stringify(player, { addQueryPrefix: true })
    window.location.replace("/card-builder" + query)
  }

  const sendToPlayerCompare = () => {
    var player = props.player
    var query = qs.stringify(
      {
        players: player.card_id,
      },
      { addQueryPrefix: true }
    )
    window.location.replace("/players/compare" + query)
  }

  const sendToTeamBuilder = () => {
    var player = props.player

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
      window.location.replace("/players/team-builder" + query)
    }
  }

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Card Details
        </Typography>

        <Spacer mb={4} />

        <Centered>
          <PlayerCard
            data={props.player}
            width={210}
            showViewButton={false}
            style={{ margin: "0.7rem auto" }}
          />

          <Typography variant="body2" component="div" gutterBottom>
            <Box fontWeight="fontWeightMedium">{props.player?.name ?? ""}</Box>
            <Box fontWeight="fontWeightRegular">
              {props.player?.height ?? ""} | {props.player?.weight ?? ""}
            </Box>
            <Box fontWeight="fontWeightRegular">{props.player?.born ?? ""}</Box>
            {isCurrentGame ? (
              <Button
                href={`https://mlb22.theshow.com/items/${props.player?.card_id}`}
                target="_blank"
                sx={{ marginTop: "1rem" }}
                variant="contained"
              >
                View on TheShow.com
              </Button>
            ) : (
              ""
            )}
          </Typography>
          {/* <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Card Options
          </Button> */}

          <Menu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {props.player?.tsn_link ? (
              <Link
                href={props.player?.tsn_link}
                alt={props.player?.name}
                target="_blank"
                component={MenuItem}
                sx={{ color: "#fff" }}
              >
                View on TheShow.com
              </Link>
            ) : (
              ""
            )}
            <MenuItem onClick={sendToCardBuilder} disableRipple>
              Open In Card Builder
            </MenuItem>
            <MenuItem onClick={sendToTeamBuilder} disableRipple>
              Build a Team Around this Card
            </MenuItem>
            <MenuItem onClick={sendToPlayerCompare} disableRipple>
              Compare to Other Cards
            </MenuItem>
          </Menu>
        </Centered>
      </CardContent>
    </Card>
  )
}
export default PlayerDetails
