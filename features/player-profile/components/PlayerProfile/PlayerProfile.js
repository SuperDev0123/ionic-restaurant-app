import { React, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Select, MenuItem } from "@mui/material"
import { spacing, styled } from "@mui/system"
import Typography from "@mui/material/Typography"
import MuiGrid from "@mui/material/Grid"
import PlayerDetails from "./PlayerDetails"
import PlayerAbout from "./PlayerAbout"
import PlayerQuirks from "./PlayerQuirks"
import PitchingAttributes from "./PitchingAttributes"
import PitchAttributes from "./PitchAttributes"
import HittingAttributes from "./HittingAttributes"
import FieldingAttributes from "./FieldingAttributes"
import RunningAttributes from "./RunningAttributes"
import TrueOverallAttributes from "./TrueOverallAttributes"
import MarketData from "./MarketData"
import MuiDivider from "@mui/material/Divider"
import HyvorTalkEmbed from "@components/HyvorTalkEmbed"
import AdBlock from "@components/AdBlock"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import SidebarGeneric from "@components/SidebarGeneric"
import InputLabel from "@mui/material/InputLabel"
import MuiButton from "@mui/material/Button"

import Menu from '@mui/material/Menu'
import Link from '@mui/material/Link'
import axios from "axios"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import qs from "qs"

const Button = styled(MuiButton)(spacing)
const Grid = styled(MuiGrid)(spacing)
const Divider = styled(MuiDivider)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`

const Spacer = styled("div")(spacing)

const PlayerProfile = ({ player }) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [parallel, setParallel] = useState(0)

  const [displayShields, setDisplayShields] = useState(false)

  useEffect(() => {
    const queryString = window.location.search
    var urlParams = new URLSearchParams(queryString)
    urlParams.forEach(function (value, key) {
      if (key === "parallel") {
        setParallel(value)
      }
    })
  }, [])

  let [updatedPlayer, setUpdatedPlayer] = useState(player)
  let clonePlayer = JSON.parse(JSON.stringify(player))

  const handleParallel = ev => {
    updatedPlayer = clonePlayer
    setParallel(ev.target.value)
    Object.keys(updatedPlayer).map(key => {
      if (typeof updatedPlayer[key] == "number" && key !== "age") {
        if(key !== 'overall') {
          updatedPlayer[key] = updatedPlayer[key] + parseInt(ev.target.value)
        }
        if (
          key === "stamina" ||
          key === "pitching_clutch" ||
          key === "hits_per_bf" ||
          key === "k_per_bf" ||
          key === "bb_per_bf" ||
          key === "contact_right" ||
          key === "contact_left" ||
          key === "power_right" ||
          key === "power_left" ||
          key === "plate_vision" ||
          key === "plate_discipline" ||
          key === "batting_clutch"
        ) {
          if (updatedPlayer[key] > 125) {
            updatedPlayer[key] = 125
          }
        } else {
          if (updatedPlayer[key] > 99) {
            updatedPlayer[key] = 99
          }
        }
      }
    })

    submitStatsToApi(updatedPlayer)
    // call true overall api calculator

    setUpdatedPlayer(updatedPlayer)
    router.push(`/players/${router.query.cardId}?parallel=${ev.target.value}`)
  }

  const submitStatsToApi = player => {
    // TODO need to check for each position
    axios
      .post(
        "https://api.showzone.io/api/generate-true-overall",
        player
      )
      .then(results => {
        // setTrueOverall(results.data['True Overall Rating'])
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  const handleChangeShields = $event => {
    setDisplayShields($event.target.checked)
  }

  console.log('player', player)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={3} xl={3}>
        <Grid container spacing={{ xs: 6, lg: 0 }}>
            <Grid item xs={12} sm={6} lg={12}>
              <PlayerDetails player={updatedPlayer} />
            </Grid>
            <Grid item xs={12} sm={6} lg={12}>
              <div id="quirks"></div>
                 {player.quirks[0] ? <PlayerQuirks player={updatedPlayer} /> : ""}
            </Grid>
        </Grid>
        
        <AdBlock
          id="pw-player-bottom-sidebar"
          type="margin-bottom margin-top medium-rec"
        />
      </Grid>
      <Grid sx={{maxWidth:"100%", width: "calc(100% - 350px)"}} item xs>
      <Spacer mb={2} />
        <div id="attributes"></div>
        { player.game === 'MLB The Show 22' ? (<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-helper-label">
            Parallel Level
          </InputLabel>
          <Select
            native
            value={parallel}
            label="Parallel Level"
            onChange={handleParallel}
            sx={{marginRight: "1rem"}}
          >
            <option value={0}>Unparalleled</option>
            <option value={1}>Parallel I</option>
            <option value={2}>Parallel II</option>
            <option value={3}>Parallel III</option>
            <option value={4}>Parallel IV</option>
            <option value={5}>Parallel V</option>
          </Select>
        </FormControl>) : <></> }
        <FormControlLabel
            control={<Checkbox onChange={handleChangeShields} />}
            label="Show Attribute Shields"
          />
        <Spacer mb={2} />
        <TrueOverallAttributes player={updatedPlayer} parallel={parallel}  displayShields={displayShields} />
        {updatedPlayer.isPitcher ? (
          <PitchingAttributes player={updatedPlayer} parallel={parallel}   displayShields={displayShields}/>
        ) : (
          ""
        )}
        {updatedPlayer.hasPitches ? (
          <PitchAttributes player={updatedPlayer} parallel={parallel}  displayShields={displayShields} />
        ) : (
          ""
        )}
        <HittingAttributes player={updatedPlayer} parallel={parallel}  displayShields={displayShields} />
        {/* <AdBlock
            id="pw-player-profile-leaderboard"
            type="horizontal bottom-margin"
        /> */}
        <FieldingAttributes player={updatedPlayer} parallel={parallel}  displayShields={displayShields} />
        <RunningAttributes player={updatedPlayer} parallel={parallel}  displayShields={displayShields} />
        <div id="market"></div>
        {updatedPlayer?.marketlisting?.price_history ? (
          <MarketData player={updatedPlayer} />
        ) : (
          ""
        )}
        <Divider />
        
        <Typography component="h2" variant="h2">
          Reviews
        </Typography>
        <HyvorTalkEmbed notTeamBuilder={false}/>
        <div id="reviews"></div>
      </Grid>
      <SidebarGeneric />
    </Grid>
  )
}

export default PlayerProfile
