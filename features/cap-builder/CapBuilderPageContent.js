import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Button from "@components/Buttons/Button"
import axios from "axios"
import { spacing, styled } from "@mui/system"
import qs from "qs"
import Image from "next/image"
import _ from "lodash"
import MuiAccordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import {
  Card as MuiCard,
  CardContent,
  Typography as MuiTypography,
} from "@mui/material"

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

const CapBuilderPageContent = () => {
  const Accordion = styled(MuiAccordion)`
    border-top: 3px solid ${props => props.theme.palette.primary.main};
    margin-bottom: 1rem;
    padding: 0.5rem;
  `

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

  const [finalStats, setFinalStats] = useState({
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

  const pitchingStats = [
    "stamina",
    "pitching_clutch",
    "hits_per_bf",
    "k_per_bf",
    "bb_per_bf",
    "hr_per_bf",
    "pitch_control",
    "pitch_velocity",
    "pitch_movement",
    "pitching_durability",
  ]
  const battingStats = [
    "contact_right",
    "contact_left",
    "power_right",
    "power_left",
    "plate_vision",
    "plate_discipline",
    "batting_clutch",
    "bunting_ability",
    "drag_bunting_ability",
  ]
  const fieldingStats = [
    "fielding_ability",
    "arm_strength",
    "arm_accuracy",
    "reaction_time",
    "blocking",
  ]
  const runningStats = [
    "speed",
    "baserunning_ability",
    "baserunning_aggression",
  ]

  const [selectedArchetype, setSelectedArchetype] = useState(null)
  const archetypes = [
    null,
    "The Showboat",
    "The Duke",
    "The Anomaly",
    "The Dart",
    "The Tool Shed",
    "The Spoke",
  ]

  const archetypeValues = [
    {
      name: "The Showboat",
      contact_left: 5,
      contact_right: 5,
      power_left: 42,
      power_right: 42,
      plate_vision: 5,
      plate_discipline: 10,
      batting_clutch: 10,
      bunting_ability: 0,
      drag_bunting_ability: 0,
      hitting_durability: 40,
      fielding_ability: 35,
      arm_strength: 42,
      arm_accuracy: 35,
      reaction_time: 35,
      blocking: 35,
      speed: 10,
      baserunning_ability: 10,
      baserunning_aggression: 10,
    },
    {
      name: "The Duke",
      contact_left: 35,
      contact_right: 35,
      power_left: 42,
      power_right: 42,
      plate_vision: 35,
      plate_discipline: 10,
      batting_clutch: 10,
      bunting_ability: 10,
      drag_bunting_ability: 10,
      hitting_durability: 40,
      fielding_ability: 5,
      arm_strength: 42,
      arm_accuracy: 5,
      reaction_time: 5,
      blocking: 5,
      speed: 5,
      baserunning_ability: 5,
      baserunning_aggression: 5,
    },
    {
      name: "The Anomaly",
      contact_left: 10,
      contact_right: 10,
      power_left: 42,
      power_right: 42,
      plate_vision: 10,
      plate_discipline: 10,
      batting_clutch: 10,
      bunting_ability: 10,
      drag_bunting_ability: 10,
      hitting_durability: 40,
      fielding_ability: 15,
      arm_strength: 42,
      arm_accuracy: 15,
      reaction_time: 20,
      blocking: 15,
      speed: 37,
      baserunning_ability: 37,
      baserunning_aggression: 37,
    },
    {
      name: "The Dart",
      contact_left: 45,
      contact_right: 45,
      power_left: 5,
      power_right: 5,
      plate_vision: 45,
      plate_discipline: 20,
      batting_clutch: 10,
      bunting_ability: 20,
      drag_bunting_ability: 20,
      hitting_durability: 40,
      fielding_ability: 38,
      arm_strength: 10,
      arm_accuracy: 38,
      reaction_time: 38,
      blocking: 38,
      speed: 15,
      baserunning_ability: 15,
      baserunning_aggression: 15,
    },
    {
      name: "The Tool Shed",
      contact_left: 42,
      contact_right: 42,
      power_left: 32,
      power_right: 32,
      plate_vision: 42,
      plate_discipline: 15,
      batting_clutch: 15,
      bunting_ability: 15,
      drag_bunting_ability: 15,
      hitting_durability: 40,
      fielding_ability: 15,
      arm_strength: 32,
      arm_accuracy: 15,
      reaction_time: 10,
      blocking: 15,
      speed: 10,
      baserunning_ability: 10,
      baserunning_aggression: 10,
    },
    {
      name: "The Spoke",
      contact_left: 45,
      contact_right: 45,
      power_left: 10,
      power_right: 10,
      plate_vision: 45,
      plate_discipline: 20,
      batting_clutch: 20,
      bunting_ability: 45,
      drag_bunting_ability: 45,
      hitting_durability: 40,
      fielding_ability: 15,
      arm_strength: 15,
      arm_accuracy: 15,
      reaction_time: 20,
      blocking: 15,
      speed: 36,
      baserunning_ability: 36,
      baserunning_aggression: 36,
    },
  ]

  let fetchData = async () => {
    let equipmentResults = await axios.get(
      `https://api.showzone.io/api/non-player-profiles?item_type=Equipment&page_size=1000`
    )
    setEquipment(equipmentResults.data.results)

    let perkResults = await axios.get(
      `https://api.showzone.io/api/non-player-profiles?item_type=Perk&page_size=1000`
    )
    console.log("perkResults", perkResults.data.results)

    var sortedPerks = _.orderBy(perkResults.data.results, "name", "asc")
    setPerks(sortedPerks)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [perks, setPerks] = useState([])
  const [equipment, setEquipment] = useState([])

  const equipmentSlots = [
    "Eyewear",
    "Compression Sleeve",
    "Ritual",
    "Wrist Guard",
    "Batting Gloves",
    "Bat Grips",
    "Bat",
    "Socks",
    "Cleats",
    "Shin Guard",
    "Leg Guards",
    "Fielding Glove",
    "Elbow Guard",
    "Chest Protector",
    "Catcher Masks",
  ]

  const equipmentSelected = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]
  const perkSlots = [null, null, null, null]
  const perksSelected = []

  const formatTitle = key => {
    if (key.search("per_bf") > -1) {
      var split = key.split("_")
      return split[0].toUpperCase() + " Per 9"
    } else {
      return key.replace(/(_)/g, " ").replace(/\b(\w)/g, s => s.toUpperCase())
    }
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

  const changeArchetype = ev => {
    setSelectedArchetype(ev.target.value)
  }

  const submitStatsToApi = () => {
    // add the archetype bonuses
    var archetype_totals = archetypeValues.find(archetype => {
      return archetype.name === selectedArchetype
    })

    if (archetype_totals) {
      Object.keys(finalStats).map(stat => {
        // console.log('stat', stat, archetype_totals[stat], baseStats[stat])
        if (archetype_totals[stat]) {
          return (finalStats[stat] =
            parseInt(baseStats[stat]) + parseInt(archetype_totals[stat]))
        } else {
          return (finalStats[stat] = parseInt(baseStats[stat]))
        }
      })
      // add the perk bonuses
      Object.values(perksSelected).map(piece => {
        if (piece) {
          var item = perks.find(item => {
            return item.card_id === piece
          })

          Object.keys(finalStats).map(stat => {
            if (item[stat]) {
              return (finalStats[stat] =
                parseInt(finalStats[stat]) + parseInt(item[stat]))
            }
          })
        }
      })

      // add the equipment bonuses

      Object.values(equipmentSelected).map(piece => {
        if (piece) {
          var item = equipment.find(item => {
            return item.card_id === piece
          })

          Object.keys(finalStats).map(stat => {
            if (item[stat]) {
              return (finalStats[stat] =
                parseInt(finalStats[stat]) + parseInt(item[stat]))
            }
          })
        }
      })

      // make sure nothing is over 125 or 99
      Object.keys(finalStats).map(stat => {
        if (
          stat === "stamina" ||
          stat === "pitching_clutch" ||
          stat === "hits_per_bf" ||
          stat === "k_per_bf" ||
          stat === "bb_per_bf" ||
          stat === "contact_right" ||
          stat === "contact_left" ||
          stat === "power_right" ||
          stat === "power_left" ||
          stat === "plate_vision" ||
          stat === "plate_discipline"
        ) {
          if (finalStats[stat] > 125) {
            finalStats[stat] = 125
          }
        } else {
          if (finalStats[stat] > 99) {
            finalStats[stat] = 99
          }
        }
      })
      // then it spits it all out at once
      finalStats.display_position = basePosition

      axios
        .post("https://api.showzone.io/api/generate-true-overall", finalStats)
        .then(results => {
          setTrueOverall(results.data["True Overall Rating"])
        })
        .catch(err => {
          console.log("err", err)
        })
    }
  }

  const sendToCardBuilder = () => {
    finalStats.position = basePosition
    var query = qs.stringify(finalStats, { addQueryPrefix: true })
    window.location.replace("/card-builder" + query)
  }

  const displaySpecificStats = type => {
    return finalStats.filter(stat => {
      return type === stat.type
    })
  }

  const filteredEquipment = type => {
    return equipment.filter(piece => {
      return piece.slot === type
    })
  }

  const updateSelectedEquipment = (key, ev) => {
    equipmentSelected[key] = ev.target.value
  }

  const updateSelectedPerk = (key, ev) => {
    perksSelected[key] = ev.target.value
  }

  return (
    <>
      <Typography
        variant="h2"
        style={{ marginTop: "2rem", marginBottom: "1rem" }}
      >
        Your Calculated Attributes
      </Typography>
      <StatRow>
        <StatBox>
          <Typography className="stat-title" component="p">
            True Overall
          </Typography>
          <Typography variant="h6" component="p">
            {parseInt(trueOverall).toFixed(2)}
          </Typography>
        </StatBox>
        {pitchingStats.map(value => {
          return (
            <StatBox key={formatTitle(value)}>
              <Typography className="stat-title" component="p">
                {formatTitle(value)}
              </Typography>
              <Typography variant="h6" component="p">
                {finalStats[value]}
              </Typography>
            </StatBox>
          )
        })}
        {battingStats.map(value => {
          return (
            <StatBox key={formatTitle(value)}>
              <Typography className="stat-title" component="p">
                {formatTitle(value)}
              </Typography>
              <Typography variant="h6" component="p">
                {finalStats[value]}
              </Typography>
            </StatBox>
          )
        })}
        {fieldingStats.map(value => {
          return (
            <StatBox key={formatTitle(value)}>
              <Typography className="stat-title" component="p">
                {formatTitle(value)}
              </Typography>
              <Typography variant="h6" component="p">
                {finalStats[value]}
              </Typography>
            </StatBox>
          )
        })}
        {runningStats.map(value => {
          return (
            <StatBox key={formatTitle(value)}>
              <Typography className="stat-title" component="p">
                {formatTitle(value)}
              </Typography>
              <Typography variant="h6" component="p">
                {finalStats[value]}
              </Typography>
            </StatBox>
          )
        })}
      </StatRow>
      <Typography
        variant="h2"
        style={{ marginTop: "2rem", marginBottom: "1rem" }}
      >
        Enter Your Base Stats
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>How to Get Your Base Stats</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>1. Create a new loadout</Typography>
          <Typography paragraph>
            2. Don&apos;t add any archetypes, perks, or equipment to your CAP
          </Typography>
          <Typography paragraph>
            3. Go to the circle to the top-right of the archetype selection area
            that has the overall rating and position label (example: 47 OVR C)
            and press select.
          </Typography>
          <Typography paragraph>
            4. The attributes shown there are your base attributes. Press square
            (on playstation) to toggle to the hitting/pitching attributes
            respectively.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        {Object.keys(baseStats).map(key => {
          if (key === "display_position") {
            return (
              <FormControl sx={{ m: 1, minWidth: 120 }}>
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
      <Typography
        variant="h2"
        style={{ marginTop: "2rem", marginBottom: "1rem" }}
      >
        Enter Your Chosen Archetype
      </Typography>
      {/* Select to choose the archetype */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Archetype</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedArchetype}
          label="Archetype"
          onChange={ev => changeArchetype(ev)}
        >
          {archetypes.map(archetype => {
            return (
              <MenuItem key={archetype} value={archetype}>
                {archetype}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>

      <Typography
        variant="h2"
        style={{ marginTop: "2rem", marginBottom: "1rem" }}
      >
        Select Your Perks
      </Typography>
      {perkSlots.map((equipment, key) => {
        return (
          <FormControl key={key} sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Perk</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Perk"
              onChange={ev => updateSelectedPerk(key, ev)}
            >
              {perks.map(piece => {
                var image = (
                  <Image
                    src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-diamond.png"
                    width={10}
                    height={10}
                    style={{ maxWidth: 10, marginRight: 10 }}
                    alt="Shield Diamond"
                  />
                )

                if (piece.rarity === "Gold") {
                  image = (
                    <Image
                      src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-gold.png"
                      width={10}
                      height={10}
                      style={{ maxWidth: 10, marginRight: 10 }}
                      alt="Shield Gold"
                    />
                  )
                }
                if (piece.rarity === "Silver") {
                  image = (
                    <Image
                      src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-silver.png"
                      width={10}
                      height={10}
                      style={{ maxWidth: 10, marginRight: 10 }}
                      alt="Shield Silver"
                    />
                  )
                }
                if (piece.rarity === "Bronze") {
                  image = (
                    <Image
                      src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-bronze.png"
                      width={10}
                      height={10}
                      style={{ maxWidth: 10, marginRight: 10 }}
                      alt="Shield Bronze"
                    />
                  )
                }
                return (
                  <MenuItem key={piece.card_id} value={piece.card_id}>
                    {image}&nbsp;&nbsp;&nbsp;{piece.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        )
      })}

      <Typography
        variant="h2"
        style={{ marginTop: "2rem", marginBottom: "1rem" }}
      >
        Select Your Equipment
      </Typography>
      {equipmentSlots.map((equipment, key) => {
        return (
          <FormControl key={key} sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-helper-label">
              {equipment}
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label={equipment}
              onChange={ev => updateSelectedEquipment(key, ev)}
            >
              {filteredEquipment(equipment).map(piece => {
                var image = (
                  <Image
                    src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-diamond.png"
                    width={10}
                    height={10}
                    style={{ maxWidth: 10, marginRight: 10 }}
                    alt="Shield Diamond"
                  />
                )

                if (piece.rarity === "Gold") {
                  image = (
                    <Image
                      src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-gold.png"
                      width={10}
                      height={10}
                      style={{ maxWidth: 10, marginRight: 10 }}
                      alt="Shield Gold"
                    />
                  )
                }
                if (piece.rarity === "Silver") {
                  image = (
                    <Image
                      src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-silver.png"
                      width={10}
                      height={10}
                      style={{ maxWidth: 10, marginRight: 10 }}
                      alt="Shield Silver"
                    />
                  )
                }
                if (piece.rarity === "Bronze") {
                  image = (
                    <Image
                      src="https://storage.googleapis.com/showzone-cloud/assets/icons/shield-bronze.png"
                      width={10}
                      height={10}
                      style={{ maxWidth: 10, marginRight: 10 }}
                      alt="Shield Bronze"
                    />
                  )
                }
                return (
                  <MenuItem key={piece.card_id} value={piece.card_id}>
                    {image}&nbsp;&nbsp;&nbsp;{piece.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        )
      })}
      <br />
      <br />

      <Button
        variant="filled"
        style={{ marginRight: ".5rem" }}
        onClick={() => {
          submitStatsToApi()
        }}
      >
        Calculate Attributes
      </Button>
      <Button
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

export default CapBuilderPageContent
