import React, { useEffect, useState } from "react"
import AttributeBar from "./AttributeBar"
import domtoimage from "dom-to-image"
import { saveAs } from "file-saver"
import Button from "@components/Buttons/Button"
import { styled, spacing } from "@mui/system"
var slugify = require("slugify")
import {
  Card,
  CardContent,
  FormHelperText,
  FormControlLabel,
  Switch,
  Paper,
  Box,
  Divider as MuiDivider,
  Grid,
  Typography as MuiTypography,
  Select,
  Input,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Tabs,
  Tab,
} from "@mui/material"
import TabPanel from "@mui/lab/TabPanel"
import TabContext from "@mui/lab/TabContext"

import useAuth from "@useAuth"

const shieldDiamond = "../../images/shield-diamond.png"
const shieldGold = "../../images/shield-gold.png"
const shieldSilver = "../../images/shield-silver.png"
const shieldBronze = "../../images/shield-bronze.png"
const shieldCommon = "../../images/shield-common.png"
const frameLiveSeries = "../../images/frame-live-series.png"
const framePrime = "../../images/frame-prime.png"
const frameAllStar = "../../images/frame-allstar.png"
const frameBreakout = "../../images/frame-breakout.png"
const framePostseason = "../../images/frame-postseason.png"
const frameRookie = "../../images/frame-rookie.png"
const frameVeteran = "../../images/frame-veteran.png"
const frameSecondHalf = "../../images/frame-second-half.png"
const batterPreview = "../../images/card-builder-batter.jpg"
const pitcherPreview = "../../images/card-builder-pitcher.jpg"

const Typography = styled(MuiTypography)(spacing)
const Divider = styled(MuiDivider)(spacing)

