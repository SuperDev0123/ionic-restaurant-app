// import Chip from "@mui/material/Chip"
import useAuth from "@useAuth"
// import PageHeader from "@components/PageHeader/PageHeader"
import React, { useState } from "react"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import axios from "axios"
import { spacing, styled } from "@mui/system"
import Button from "@components/Buttons/Button"
import qs from "qs"

import {
  Card as MuiCard,
  // CardContent,
  Typography as MuiTypography,
} from "@mui/material"
import SectionHeader from "@components/Typography/SectionHeader"

const Card = styled(MuiCard)(spacing)
const Spacer = styled("div")(spacing)
const Typography = styled(MuiTypography)(spacing)

const StatRow = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const StatBox = styled("div")`
  min-width: 70px;
  font-weight: bold;
  color: #fff;
  background: #c90000;
  text-align: center;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
`

const TrueOverallPageContent = () => {
  const { currentUserIsGoldPlus } = useAuth()

  const positions = [
    "SP",
    "RP",
    "CP",
    "C",
    "1B",
    "2B",
    "3B",
    "SS",
    "LF",
    "CF",
    "RF",
  ]
  const [basePosition, setBasePosition] = useState("SP")
  const [trueOverall, setTrueOverall] = useState(0)

  const [baseStats, setBaseStats] = useState({
    // overall: 0,
    display_position: "SP",
    stamina: 0,
    pitching_clutch: 0,
    hits_per_bf: 0,
    k_per_bf: 0,
    bb_per_bf: 0,
    hr_per_bf: 0,
    pitch_control: 0,
    pitch_velocity: 0,
    pitch_movement: 0,
    pitching_durability: 0,
    contact_right: 0,
    contact_left: 0,
    power_right: 0,
    power_left: 0,
    plate_vision: 0,
    plate_discipline: 0,
    batting_clutch: 0,
    bunting_ability: 0,
    drag_bunting_ability: 0,
    hitting_durability: 0,
    fielding_ability: 0,
    arm_strength: 0,
    arm_accuracy: 0,
    reaction_time: 0,
    blocking: 0,
    speed: 0,
    baserunning_ability: 0,
    baserunning_aggression: 0,
  })

  const formatTitle = key => {
    if (key.search("per_bf") > -1) {
      var split = key.split("_")
      return split[0].toUpperCase() + " Per 9"
    } else {
      return key.replace(/(_)/g, " ").replace(/\b(\w)/g, s => s.toUpperCase())
    }
  }

  const submitStatsToApi = () => {
    axios
      .post("https://api.showzone.io/api/generate-true-overall", baseStats)
      .then(results => {
        setTrueOverall(results.data["True Overall Rating"])
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  const changeStats = (key, ev) => {
    if (isNaN(ev.target.value)) {
      // to account for display_position
      baseStats[key] = ev.target.value
      setBasePosition(ev.target.value)
    } else {
      baseStats[key] = parseInt(ev.target.value)
    }
    setBaseStats(baseStats)
  }

  const sendToCardBuilder = () => {
    baseStats.position = basePosition
    var query = qs.stringify(baseStats, { addQueryPrefix: true })
    window.location.replace("/card-builder" + query)
  }

  return (
    <>
      <Typography style={{fontSize: "2rem", textTransform: "uppercase", fontWeight: "bold", color: "#ed2024", marginTop: "2rem", marginBottom: 0, lineHeight: 1}}>The True Overall™ is:</Typography>
      <Typography style={{fontSize: "6rem", textTransform: "uppercase", fontWeight: "bold", margin: 0, lineHeight: 1, marginBottom: "2rem"}}>{parseFloat(trueOverall).toFixed(2)}</Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        {Object.keys(baseStats).map(key => {
          if (key === "display_position") {
            return (
              <FormControl key={key} sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Position
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={basePosition}
                  label="Position"
                  onChange={ev => changeStats(key, ev)}
                  style={{ marginBottom: "1rem" }}
                >
                  {positions.map(position => {
                    return (
                      <MenuItem key={position} value={position}>
                        {position}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            )
          } else {
            return (
              <>
                <TextField
                  id="outlined-required"
                  label={formatTitle(key)}
                  onChange={ev => changeStats(key, ev)}
                  defaultValue={baseStats[key]}
                  style={{ marginBottom: "1rem" }}
                />
              </>
            )
          }
        })}
      </Box>
      <Button
        style={{ marginTop: "1rem", marginRight: ".5rem" }}
        variant="filled"
        onClick={() => {
          submitStatsToApi()
        }}
      >
        Generate True Overall
      </Button>
      <Button
        style={{ marginTop: "1rem" }}
        color="secondary"
        onClick={() => {
          sendToCardBuilder()
        }}
      >
        Send Data to Card Builder
      </Button>
    </>
  )
}

export default TrueOverallPageContent
