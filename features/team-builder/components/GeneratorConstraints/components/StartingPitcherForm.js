import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

function StartingPitcherForm({value, onChange, disabled}) {
  return (
    <FormControl style={{ width: "100%" }}>
      <InputLabel id="sp-objective-helper-label">
        Starting Pitcher Objective
      </InputLabel>
      <Select
        labelId="sp-objective-helper-label"
        id="card-type-helper"
        onBlur=""
        name="objective_sp"
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <MenuItem value={"playerprofileadvanced__overall_true"}>
          True Overall (Default)
        </MenuItem>
        <MenuItem value={"playerprofileadvanced__overall_meta"}>
          Meta Overall
        </MenuItem>
        <MenuItem value={"pitch_velocity"}>Velocity</MenuItem>
        <MenuItem value={"pitch_movement"}>Break</MenuItem>
        <MenuItem value={"pitch_control"}>Control</MenuItem>
        <MenuItem value={"playerprofileadvanced__average_contact"}>
          Contact
        </MenuItem>
        <MenuItem value={"playerprofileadvanced__average_power"}>
          Power
        </MenuItem>
        <MenuItem value={"speed"}>Speed</MenuItem>
        <MenuItem value={"fielding_ability"}>Fielding</MenuItem>
      </Select>
      <FormHelperText>
        When generating the Starting Pitchers, what attribute should be
        focused on.
      </FormHelperText>
    </FormControl>
  )
}

export default StartingPitcherForm;