const CardBuilder = () => {
  const { currentUserIsDiamondPlus } = useAuth()
  const [isPitcher, setIsPitcher] = useState(false)
  const [cardType, setCardType] = useState("batter")
  const [displayCardRating, setDisplayCardRating] = useState(true)
  const [customData, setCustomData] = useState([])
  const [cardImage, setCardImage] = useState()

  const [team, setTeam] = useState(null)
  const [pitch1, setPitch1] = useState(null)
  const [pitch2, setPitch2] = useState(null)
  const [pitch3, setPitch3] = useState(null)
  const [pitch4, setPitch4] = useState(null)
  const [pitch5, setPitch5] = useState(null)
  const [position, setPosition] = useState(null)
  const [bats, setBats] = useState(null)
  const [throws, setThrows] = useState(null)
  const [cardSeries, setCardSeries] = useState(null)
  const [tab, setTab] = React.useState("1")

  const handleChange = (event, newValue) => {
    setTab(newValue)
  }
  // check params
  useEffect(() => {
    const queryString = window.location.search
    var urlParams = new URLSearchParams(queryString)

    urlParams.forEach(function (value, key) {
      // last thing to do - share to card builder
      if (key === "team") {
        setTeam(value)
      }
      if (key === "jersey_number") {
        key = "number"
      }
      if (key === "pitch_1") {
        key = "pitch1"
        setPitch1(value)
      }
      if (key === "pitch_2") {
        key = "pitch2"
        setPitch2(value)
      }
      if (key === "pitch_3") {
        key = "pitch3"
        setPitch3(value)
      }
      if (key === "pitch_4") {
        key = "pitch4"
        setPitch4(value)
      }
      if (key === "pitch_5") {
        key = "pitch5"
        setPitch5(value)
      }

      if (key === "display_secondary_positions_string") {
        key = "secondaryPosition"
      }
      if (key === "pitch_1_speed") {
        key = "pitch1Speed"
      }
      if (key === "pitch_2_speed") {
        key = "pitch2Speed"
      }
      if (key === "pitch_3_speed") {
        key = "pitch3Speed"
      }
      if (key === "pitch_4_speed") {
        key = "pitch4Speed"
      }
      if (key === "pitch_5_speed") {
        key = "pitch5Speed"
      }
      if (key === "overall") {
        key = "overallRating"
      }
      if (key === "bat_hand") {
        key = "bats"
        setBats(value)
      }
      if (key === "throw_hand") {
        key = "throws"
        setThrows(value)
      }
      if (key === "series") {
        key = "cardSeries"
        value = slugify(value).toLowerCase()
        setCardSeries(value)
      }
      if (key === "hitting_rank") {
        key = "hittingShield"
        value = value.toLowerCase()
      }
      if (key === "fielding_rank") {
        key = "fieldingShield"
        value = value.toLowerCase()
      }
      if (key === "contact_right") {
        key = "contactR"
      }
      if (key === "contact_left") {
        key = "contactL"
      }
      if (key === "power_right") {
        key = "powerR"
      }
      if (key === "power_left") {
        key = "powerL"
      }
      if (key === "plate_vision") {
        key = "vision"
      }
      if (key === "plate_discipline") {
        key = "discipline"
      }
      if (key === "batting_clutch") {
        key = "clutch"
      }
      if (key === "bunting_ability") {
        key = "bunt"
      }
      if (key === "drag_bunting_ability") {
        key = "dragBunt"
      }
      if (key === "hitting_durability") {
        key = "durability"
      }
      if (key === "fielding_ability") {
        key = "fielding"
      }
      if (key === "arm_strength") {
        key = "arm"
      }
      if (key === "arm_accuracy") {
        key = "accuracy"
      }
      if (key === "reaction_time") {
        key = "reaction"
      }
      if (key === "baserunning_ability") {
        key = "steal"
      }
      if (key === "baserunning_aggression") {
        key = "brAgg"
      }
      if (key === "hits_per_bf") {
        key = "h9"
      }
      if (key === "k_per_bf") {
        key = "k9"
      }
      if (key === "bb_per_bf") {
        key = "bb9"
      }
      if (key === "hr_per_bf") {
        key = "hr9"
      }
      if (key === "pitching_clutch") {
        key = "pclt"
      }
      if (key === "pitch_control") {
        key = "control"
      }
      if (key === "pitch_velocity") {
        key = "velocity"
      }
      if (key === "pitch_movement") {
        key = "break"
      }
      if (key === "weight") {
        key = "weight"
        value = value.split(" ")[0]
      }

      if (key === "img") {
        setCardImage(value)
      }

      var event = {
        target: {
          name: key,
          value: value,
        },
      }

      updateCard(event)

      if (key === "display_position") {
        key = "cardType"
        if (value === "SP" || value === "RP" || value === "CP") {
          updateCard({
            target: {
              name: "cardType",
              value: "pitcher",
            },
          })
        } else {
          updateCard({
            target: {
              name: "cardType",
              value: "batter",
            },
          })
        }
        if (value === "SP") {
          updateCard({
            target: {
              name: "position",
              value: "Starting Pitcher",
            },
          })
        }
        if (value === "RP") {
          updateCard({
            target: {
              name: "position",
              value: "Relief Pitcher",
            },
          })
        }
        if (value === "CP") {
          updateCard({
            target: {
              name: "position",
              value: "Closing Pitcher",
            },
          })
        }
        if (value === "C") {
          updateCard({
            target: {
              name: "position",
              value: "Catcher",
            },
          })
        }
        if (value === "1B") {
          updateCard({
            target: {
              name: "position",
              value: "First Base",
            },
          })
        }
        if (value === "2B") {
          updateCard({
            target: {
              name: "position",
              value: "Second Base",
            },
          })
        }
        if (value === "SS") {
          updateCard({
            target: {
              name: "position",
              value: "Shortstop",
            },
          })
        }
        if (value === "3B") {
          updateCard({
            target: {
              name: "position",
              value: "Third Base",
            },
          })
        }
        if (value === "LF") {
          updateCard({
            target: {
              name: "position",
              value: "Left Field",
            },
          })
        }
        if (value === "CF") {
          updateCard({
            target: {
              name: "position",
              value: "Center Field",
            },
          })
        }
        if (value === "RF") {
          updateCard({
            target: {
              name: "position",
              value: "Right Field",
            },
          })
        }
      }

      if (key === "name") {
        var first_name = value.split(" ")[0]
        var last_name = value.split(" ")[1]
        updateCard({
          target: {
            name: "firstName",
            value: first_name,
          },
        })

        updateCard({
          target: {
            name: "lastName",
            value: last_name,
          },
        })
      }
    })
  }, [])

  const battingStats = [
    "contactR",
    "contactL",
    "powerR",
    "powerL",
    "vision",
    "discipline",
    "clutch",
    "bunt",
    "dragBunt",
    "durability",
  ]

  const fieldingStats = ["fielding", "arm", "accuracy", "reaction"]

  const baserunningStats = ["speed", "steal", "brAgg"]

  const pitchingStats = [
    "stamina",
    "h9",
    "k9",
    "bb9",
    "hr9",
    "pclt",
    "control",
    "velocity",
    "break",
  ]

  const updateCard = event => {
    const eventValue = event.target.value
    const eventName = event.target.name

    if (eventName === "position") {
      setPosition(eventValue)
    }
    if (eventName === "cardSeries") {
      setCardSeries(eventValue)
    }
    if (eventName === "pitch1") {
      setPitch1(eventValue)
    }
    if (eventName === "pitch2") {
      setPitch2(eventValue)
    }
    if (eventName === "pitch3") {
      setPitch3(eventValue)
    }
    if (eventName === "pitch4") {
      setPitch4(eventValue)
    }
    if (eventName === "pitch5") {
      setPitch5(eventValue)
    }
    if (eventName === "team") {
      setTeam(eventValue)
    }
    if (eventName === "cardType" && eventValue === "pitcher") {
      setIsPitcher(true)
      setCardType("pitcher")
    } else if (eventName === "cardType" && eventValue === "batter") {
      setIsPitcher(false)
      setCardType("batter")
    }

    setCustomData(prevState => ({
      ...prevState,
      [eventName]: eventValue,
    }))
  }

  const handleSwitchChange = event => {
    setDisplayCardRating(event.target.checked)
  }

  const updateCardImage = event => {
    setCardImage(URL.createObjectURL(event.target.files[0]))
  }

  const switchToShortName = pitch => {
    let shortName = "Didn't work"
    if (pitch == "4 Seam FB") {
      shortName = "4SFB"
    } else if (pitch == "2 Seam FB") {
      shortName = "2SFB"
    } else if (pitch == "12-6 Curve") {
      shortName = "12CV"
    } else if (pitch == "Changeup") {
      shortName = "CH"
    } else if (pitch == "Circle Change") {
      shortName = "CIR"
    } else if (pitch == "Curveball") {
      shortName = "CB"
    } else if (pitch == "2 Seam FB") {
      shortName = "2SFB"
    } else if (pitch == "Cutter") {
      shortName = "CUT"
    } else if (pitch == "Forkball") {
      shortName = "FRK"
    } else if (pitch == "Knuckleball") {
      shortName = "KN"
    } else if (pitch == "Knuckle-Curve") {
      shortName = "KNCV"
    } else if (pitch == "Palmball") {
      shortName = "PLM"
    } else if (pitch == "Running FB") {
      shortName = "RFB"
    } else if (pitch == "Screwball") {
      shortName = "SCR"
    } else if (pitch == "Sinker") {
      shortName = "SNK"
    } else if (pitch == "Slider") {
      shortName = "SL"
    } else if (pitch == "Slurve") {
      shortName = "SLV"
    } else if (pitch == "Spitball") {
      shortName = "SPIT"
    } else if (pitch == "Splitter") {
      shortName = "SPL"
    } else if (pitch == "Sweeping Curve") {
      shortName = "SCV"
    } else if (pitch == "Vulcanchange") {
      shortName = "VCH"
    }
    return shortName
  }

  const battingStatBars = battingStats.map(stat => {
    return (
      <AttributeBar
        statType="batting"
        attributeName={stat}
        stat={customData[stat]}
      />
    )
  })

  const fieldingStatBars = fieldingStats.map(stat => {
    return (
      <AttributeBar
        statType="fielding"
        attributeName={stat}
        stat={customData[stat]}
      />
    )
  })

  const baserunningStatBars = baserunningStats.map(stat => {
    return (
      <AttributeBar
        statType="baserunning"
        attributeName={stat}
        stat={customData[stat]}
      />
    )
  })

  const pitchingStatBars = pitchingStats.map(stat => {
    return (
      <AttributeBar
        statType="pitching"
        attributeName={stat}
        stat={customData[stat]}
      />
    )
  })

  const pitchStatBars = (
    <div className="pitchStats">
      {customData.pitch1 ? (
        <div className="pitch pitch1">
          <span className="pitchName">{customData.pitch1}</span>
          <div className="pitchInfo">
            <div className="pitchStat">
              <div
                className="pitchStatBar"
                style={{
                  width: parseInt(customData.pitch1Speed ?? "") + 1 + "%",
                }}
              ></div>
            </div>
            <span className="pitchSpeed">
              {customData.pitch1Speed ?? ""}mph
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      {customData.pitch2 ? (
        <div className="pitch pitch2">
          <span className="pitchName">{customData.pitch2}</span>
          <div className="pitchInfo">
            <div className="pitchStat">
              <div
                className="pitchStatBar"
                style={{
                  width: parseInt(customData.pitch2Speed ?? "") + 2 + "%",
                }}
              ></div>
            </div>
            <span className="pitchSpeed">
              {customData.pitch2Speed ?? ""}mph
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      {customData.pitch3 ? (
        <div className="pitch pitch3">
          <span className="pitchName">{customData.pitch3}</span>
          <div className="pitchInfo">
            <div className="pitchStat">
              <div
                className="pitchStatBar"
                style={{
                  width: parseInt(customData.pitch3Speed ?? "") + 3 + "%",
                }}
              ></div>
            </div>
            <span className="pitchSpeed">
              {customData.pitch3Speed ?? ""}mph
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      {customData.pitch4 ? (
        <div className="pitch pitch4">
          <span className="pitchName">{customData.pitch4}</span>
          <div className="pitchInfo">
            <div className="pitchStat">
              <div
                className="pitchStatBar"
                style={{
                  width: parseInt(customData.pitch4Speed ?? "") + 4 + "%",
                }}
              ></div>
            </div>
            <span className="pitchSpeed">
              {customData.pitch4Speed ?? ""}mph
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      {customData.pitch5 ? (
        <div className="pitch pitch5">
          <span className="pitchName">{customData.pitch5}</span>
          <div className="pitchInfo">
            <div className="pitchStat">
              <div
                className="pitchStatBar"
                style={{
                  width: parseInt(customData.pitch5Speed ?? "") + 5 + "%",
                }}
              ></div>
            </div>
            <span className="pitchSpeed">
              {customData.pitch5Speed ?? ""}mph
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )

  const pitchShortNames = (
    <div className="pitchShortNames">
      {customData.pitch1 ? switchToShortName(customData.pitch1) : ""}
      {customData.pitch2 ? ", " + switchToShortName(customData.pitch2) : ""}
      {customData.pitch3 ? ", " + switchToShortName(customData.pitch3) : ""}
      {customData.pitch4 ? ", " + switchToShortName(customData.pitch4) : ""}
      {customData.pitch5 ? ", " + switchToShortName(customData.pitch5) : ""}
    </div>
  )

  let overallShieldIcon = ""
  if (customData.overallRating > 84) {
    overallShieldIcon = <img src={shieldDiamond} alt="Diamond Shield Icon" />
  } else if (customData.overallRating > 79) {
    overallShieldIcon = <img src={shieldGold} alt="Gold Shield Icon" />
  } else if (customData.overallRating > 74) {
    overallShieldIcon = <img src={shieldSilver} alt="Silver Shield Icon" />
  } else if (customData.overallRating > 64) {
    overallShieldIcon = <img src={shieldBronze} alt="Bronze Shield Icon" />
  } else {
    overallShieldIcon = ""
  }

  let hittingShieldIcon = ""
  if (customData.hittingShield === "diamond") {
    hittingShieldIcon = (
      <img
        className="hitting-sheild"
        src={shieldDiamond}
        alt="Diamond Shield Icon"
      />
    )
  } else if (customData.hittingShield === "gold") {
    hittingShieldIcon = (
      <img className="hitting-sheild" src={shieldGold} alt="Gold Shield Icon" />
    )
  } else if (customData.hittingShield === "silver") {
    hittingShieldIcon = (
      <img
        className="hitting-sheild"
        src={shieldSilver}
        alt="Silver Shield Icon"
      />
    )
  } else if (customData.hittingShield === "bronze") {
    hittingShieldIcon = (
      <img
        className="hitting-sheild"
        src={shieldBronze}
        alt="Bronze Shield Icon"
      />
    )
  } else if (customData.hittingShield === "common") {
    hittingShieldIcon = (
      <img
        className="hitting-sheild"
        src={shieldCommon}
        alt="Common Shield Icon"
      />
    )
  } else {
    hittingShieldIcon = ""
  }

  let fieldingShieldIcon = ""
  if (customData.fieldingShield === "diamond") {
    fieldingShieldIcon = (
      <img
        className="fielding-sheild"
        src={shieldDiamond}
        alt="Diamond Shield Icon"
      />
    )
  } else if (customData.fieldingShield === "gold") {
    fieldingShieldIcon = (
      <img
        className="fielding-sheild"
        src={shieldGold}
        alt="Gold Shield Icon"
      />
    )
  } else if (customData.fieldingShield === "silver") {
    fieldingShieldIcon = (
      <img
        className="fielding-sheild"
        src={shieldSilver}
        alt="Silver Shield Icon"
      />
    )
  } else if (customData.fieldingShield === "bronze") {
    fieldingShieldIcon = (
      <img
        className="fielding-sheild"
        src={shieldBronze}
        alt="Bronze Shield Icon"
      />
    )
  } else if (customData.fieldingShield === "common") {
    fieldingShieldIcon = (
      <img
        className="fielding-sheild"
        src={shieldCommon}
        alt="Common Shield Icon"
      />
    )
  } else {
    fieldingShieldIcon = ""
  }

  let cardShieldIcon = ""
  if (customData.overallRating > 84) {
    cardShieldIcon = shieldDiamond
  } else if (customData.overallRating > 79) {
    cardShieldIcon = shieldGold
  } else if (customData.overallRating > 74) {
    cardShieldIcon = shieldSilver
  } else if (customData.overallRating > 74) {
    cardShieldIcon = shieldSilver
  } else if (customData.overallRating > 64) {
    cardShieldIcon = shieldBronze
  } else if (customData.overallRating > 0) {
    cardShieldIcon = shieldCommon
  }

  let cardArtType = ""
  if (customData.cardSeries === "live") {
    cardArtType = (
      <img className="art-type live-series" src={frameLiveSeries} alt="" />
    )
  } else if (customData.cardSeries === "prime") {
    cardArtType = <img className="art-type prime" src={framePrime} alt="" />
  } else if (customData.cardSeries === "second-half") {
    cardArtType = (
      <img className="art-type second-half" src={frameSecondHalf} alt="" />
    )
  } else if (customData.cardSeries === "all-star") {
    cardArtType = <img className="art-type allstar" src={frameAllStar} alt="" />
  } else if (customData.cardSeries === "breakout") {
    cardArtType = (
      <img className="art-type breakout" src={frameBreakout} alt="" />
    )
  } else if (customData.cardSeries === "postseason") {
    cardArtType = (
      <img className="art-type postseason" src={framePostseason} alt="" />
    )
  } else if (customData.cardSeries === "rookie") {
    cardArtType = <img className="art-type rookie" src={frameRookie} alt="" />
  } else if (customData.cardSeries === "veteran") {
    cardArtType = <img className="art-type veteran" src={frameVeteran} alt="" />
  } else if (customData.cardSeries === "none") {
    cardArtType = ""
  }

  let cardYear = ""
  let cardSeriessUsingYear = [
    "second-half",
    "all-star",
    "breakout",
    "postseason",
    "rookie",
    "veteran",
  ]
  if (cardSeriessUsingYear.includes(customData.cardSeries)) {
    cardYear = <div className="card-year">{customData.cardYear}</div>
  }

  let liveSeriesInfo = ""
  if (customData.cardSeries === "live") {
    liveSeriesInfo = (
      <div className="live-series-info">
        <div className="player-first-name">{customData.firstName}</div>
        <div className="player-last-name">{customData.lastName}</div>
        <div className="player-position">{customData.position}</div>
        <div className="player-hands">
          {customData.bats}/{customData.throws}
        </div>
      </div>
    )
  }

  const downloadCard = () => {
    domtoimage
      .toBlob(document.getElementById("card-preview"))
      .then(function (blob) {
        window.saveAs(blob, "card-preview.png")
      })
  }

  return (
    <>
      <div className={`${cardType} card-preview-container`}>
        <div
          className={
            currentUserIsDiamondPlus
              ? "pro-diamond card-preview"
              : "card-preview"
          }
          id="card-preview"
        >
          <div
            className="card-image"
            style={{
              backgroundImage: `url(${cardImage})`,
            }}
          >
            {displayCardRating ? (
              <div
                className="card-rating"
                style={{
                  backgroundImage: `url(${cardShieldIcon})`,
                }}
              >
                {customData.overallRating}
              </div>
            ) : (
              ""
            )}
            {cardArtType}
            {liveSeriesInfo}
            {cardYear}
          </div>
          <div className="first-name">{customData.firstName}</div>
          <div className="last-name">{customData.lastName}</div>
          <div className="overall-rating">{customData.overallRating}</div>
          <div className="number">
            <span>{customData.number}</span>
            <span>{customData.position}</span>
            <span>{customData.team}</span>
          </div>
          <div className="secondary-position">
            {customData.secondaryPosition}
          </div>
          <div className="bats">{customData.bats}</div>
          <div className="throws">{customData.throws}</div>
          <div className="weight">{customData.weight} lbs</div>
          <div className="height">{customData.height}</div>
          <div className="age">{customData.age}</div>
          <div className="born">{customData.born}</div>
          {pitchShortNames}
          {hittingShieldIcon}
          {fieldingShieldIcon}
          {battingStatBars}
          {pitchingStatBars}
          {pitchStatBars}
          {fieldingStatBars}
          {baserunningStatBars}
        </div>
      </div>
      <div className="card-inputs">
        <Typography variant="h2" gutterBottom>
          Build Your Card
        </Typography>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tab}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab label="Card Info" value="1" />
              <Tab label="Player Info" value="2" />
              {!isPitcher ? <Tab label="Hitting Attributes" value="3" /> : ""}
              {isPitcher ? <Tab label="Pitching Attributes" value="4" /> : ""}
              {isPitcher ? <Tab label="Pitches" value="5" /> : ""}
              <Tab label="Defensive Attributes" value="6" />
              {!isPitcher ? <Tab label="Baserunning Info" value="7" /> : ""}
              {!isPitcher ? <Tab label="Shields" value="8" /> : ""}
              <Tab label="Download" value="9" />
            </Tabs>
          </Box>

          <TabPanel value="1" sx={{ padding: 0 }}>
            <Card sx={{ padding: "1rem" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item alignItems="flex-end">
                    <FormControl>
                      <Button
                        variant="contained"
                        component="label"
                        className="upload-button"
                        style={{marginRight: "1rem"}}
                      >
                        Upload Player Image
                        <Input
                          id="cardImage"
                          name="cardImage"
                          onChange={updateCardImage}
                          type="file"
                          style={{
                            display: "none",
                          }}
                        />
                      </Button>
                      <FormHelperText>
                        Best size: 174px wide by 246px tall
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl style={{ minWidth: 100 }}>
                      <InputLabel id="card-type-helper-label">
                        Card Type
                      </InputLabel>
                      <Select
                        labelId="card-type-helper-label"
                        id="card-type-helper"
                        onBlur=""
                        name="cardType"
                        value={cardType}
                        defaultValue={cardType}
                        onChange={updateCard}
                        style={{ width: "135px" }}
                      >
                        <MenuItem value={"batter"}>Batter</MenuItem>
                        <MenuItem value={"pitcher"}>Pitcher</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Overall Rating"
                        id="overall-rating"
                        name="overallRating"
                        value={customData.overallRating}
                        onChange={updateCard}
                        sx={{ width: "150px" }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl style={{ minWidth: 120 }}>
                      <InputLabel id="card-series-helper-label">
                        Card Series
                      </InputLabel>
                      <Select
                        style={{ width: "140px" }}
                        labelId="card-series-helper-label"
                        id="card-series-helper"
                        onBlur=""
                        name="cardSeries"
                        value={cardSeries}
                        onChange={updateCard}
                      >
                        <MenuItem value={"none"}>None</MenuItem>
                        <MenuItem value={"second-half"}>
                          2nd Half Heroes
                        </MenuItem>
                        <MenuItem value={"all-star"}>All Star</MenuItem>
                        <MenuItem value={"breakout"}>Breakout</MenuItem>
                        <MenuItem value={"postseason"}>Postseason</MenuItem>
                        <MenuItem value={"prime"}>Prime</MenuItem>
                        <MenuItem value={"rookie"}>Rookie</MenuItem>
                        <MenuItem value={"veteran"}>Veteran</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        sx={{ width: "120px" }}
                        label="Card Year"
                        id="card-year"
                        name="cardYear"
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={displayCardRating}
                          onChange={handleSwitchChange}
                          name="displayCardRating"
                        />
                      }
                      label="Display Card Rating"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <Card sx={{ padding: "1rem" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="First Name"
                        id="first-name"
                        name="firstName"
                        value={customData.firstName}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Last Name"
                        id="last-name"
                        name="lastName"
                        value={customData.lastName}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <FormControl>
                      <TextField
                        sx={{ width: "120px" }}
                        label="Number"
                        id="number"
                        name="number"
                        variant="outlined"
                        value={customData.number}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <FormControl style={{ minWidth: 100 }}>
                      <InputLabel id="team-helper-label">Team</InputLabel>
                      <Select
                        style={{ width: "175px" }}
                        labelId="team-helper-label"
                        id="team-helper"
                        onBlur=""
                        name="team"
                        value={team}
                        onChange={updateCard}
                      >
                        <MenuItem value={"Free Agent"}>Free Agent</MenuItem>
                        <MenuItem value={"Angels"}>Angels</MenuItem>
                        <MenuItem value={"Astros"}>Astros</MenuItem>
                        <MenuItem value={"Athletics"}>Atletics</MenuItem>
                        <MenuItem value={"Blue Jays"}>Blue Jays</MenuItem>
                        <MenuItem value={"Braves"}>Braves</MenuItem>
                        <MenuItem value={"Brewers"}>Brewers</MenuItem>
                        <MenuItem value={"Cardinals"}>Cardinals</MenuItem>
                        <MenuItem value={"Cubs"}>Cubs</MenuItem>
                        <MenuItem value={"Diamondbacks"}>Diamondbacks</MenuItem>
                        <MenuItem value={"Dodgers"}>Dodgers</MenuItem>
                        <MenuItem value={"Giants"}>Giants</MenuItem>
                        <MenuItem value={"Guardians"}>Guardians</MenuItem>
                        <MenuItem value={"Mariners"}>Mariners</MenuItem>
                        <MenuItem value={"Marlins"}>Marlins</MenuItem>
                        <MenuItem value={"Mets"}>Mets</MenuItem>
                        <MenuItem value={"Nationals"}>Nationals</MenuItem>
                        <MenuItem value={"Orioles"}>Orioles</MenuItem>
                        <MenuItem value={"Padres"}>Padres</MenuItem>
                        <MenuItem value={"Pirates"}>Pirates</MenuItem>
                        <MenuItem value={"Phillies"}>Phillies</MenuItem>
                        <MenuItem value={"Rangers"}>Rangers</MenuItem>
                        <MenuItem value={"Rays"}>Rays</MenuItem>
                        <MenuItem value={"Reds"}>Reds</MenuItem>
                        <MenuItem value={"Red Sox"}>Red Sox</MenuItem>
                        <MenuItem value={"Rockies"}>Rockies</MenuItem>
                        <MenuItem value={"Royals"}>Royals</MenuItem>
                        <MenuItem value={"Tigers"}>Tigers</MenuItem>
                        <MenuItem value={"Twins"}>Twins</MenuItem>
                        <MenuItem value={"White Sox"}>White Sox</MenuItem>
                        <MenuItem value={"Yankees"}>Yankees</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <FormControl style={{ minWidth: 100 }}>
                      <InputLabel id="position-helper-label">
                        Position
                      </InputLabel>
                      <Select
                        style={{ width: "175px" }}
                        labelId="position-helper-label"
                        id="position-helper"
                        onBlur=""
                        name="position"
                        value={position}
                        onChange={updateCard}
                      >
                        <MenuItem value={"Catcher"}>Catcher</MenuItem>
                        <MenuItem value={"First Base"}>First Base</MenuItem>
                        <MenuItem value={"Second Base"}>Second Base</MenuItem>
                        <MenuItem value={"Third Base"}>Third Base</MenuItem>
                        <MenuItem value={"Short Stop"}>Short Stop</MenuItem>
                        <MenuItem value={"Right Field"}>Right Field</MenuItem>
                        <MenuItem value={"Center Field"}>Center Field</MenuItem>
                        <MenuItem value={"Left Field"}>Left Field</MenuItem>
                        <MenuItem value={"Starting Pitcher"}>
                          Starting Pitcher
                        </MenuItem>
                        <MenuItem value={"Relief Pitcher"}>
                          Relief Pitcher
                        </MenuItem>
                        <MenuItem value={"Closing Pitcher"}>
                          Closing Pitcher
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <FormControl>
                      <TextField
                        id="secondary-position"
                        name="secondaryPosition"
                        value={customData.secondaryPosition}
                        onChange={updateCard}
                        label="Secondary Position"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <FormControl style={{ minWidth: 60 }}>
                      <InputLabel id="bats-helper-label">Bats</InputLabel>
                      <Select
                        style={{ width: "120px" }}
                        labelId="bats-helper-label"
                        id="bats-helper"
                        onBlur=""
                        name="bats"
                        value={bats}
                        onChange={updateCard}
                      >
                        <MenuItem value={"R"}>Right</MenuItem>
                        <MenuItem value={"L"}>Left</MenuItem>
                        <MenuItem value={"S"}>Switch</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl style={{ minWidth: 80 }}>
                      <InputLabel id="throws-helper-label">Throws</InputLabel>
                      <Select
                        style={{ width: "120px" }}
                        labelId="throws-helper-label"
                        id="throws-helper"
                        onBlur=""
                        name="throws"
                        value={throws}
                        onChange={updateCard}
                      >
                        <MenuItem value={"R"}>Right</MenuItem>
                        <MenuItem value={"L"}>Left</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Weight"
                        sx={{ width: "120px" }}
                        id="weight"
                        name="weight"
                        value={customData.weight}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Height"
                        sx={{ width: "120px" }}
                        id="height"
                        name="height"
                        value={customData.height}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Age"
                        sx={{ width: "120px" }}
                        id="age"
                        name="age"
                        value={customData.age}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Born"
                        id="born"
                        name="born"
                        value={customData.born}
                        onChange={updateCard}
                      />
                      <FormHelperText>State or Country</FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value="3" sx={{ padding: 0 }}>
            <Card sx={{ padding: "1rem" }}>
              <CardContent>
                <div>
                  <Grid container spacing={4}>
                    <Grid item>
                      <FormControl>
                        <TextField
                          label="Contact - R"
                          sx={{ width: "130px" }}
                          id="contactR"
                          name="contactR"
                          value={customData.contactR}
                          onChange={updateCard}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField
                          label="Contact - L"
                          sx={{ width: "130px" }}
                          id="contactL"
                          name="contactL"
                          value={customData.contactL}
                          onChange={updateCard}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField
                          label="Power - R"
                          sx={{ width: "130px" }}
                          id="powerR"
                          name="powerR"
                          value={customData.powerR}
                          onChange={updateCard}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField
                          label="Power - L"
                          sx={{ width: "130px" }}
                          id="powerL"
                          name="powerL"
                          value={customData.powerL}
                          onChange={updateCard}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField
                          label="Vision"
                          sx={{ width: "120px" }}
                          id="vision"
                          name="vision"
                          value={customData.vision}
                          onChange={updateCard}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField
                          label="Discipline"
                          sx={{ width: "120px" }}
                          id="discipline"
                          name="discipline"
                          value={customData.discipline}
                          onChange={updateCard}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField
                          label="Clutch"
                          sx={{ width: "120px" }}
                          id="clutch"
                          name="clutch"
                          value={customData.clutch}
                          onChange={updateCard}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField
                          label="Bunt"
                          sx={{ width: "120px" }}
                          id="bunt"
                          name="bunt"
                          value={customData.bunt}
                          onChange={updateCard}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField
                          label="Drag Bunt"
                          sx={{ width: "120px" }}
                          id="drag-bunt"
                          name="dragBunt"
                          value={customData.dragBunt}
                          onChange={updateCard}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <TextField
                          label="Durability"
                          sx={{ width: "120px" }}
                          id="durability"
                          name="durability"
                          value={customData.durability}
                          onChange={updateCard}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value="4" sx={{ padding: 0 }}>
            <Card sx={{ padding: "1rem" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item>
                    <FormControl>
                      <TextField
                        id="stamina"
                        name="stamina"
                        onChange={updateCard}
                        label="Stamina"
                        value={customData.stamina}
                        sx={{ width: "120px" }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="H/9"
                        sx={{ width: "120px" }}
                        id="h9"
                        name="h9"
                        value={customData.h9}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="K/9"
                        sx={{ width: "120px" }}
                        id="k9"
                        name="k9"
                        value={customData.k9}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="BB/9"
                        sx={{ width: "120px" }}
                        id="bb9"
                        name="bb9"
                        value={customData.bb9}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="HR/9"
                        sx={{ width: "120px" }}
                        id="hr9"
                        name="hr9"
                        value={customData.hr9}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Clutch"
                        sx={{ width: "120px" }}
                        id="pclt"
                        name="pclt"
                        value={customData.pclt}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Control"
                        sx={{ width: "120px" }}
                        id="control"
                        name="control"
                        value={customData.control}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Velocity"
                        sx={{ width: "120px" }}
                        id="velocity"
                        name="velocity"
                        value={customData.velocity}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Break"
                        sx={{ width: "120px" }}
                        id="break"
                        name="break"
                        value={customData.break}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value="5" sx={{ padding: 0 }}>
            <Card sx={{ padding: "1rem" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item>
                    <FormControl
                      style={{
                        minWidth: 100,
                      }}
                    >
                      <InputLabel id="pitch1-helper-label">Pitch 1</InputLabel>
                      <Select
                        labelId="pitch1-helper-label"
                        id="pitch1-helper"
                        onBlur=""
                        name="pitch1"
                        value={pitch1}
                        onChange={updateCard}
                      >
                        <MenuItem value={"4 Seam FB"}>4 Seam FB</MenuItem>
                        <MenuItem value={"2 Seam FB"}>2 Seam FB</MenuItem>
                        <MenuItem value={"12-6 Curve"}>12-6 Curve</MenuItem>
                        <MenuItem value={"Changeup"}>Changeup</MenuItem>
                        <MenuItem value={"Circle Change"}>
                          Circle Change
                        </MenuItem>
                        <MenuItem value={"Curveball"}>Curveball</MenuItem>
                        <MenuItem value={"Cutter"}>Cutter</MenuItem>
                        <MenuItem value={"Forkball"}>Forkball</MenuItem>
                        <MenuItem value={"Knuckleball"}>Knuckleball</MenuItem>
                        <MenuItem value={"Knuckle-Curve"}>
                          Knuckle-Curve
                        </MenuItem>
                        <MenuItem value={"Palmball"}>Palmball</MenuItem>
                        <MenuItem value={"Running FB"}>Running FB</MenuItem>
                        <MenuItem value={"Screwball"}>Screwball</MenuItem>
                        <MenuItem value={"Sinker"}>Sinker</MenuItem>
                        <MenuItem value={"Slider"}>Slider</MenuItem>
                        <MenuItem value={"Slurve"}>Slurve</MenuItem>
                        <MenuItem value={"Spitball"}>Spitball</MenuItem>
                        <MenuItem value={"Splitter"}>Splitter</MenuItem>
                        <MenuItem value={"Sweeping Curve"}>
                          Sweeping Curve
                        </MenuItem>
                        <MenuItem value={"Vulcanchange"}>Vulcanchange</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        id="pitch1-speed"
                        name="pitch1Speed"
                        onChange={updateCard}
                        value={customData.pitch1Speed}
                        label="Pitch 1 Speed"
                        sx={{ width: "140px" }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      style={{
                        minWidth: 100,
                      }}
                    >
                      <InputLabel id="pitch2-helper-label">Pitch 2</InputLabel>
                      <Select
                        labelId="pitch2-helper-label"
                        id="pitch2-helper"
                        onBlur=""
                        name="pitch2"
                        value={pitch2}
                        onChange={updateCard}
                      >
                        <MenuItem value={"4 Seam FB"}>4 Seam FB</MenuItem>
                        <MenuItem value={"2 Seam FB"}>2 Seam FB</MenuItem>
                        <MenuItem value={"12-6 Curve"}>12-6 Curve</MenuItem>
                        <MenuItem value={"Changeup"}>Changeup</MenuItem>
                        <MenuItem value={"Circle Change"}>
                          Circle Change
                        </MenuItem>
                        <MenuItem value={"Curveball"}>Curveball</MenuItem>
                        <MenuItem value={"Cutter"}>Cutter</MenuItem>
                        <MenuItem value={"Forkball"}>Forkball</MenuItem>
                        <MenuItem value={"Knuckleball"}>Knuckleball</MenuItem>
                        <MenuItem value={"Knuckle-Curve"}>
                          Knuckle-Curve
                        </MenuItem>
                        <MenuItem value={"Palmball"}>Palmball</MenuItem>
                        <MenuItem value={"Running FB"}>Running FB</MenuItem>
                        <MenuItem value={"Screwball"}>Screwball</MenuItem>
                        <MenuItem value={"Sinker"}>Sinker</MenuItem>
                        <MenuItem value={"Slider"}>Slider</MenuItem>
                        <MenuItem value={"Slurve"}>Slurve</MenuItem>
                        <MenuItem value={"Spitball"}>Spitball</MenuItem>
                        <MenuItem value={"Splitter"}>Splitter</MenuItem>
                        <MenuItem value={"Sweeping Curve"}>
                          Sweeping Curve
                        </MenuItem>
                        <MenuItem value={"Vulcanchange"}>Vulcanchange</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        id="pitch2-speed"
                        name="pitch2Speed"
                        onChange={updateCard}
                        value={customData.pitch2Speed}
                        label="Pitch 2 Speed"
                        sx={{ width: "140px" }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      style={{
                        minWidth: 100,
                      }}
                    >
                      <InputLabel id="pitch3-helper-label">Pitch 3</InputLabel>
                      <Select
                        labelId="pitch3-helper-label"
                        id="pitch3-helper"
                        onBlur=""
                        name="pitch3"
                        value={pitch3}
                        onChange={updateCard}
                      >
                        <MenuItem value={"4 Seam FB"}>4 Seam FB</MenuItem>
                        <MenuItem value={"2 Seam FB"}>2 Seam FB</MenuItem>
                        <MenuItem value={"12-6 Curve"}>12-6 Curve</MenuItem>
                        <MenuItem value={"Changeup"}>Changeup</MenuItem>
                        <MenuItem value={"Circle Change"}>
                          Circle Change
                        </MenuItem>
                        <MenuItem value={"Curveball"}>Curveball</MenuItem>
                        <MenuItem value={"Cutter"}>Cutter</MenuItem>
                        <MenuItem value={"Forkball"}>Forkball</MenuItem>
                        <MenuItem value={"Knuckleball"}>Knuckleball</MenuItem>
                        <MenuItem value={"Knuckle-Curve"}>
                          Knuckle-Curve
                        </MenuItem>
                        <MenuItem value={"Palmball"}>Palmball</MenuItem>
                        <MenuItem value={"Running FB"}>Running FB</MenuItem>
                        <MenuItem value={"Screwball"}>Screwball</MenuItem>
                        <MenuItem value={"Sinker"}>Sinker</MenuItem>
                        <MenuItem value={"Slider"}>Slider</MenuItem>
                        <MenuItem value={"Slurve"}>Slurve</MenuItem>
                        <MenuItem value={"Spitball"}>Spitball</MenuItem>
                        <MenuItem value={"Splitter"}>Splitter</MenuItem>
                        <MenuItem value={"Sweeping Curve"}>
                          Sweeping Curve
                        </MenuItem>
                        <MenuItem value={"Vulcanchange"}>Vulcanchange</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        id="pitch3-speed"
                        name="pitch3Speed"
                        onChange={updateCard}
                        value={customData.pitch3Speed}
                        label="Pitch 3 Speed"
                        sx={{ width: "140px" }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      style={{
                        minWidth: 100,
                      }}
                    >
                      <InputLabel id="pitch4-helper-label">Pitch 4</InputLabel>
                      <Select
                        labelId="pitch4-helper-label"
                        id="pitch4-helper"
                        onBlur=""
                        name="pitch4"
                        value={pitch4}
                        onChange={updateCard}
                      >
                        <MenuItem value={"4 Seam FB"}>4 Seam FB</MenuItem>
                        <MenuItem value={"2 Seam FB"}>2 Seam FB</MenuItem>
                        <MenuItem value={"12-6 Curve"}>12-6 Curve</MenuItem>
                        <MenuItem value={"Changeup"}>Changeup</MenuItem>
                        <MenuItem value={"Circle Change"}>
                          Circle Change
                        </MenuItem>
                        <MenuItem value={"Curveball"}>Curveball</MenuItem>
                        <MenuItem value={"Cutter"}>Cutter</MenuItem>
                        <MenuItem value={"Forkball"}>Forkball</MenuItem>
                        <MenuItem value={"Knuckleball"}>Knuckleball</MenuItem>
                        <MenuItem value={"Knuckle-Curve"}>
                          Knuckle-Curve
                        </MenuItem>
                        <MenuItem value={"Palmball"}>Palmball</MenuItem>
                        <MenuItem value={"Running FB"}>Running FB</MenuItem>
                        <MenuItem value={"Screwball"}>Screwball</MenuItem>
                        <MenuItem value={"Sinker"}>Sinker</MenuItem>
                        <MenuItem value={"Slider"}>Slider</MenuItem>
                        <MenuItem value={"Slurve"}>Slurve</MenuItem>
                        <MenuItem value={"Spitball"}>Spitball</MenuItem>
                        <MenuItem value={"Splitter"}>Splitter</MenuItem>
                        <MenuItem value={"Sweeping Curve"}>
                          Sweeping Curve
                        </MenuItem>
                        <MenuItem value={"Vulcanchange"}>Vulcanchange</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        id="pitch4-speed"
                        name="pitch4Speed"
                        onChange={updateCard}
                        value={customData.pitch4Speed}
                        label="Pitch 4 Speed"
                        sx={{ width: "140px" }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      style={{
                        minWidth: 100,
                      }}
                    >
                      <InputLabel id="pitch5-helper-label">Pitch 5</InputLabel>
                      <Select
                        labelId="pitch5-helper-label"
                        id="pitch5-helper"
                        onBlur=""
                        name="pitch5"
                        value={pitch5}
                        onChange={updateCard}
                      >
                        <MenuItem value={"4 Seam FB"}>4 Seam FB</MenuItem>
                        <MenuItem value={"2 Seam FB"}>2 Seam FB</MenuItem>
                        <MenuItem value={"12-6 Curve"}>12-6 Curve</MenuItem>
                        <MenuItem value={"Changeup"}>Changeup</MenuItem>
                        <MenuItem value={"Circle Change"}>
                          Circle Change
                        </MenuItem>
                        <MenuItem value={"Curveball"}>Curveball</MenuItem>
                        <MenuItem value={"Cutter"}>Cutter</MenuItem>
                        <MenuItem value={"Forkball"}>Forkball</MenuItem>
                        <MenuItem value={"Knuckleball"}>Knuckleball</MenuItem>
                        <MenuItem value={"Knuckle-Curve"}>
                          Knuckle-Curve
                        </MenuItem>
                        <MenuItem value={"Palmball"}>Palmball</MenuItem>
                        <MenuItem value={"Running FB"}>Running FB</MenuItem>
                        <MenuItem value={"Screwball"}>Screwball</MenuItem>
                        <MenuItem value={"Sinker"}>Sinker</MenuItem>
                        <MenuItem value={"Slider"}>Slider</MenuItem>
                        <MenuItem value={"Slurve"}>Slurve</MenuItem>
                        <MenuItem value={"Spitball"}>Spitball</MenuItem>
                        <MenuItem value={"Splitter"}>Splitter</MenuItem>
                        <MenuItem value={"Sweeping Curve"}>
                          Sweeping Curve
                        </MenuItem>
                        <MenuItem value={"Vulcanchange"}>Vulcanchange</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        id="pitch5-speed"
                        name="pitch5Speed"
                        onChange={updateCard}
                        value={customData.pitch5Speed}
                        label="Pitch 5 Speed"
                        sx={{ width: "140px" }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value="6" sx={{ padding: 0 }}>
            <Card sx={{ padding: "1rem" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Fielding"
                        sx={{ width: "120px" }}
                        id="fielding"
                        name="fielding"
                        value={customData.fielding}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Arm"
                        sx={{ width: "120px" }}
                        id="arm"
                        name="arm"
                        value={customData.arm}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Accuracy"
                        sx={{ width: "120px" }}
                        id="accuracy"
                        name="accuracy"
                        value={customData.accuracy}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Reaction"
                        sx={{ width: "120px" }}
                        id="reaction"
                        name="reaction"
                        value={customData.reaction}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value="7" sx={{ padding: 0 }}>
            <Card sx={{ padding: "1rem" }}>
              <CardContent>
                {" "}
                <Grid container spacing={4}>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Speed"
                        sx={{ width: "120px" }}
                        id="speed"
                        name="speed"
                        value={customData.speed}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Steal"
                        sx={{ width: "120px" }}
                        id="steal"
                        name="steal"
                        value={customData.steal}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <TextField
                        label="Aggressiveness"
                        sx={{ width: "160px" }}
                        id="br-agg"
                        name="brAgg"
                        value={customData.brAgg}
                        onChange={updateCard}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value="8" sx={{ padding: 0 }}>
            <Card sx={{ padding: "1rem" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item>
                    <FormControl
                      style={{
                        minWidth: 130,
                      }}
                    >
                      <InputLabel id="hitting-shield-helper-label">
                        Hitting Shield
                      </InputLabel>
                      <Select
                        style={{ width: "155px" }}
                        labelId="hitting-shield-helper-label"
                        id="hitting-shield-helper"
                        onBlur=""
                        name="hittingShield"
                        onChange={updateCard}
                      >
                        <MenuItem value={"common"}>Common</MenuItem>
                        <MenuItem value={"bronze"}>Bronze</MenuItem>
                        <MenuItem value={"silver"}>Silver</MenuItem>
                        <MenuItem value={"gold"}>Gold</MenuItem>
                        <MenuItem value={"diamond"}>Diamond</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      style={{
                        minWidth: 140,
                      }}
                    >
                      <InputLabel id="fielding-shield-helper-label">
                        Defensive Shield
                      </InputLabel>
                      <Select
                        style={{ width: "180px" }}
                        labelId="fielding-shield-helper-label"
                        id="fielding-shield-helper"
                        onBlur=""
                        name="fieldingShield"
                        onChange={updateCard}
                      >
                        <MenuItem value={"common"}>Common</MenuItem>
                        <MenuItem value={"bronze"}>Bronze</MenuItem>
                        <MenuItem value={"silver"}>Silver</MenuItem>
                        <MenuItem value={"gold"}>Gold</MenuItem>
                        <MenuItem value={"diamond"}>Diamond</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value="9" sx={{ padding: 0 }}>
            <Card sx={{ padding: "1rem" }}>
              <CardContent>
                <Button onClick={downloadCard} variant="filled" color="primary">
                  Download Card
                </Button>
              </CardContent>
            </Card>
          </TabPanel>
        </TabContext>
      </div>
    </>
  )
}

export default CardBuilder
