import React, { useState, useCallback, useEffect } from "react"
import { styled } from "@mui/system"
import {
  IconButton,
  Typography,
  TextField,
  Button,
  Divider,
  MenuItem,
  Select,
  FormControl,
  ListItemText,
  InputLabel,
  ListSubheader,
  FormHelperText,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DoneIcon from "@mui/icons-material/Done"
import ModalPaper from "@components/ModalPaper"
import { convertPropsToArray } from "@features/tables/utils/table-data-utils"

const FilterFields = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const ARRAY_TYPE_PROPS = [
  "game",
  "rarity",
  "series",
  "position",
  "position_secondary",
  "team",
  "bat_hand",
  "throw_hand",
  "quirks",
  "born",
  "all_positions",
  "all_teams",
  "pitches",
]

const pitchTypes = [
  "4 Seam FB",
  "2 Seam FB",
  "Cutter",
  "Curveball",
  "Changeup",
  "Slider",
  "Circle-Change",
  "Knuckle Curve",
  "Sinker",
  "12-6 Curve",
  "Splitter",
  "Screwball",
  "Slurve",
  "Sweeping Curve",
  "Vulcan Change",
  "Fork",
  "Knuckle",
]

const TierListPlayerSearchFilterModal = ({
  removeGameFilter,
  isOpen = false,
  onClose = () => ({}),
  columnsData: {
    game,
    positions,
    rarity,
    series,
    legacySeries,
    teams,
    quirks,
    locations,
  },
  dataFilters,
  updateDataFilters,
}) => {
  const [filters, setFilters] = useState(convertPropsToArray(dataFilters, ARRAY_TYPE_PROPS))
   
  useEffect(() => {
    setFilters(convertPropsToArray(dataFilters, ARRAY_TYPE_PROPS));
  }, [dataFilters])

  const handleFilterChange = useCallback(event => {
    setFilters(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }, [])

  const handleFilterSubmit = () => {
    updateDataFilters(filters);
    onClose()
  }

  return (
    <ModalPaper isOpen={isOpen} onClose={onClose}>
      <Typography component="h2" variant="h6">
        Filter Data
      </Typography>
      <IconButton
        aria-label="close"
        className="closeModalIcon"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <IconButton
        aria-label="submit"
        className="doneModalIcon"
        onClick={handleFilterSubmit}
      >
        <DoneIcon />
      </IconButton>
      <FilterFields>
        {removeGameFilter ? (
          ""
        ) : (
          <FormControl fullWidth>
            <InputLabel name="rarity-label">Game</InputLabel>
            <Select
              name="game"
              labelname="game-label"
              multiple
              value={filters.game || []}
              onChange={handleFilterChange}
              renderValue={selected => selected.join(", ")}
            >
              {game.map(ga => (
                <MenuItem key={ga} value={ga}>
                  <ListItemText primary={ga} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <TextField
          name="search"
          fullWidth
          value={filters.search}
          onChange={handleFilterChange}
          label="Search by Player Name"
        />
        <TextField
          name="min_overall"
          style={{ width: "48%" }}
          value={filters.min_overall}
          onChange={handleFilterChange}
          label="Minimum Overall"
        />
        <TextField
          name="max_overall"
          style={{ width: "48%" }}
          value={filters.max_overall}
          onChange={handleFilterChange}
          label="Maximum Overall"
        />
        <TextField
          name="min_overall_true"
          style={{ width: "48%" }}
          value={filters.min_overall_true}
          onChange={handleFilterChange}
          label="Minimum True Overall"
        />
        <TextField
          name="max_overall_true"
          style={{ width: "48%" }}
          value={filters.max_overall_true}
          onChange={handleFilterChange}
          label="Maximum True Overall"
        />
        <TextField
          name="min_overall_meta"
          style={{ width: "48%" }}
          value={filters.min_overall_meta}
          onChange={handleFilterChange}
          label="Minimum Meta Overall"
        />
        <TextField
          name="max_overall_meta"
          style={{ width: "48%" }}
          value={filters.max_overall_meta}
          onChange={handleFilterChange}
          label="Maximum Meta Overall"
        />
        <FormControl fullWidth>
          <InputLabel name="rarity-label">Rarity</InputLabel>
          <Select
            name="rarity"
            labelname="rarity-label"
            multiple
            value={filters.rarity || []}
            onChange={handleFilterChange}
            renderValue={selected => selected.join(", ")}
          >
            {rarity.map(rarity => (
              <MenuItem key={rarity} value={rarity}>
                <ListItemText primary={rarity} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel name="rarity-label">Series</InputLabel>
          <Select
            name="series"
            labelname="series-label"
            multiple
            value={filters.series || []}
            onChange={handleFilterChange}
            renderValue={selected => selected.join(", ")}
          >
            {series.map(series => (
              <MenuItem key={series} value={series}>
                <ListItemText primary={series} />
              </MenuItem>
            ))}
            <Divider />
            <ListSubheader>Previous-Game Series</ListSubheader>
            {legacySeries.map(series => (
              <MenuItem key={series} value={series}>
                <ListItemText primary={series} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel name="primary-position-label">
            Primary Position
          </InputLabel>
          <Select
            name="position"
            labelname="primary-position-label"
            multiple
            value={filters.position || []}
            onChange={handleFilterChange}
            renderValue={selected => selected.join(", ")}
          >
            {positions.map(position => (
              <MenuItem key={position} value={position}>
                <ListItemText primary={position} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel name="secondary-position-label">
            Secondary Position(s)
          </InputLabel>
          <Select
            name="position_secondary"
            labelname="secondary-position-label"
            multiple
            value={filters.position_secondary || []}
            onChange={handleFilterChange}
            renderValue={selected => selected.join(", ")}
          >
            {positions.map(position => (
              <MenuItem key={position} value={position}>
                <ListItemText primary={position} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel name="secondary-position-label">
            All Position(s)
          </InputLabel>
          <Select
            name="all_positions"
            labelname="all-position-label"
            multiple
            value={filters.all_positions || []}
            onChange={handleFilterChange}
            renderValue={selected => selected.join(", ")}
          >
            {positions.map(position => (
              <MenuItem key={position} value={position}>
                <ListItemText primary={position} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            Searches Primary and Secondary Positions
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel name="event-label">Event Eligible</InputLabel>
          <Select
            name="event"
            labelname="event-label"
            value={filters.event || []}
            onChange={handleFilterChange}
          >
            <MenuItem key="yes" value="true">
              <ListItemText primary="Yes" />
            </MenuItem>
            <MenuItem key="no" value="false">
              <ListItemText primary="No" />
            </MenuItem>
            <MenuItem key="null" value="All">
              <ListItemText primary="All" />
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="min_buy"
          style={{ width: "48%" }}
          value={filters.min_buy}
          onChange={handleFilterChange}
          label="Minimum Buy"
        />
        <TextField
          name="max_buy"
          style={{ width: "48%" }}
          value={filters.max_buy}
          onChange={handleFilterChange}
          label="Maximum Buy"
        />
        <TextField
          name="min_sell"
          style={{ width: "48%" }}
          value={filters.min_sell}
          onChange={handleFilterChange}
          label="Minimum Sell"
        />
        <TextField
          name="max_sell"
          style={{ width: "48%" }}
          value={filters.max_sell}
          onChange={handleFilterChange}
          label="Maximum Sell"
        />
        <FormControl fullWidth>
          <InputLabel name="team-label">Team</InputLabel>
          <Select
            name="team"
            labelname="team-label"
            multiple
            value={filters.team || []}
            onChange={handleFilterChange}
            renderValue={selected => selected.join(", ")}
          >
            {teams.map(team => (
              <MenuItem key={team} value={team}>
                <ListItemText primary={team} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel name="all-teams-label">Teams Played For</InputLabel>
          <Select
            name="all_teams"
            labelname="all-teams-label"
            multiple
            value={filters.all_teams || []}
            onChange={handleFilterChange}
            renderValue={selected => selected.join(", ")}
          >
            {teams.map(team => (
              <MenuItem key={team} value={team}>
                <ListItemText primary={team} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            Search for players that ever played for a specific team.
          </FormHelperText>
        </FormControl>
        <FormControl style={{ width: "48%" }}>
          <InputLabel name="bats-label">Bats</InputLabel>
          <Select
            name="bat_hand"
            labelname="bats-label"
            multiple
            value={filters.bat_hand || []}
            onChange={handleFilterChange}
            renderValue={selected => selected.join(", ")}
          >
            <MenuItem key="R" value="R">
              <ListItemText primary="Right" />
            </MenuItem>
            <MenuItem key="L" value="L">
              <ListItemText primary="Left" />
            </MenuItem>
            <MenuItem key="S" value="S">
              <ListItemText primary="Switch" />
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: "48%" }}>
          <InputLabel name="throws-label">Throws</InputLabel>
          <Select
            name="throw_hand"
            labelname="throws-label"
            multiple
            value={filters.throw_hand || []}
            onChange={handleFilterChange}
            renderValue={selected => selected.join(", ")}
          >
            <MenuItem key="R" value="R">
              <ListItemText primary="Right" />
            </MenuItem>
            <MenuItem key="L" value="L">
              <ListItemText primary="Left" />
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel name="born-label">Born</InputLabel>
          <Select
            name="born"
            labelname="born-label"
            multiple
            value={filters.born || []}
            onChange={handleFilterChange}
            renderValue={selected => selected.join(", ")}
          >
            {locations.map(location => (
              <MenuItem key={location} value={location}>
                <ListItemText primary={location} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="min_contact_l"
          style={{ width: "48%" }}
          value={filters.min_contact_l}
          onChange={handleFilterChange}
          label="Minimum Contact - L"
        />
        <TextField
          name="max_contact_l"
          style={{ width: "48%" }}
          value={filters.max_contact_l}
          onChange={handleFilterChange}
          label="Maximum Contact - L"
        />
        <TextField
          name="min_contact_r"
          style={{ width: "48%" }}
          value={filters.min_contact_r}
          onChange={handleFilterChange}
          label="Minimum Contact-R"
        />
        <TextField
          name="max_contact_r"
          style={{ width: "48%" }}
          value={filters.max_contact_r}
          onChange={handleFilterChange}
          label="Maximum Contact-R"
        />
        <TextField
          name="min_power_l"
          style={{ width: "48%" }}
          value={filters.min_power_l}
          onChange={handleFilterChange}
          label="Minimum Power-L"
        />
        <TextField
          name="max_power_l"
          style={{ width: "48%" }}
          value={filters.max_power_l}
          onChange={handleFilterChange}
          label="Maximum Power-L"
        />
        <TextField
          name="min_power_r"
          style={{ width: "48%" }}
          value={filters.min_power_r}
          onChange={handleFilterChange}
          label="Minimum Power-R"
        />
        <TextField
          name="max_power_r"
          style={{ width: "48%" }}
          value={filters.max_power_r}
          onChange={handleFilterChange}
          label="Maximum Power-R"
        />
        <TextField
          name="min_plate_vision"
          style={{ width: "48%" }}
          value={filters.min_plate_vision}
          onChange={handleFilterChange}
          label="Minimum Vision"
        />
        <TextField
          name="max_plate_vision"
          style={{ width: "48%" }}
          value={filters.max_plate_vision}
          onChange={handleFilterChange}
          label="Maximum Vision"
        />
        <TextField
          name="min_discipline"
          style={{ width: "48%" }}
          value={filters.min_plate_discipline}
          onChange={handleFilterChange}
          label="Minimum Discipline"
        />
        <TextField
          name="max_discipline"
          style={{ width: "48%" }}
          value={filters.max_plate_discipline}
          onChange={handleFilterChange}
          label="Maximum Discipline"
        />
        <TextField
          name="min_bunting"
          style={{ width: "48%" }}
          value={filters.min_bunting}
          onChange={handleFilterChange}
          label="Minimum Bunt"
        />
        <TextField
          name="max_bunting"
          style={{ width: "48%" }}
          value={filters.max_bunting}
          onChange={handleFilterChange}
          label="Maximum Bunt"
        />
        <TextField
          name="min_drag_bunting"
          style={{ width: "48%" }}
          value={filters.min_drag_bunting}
          onChange={handleFilterChange}
          label="Minimum Drag Bunt"
        />
        <TextField
          name="max_drag_bunting"
          style={{ width: "48%" }}
          value={filters.max_drag_bunting}
          onChange={handleFilterChange}
          label="Maximum Drag Bunt"
        />
        <TextField
          name="min_hitting_durability"
          style={{ width: "48%" }}
          value={filters.min_hitting_durability}
          onChange={handleFilterChange}
          label="Minimum Durability"
        />
        <TextField
          name="max_hitting_durability"
          style={{ width: "48%" }}
          value={filters.max_hitting_durability}
          onChange={handleFilterChange}
          label="Maximum Durability"
        />

        <TextField
          name="min_fielding"
          style={{ width: "48%" }}
          value={filters.min_fielding}
          onChange={handleFilterChange}
          label="Minimum Fielding"
        />
        <TextField
          name="max_fielding"
          style={{ width: "48%" }}
          value={filters.max_fielding}
          onChange={handleFilterChange}
          label="Maximum Fielding"
        />

        <TextField
          name="min_arm_strength"
          style={{ width: "48%" }}
          value={filters.min_arm_strength}
          onChange={handleFilterChange}
          label="Minimum Arm Strength"
        />
        <TextField
          name="max_arm_strength"
          style={{ width: "48%" }}
          value={filters.max_arm_strength}
          onChange={handleFilterChange}
          label="Maximum Arm Strength"
        />

        <TextField
          name="min_arm_accuracy"
          style={{ width: "48%" }}
          value={filters.min_arm_accuracy}
          onChange={handleFilterChange}
          label="Minimum Arm Accuracy"
        />
        <TextField
          name="max_arm_accuracy"
          style={{ width: "48%" }}
          value={filters.max_arm_accuracy}
          onChange={handleFilterChange}
          label="Maximum Arm Accuracy"
        />

        <TextField
          name="min_reaction_time"
          style={{ width: "48%" }}
          value={filters.min_reaction_time}
          onChange={handleFilterChange}
          label="Minimum Reaction"
        />
        <TextField
          name="max_reaction_time"
          style={{ width: "48%" }}
          value={filters.max_reaction_time}
          onChange={handleFilterChange}
          label="Maximum Reaction"
        />
        <TextField
          name="min_blocking"
          style={{ width: "48%" }}
          value={filters.min_blocking}
          onChange={handleFilterChange}
          label="Minimum Blocking"
        />
        <TextField
          name="max_blocking"
          style={{ width: "48%" }}
          value={filters.max_blocking}
          onChange={handleFilterChange}
          label="Maximum Blocking"
        />

        <TextField
          name="min_speed"
          style={{ width: "48%" }}
          value={filters.min_speed}
          onChange={handleFilterChange}
          label="Minimum Speed"
        />
        <TextField
          name="max_speed"
          style={{ width: "48%" }}
          value={filters.max_speed}
          onChange={handleFilterChange}
          label="Maximum Speed"
        />

        <TextField
          name="min_baserunning"
          style={{ width: "48%" }}
          value={filters.min_baserunning}
          onChange={handleFilterChange}
          label="Minimum Steal"
        />
        <TextField
          name="max_baserunning"
          style={{ width: "48%" }}
          value={filters.max_baserunning}
          onChange={handleFilterChange}
          label="Maximum Steal"
        />

        <TextField
          name="min_baserunning_aggression"
          style={{ width: "48%" }}
          value={filters.min_baserunning_aggression}
          onChange={handleFilterChange}
          label="Minimum Baserunning Aggression"
        />
        <TextField
          name="max_baserunning_aggression"
          style={{ width: "48%" }}
          value={filters.max_baserunning_aggression}
          onChange={handleFilterChange}
          label="Maximum Baserunning Aggression"
        />
        <TextField
          name="min_stamina"
          style={{ width: "48%" }}
          value={filters.min_stamina}
          onChange={handleFilterChange}
          label="Minimum Stamina"
        />
        <TextField
          name="max_stamina"
          style={{ width: "48%" }}
          value={filters.max_stamina}
          onChange={handleFilterChange}
          label="Maximum Stamina"
        />

        <TextField
          name="min_pitching_clutch"
          style={{ width: "48%" }}
          value={filters.min_pitching_clutch}
          onChange={handleFilterChange}
          label="Minimum Pitching Clutch"
        />
        <TextField
          name="max_pitching_clutch"
          style={{ width: "48%" }}
          value={filters.max_pitching_clutch}
          onChange={handleFilterChange}
          label="Maximum Pitching Clutch"
        />
        <TextField
          name="min_pitching_durability"
          style={{ width: "48%" }}
          value={filters.min_pitching_durability}
          onChange={handleFilterChange}
          label="Minimum Pitching Durability"
        />
        <TextField
          name="max_pitching_durability"
          style={{ width: "48%" }}
          value={filters.max_pitching_durability}
          onChange={handleFilterChange}
          label="Maximum Pitching Durability"
        />

        <TextField
          name="min_hits_per_bf"
          style={{ width: "48%" }}
          value={filters.min_hits_per_bf}
          onChange={handleFilterChange}
          label="Minimum H/9"
        />
        <TextField
          name="max_hits_per_bf"
          style={{ width: "48%" }}
          value={filters.max_hits_per_bf}
          onChange={handleFilterChange}
          label="Maximum H/9"
        />
        <TextField
          name="min_hits_per_bf"
          style={{ width: "48%" }}
          value={filters.min_k_per_bf}
          onChange={handleFilterChange}
          label="Minimum K/9"
        />
        <TextField
          name="max_k_per_bf"
          style={{ width: "48%" }}
          value={filters.max_k_per_bf}
          onChange={handleFilterChange}
          label="Maximum K/9"
        />
        <TextField
          name="min_hits_per_bf"
          style={{ width: "48%" }}
          value={filters.min_bb_per_bf}
          onChange={handleFilterChange}
          label="Minimum BB/9"
        />
        <TextField
          name="max_hits_per_bf"
          style={{ width: "48%" }}
          value={filters.max_bb_per_bf}
          onChange={handleFilterChange}
          label="Maximum BB/9"
        />
        <TextField
          name="min_hr_per_bf"
          style={{ width: "48%" }}
          value={filters.min_hr_per_bf}
          onChange={handleFilterChange}
          label="Minimum HR/9"
        />
        <TextField
          name="max_hr_per_bf"
          style={{ width: "48%" }}
          value={filters.max_hr_per_bf}
          onChange={handleFilterChange}
          label="Maximum HR/9"
        />
        <TextField
          name="min_pitch_velocity"
          style={{ width: "48%" }}
          value={filters.min_pitch_velocity}
          onChange={handleFilterChange}
          label="Minimum Velocity"
        />
        <TextField
          name="max_pitch_velocity"
          style={{ width: "48%" }}
          value={filters.max_pitch_velocity}
          onChange={handleFilterChange}
          label="Maximum Velocity"
        />
        <TextField
          name="min_pitch_control"
          style={{ width: "48%" }}
          value={filters.min_pitch_control}
          onChange={handleFilterChange}
          label="Minimum Control"
        />
        <TextField
          name="max_pitch_control"
          style={{ width: "48%" }}
          value={filters.max_pitch_control}
          onChange={handleFilterChange}
          label="Maximum Control"
        />
        <TextField
          name="min_pitch_movement"
          style={{ width: "48%" }}
          value={filters.min_pitch_movement}
          onChange={handleFilterChange}
          label="Minimum Break"
        />
        <TextField
          name="max_pitch_movement"
          style={{ width: "48%" }}
          value={filters.max_pitch_movement}
          onChange={handleFilterChange}
          label="Maximum Break"
        />
        <TextField
          name="min_velocity_diff"
          style={{ width: "48%" }}
          value={filters.min_velocity_diff}
          onChange={handleFilterChange}
          label="Minimum Velo Diff"
        />
        <TextField
          name="max_velocity_diff"
          style={{ width: "48%" }}
          value={filters.max_velocity_diff}
          onChange={handleFilterChange}
          label="Maximum Velo Diff"
        />
        <FormControl fullWidth>
          <InputLabel name="quirks-label">Pitch Types</InputLabel>
          <Select
            name="pitches"
            labelname="pitches"
            multiple
            value={filters.pitches || []}
            onChange={handleFilterChange}
            renderValue={selected => selected.join(", ")}
          >
            {pitchTypes.map(pitchType => (
              <MenuItem key={pitchType} value={pitchType}>
                <ListItemText primary={pitchType} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel name="quirks-label">Quirks</InputLabel>
          <Select
            name="quirks"
            labelname="quirks"
            multiple
            value={filters.quirks || []}
            onChange={handleFilterChange}
            renderValue={selected => selected.join(", ")}
          >
            {quirks.map(quirk => (
              <MenuItem key={quirk} value={quirk}>
                <ListItemText primary={quirk} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FilterFields>
      <Button variant="contained" onClick={handleFilterSubmit}>
        Apply Filters
      </Button>
    </ModalPaper>
  )
}

export default TierListPlayerSearchFilterModal
