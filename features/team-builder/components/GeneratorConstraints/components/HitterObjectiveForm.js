import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

function HitterObjectiveForm({value, onChange, disabled}) {
  return (
    <FormControl style={{ width: "100%" }}>
      <InputLabel id="hitter-objective-helper-label">
        Hitter Objective
      </InputLabel>
      <Select
        labelId="hitter-objective-helper-label"
        id="card-type-helper"
        onBlur=""
        name="objective_hit"
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
        When generating the Hitters, what attribute should be focused on.
      </FormHelperText>
    </FormControl>
  )
}

export default HitterObjectiveForm;