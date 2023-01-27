import {
  TextField,
  Divider,
  MenuItem,
  Select,
  FormControl,
  ListItemText,
  InputLabel,
  ListSubheader,
} from "@mui/material"
import StandardSelect from "../common/StandardSelect"

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

function PlayersSubset({
  filters,
  handleFilterChange,
  removeGameFilter,
  columnsData,
}) {
  const {
    game,
    positions,
    rarity,
    series,
    legacySeries,
    teams,
    quirks,
    locations,
  } = columnsData

  const gameFilter = removeGameFilter ? null : (
    <StandardSelect
      label="Game"
      name="game"
      value={filters.game}
      onChange={handleFilterChange}
      options={game}
    />
  )

  return (
    <>
      {gameFilter}
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
      <StandardSelect
        label="Rarity"
        name="rarity"
        value={filters.rarity}
        onChange={handleFilterChange}
        options={rarity}
      />
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
      <StandardSelect
        label="Primary Position"
        name="position"
        value={filters.position}
        onChange={handleFilterChange}
        options={positions}
      />
      <StandardSelect
        label="Secondary Position(s)"
        name="position_secondary"
        value={filters.position_secondary}
        onChange={handleFilterChange}
        options={positions}
      />
      <StandardSelect
        label="All Position(s)"
        name="all_positions"
        value={filters.all_positions}
        onChange={handleFilterChange}
        options={positions}
        helperText="Searches Primary and Secondary Positions"
      />
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
      <StandardSelect
        label="Team"
        name="team"
        value={filters.team}
        onChange={handleFilterChange}
        options={teams}
      />
      <StandardSelect
        label="Teams Played For"
        name="all_teams"
        value={filters.all_teams}
        onChange={handleFilterChange}
        options={teams}
        helperText="Search for players that ever played for a specific team."
      />
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
      <StandardSelect
        label="Born"
        name="born"
        value={filters.born}
        onChange={handleFilterChange}
        options={locations}
      />
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
      <StandardSelect
        label="Pitch Types"
        name="pitches"
        value={filters.pitches}
        onChange={handleFilterChange}
        options={pitchTypes}
      />
      <StandardSelect
        label="Quirks"
        name="quirks"
        value={filters.quirks}
        onChange={handleFilterChange}
        options={quirks}
      />
    </>
  )
}

export default PlayersSubset;
