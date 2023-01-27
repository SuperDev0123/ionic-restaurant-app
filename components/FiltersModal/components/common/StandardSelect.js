import {
  MenuItem,
  Select,
  FormControl,
  ListItemText,
  InputLabel,
  FormHelperText,
} from "@mui/material"

function StandardSelect({
  label,
  name,
  onChange,
  value,
  options,
  helperText,
}) {

  const helperTextComponent = helperText ? (
    <FormHelperText>{helperText}</FormHelperText>
  ) : null

  return (
    <FormControl fullWidth>
      <InputLabel name={`${name}-label`}>{label}</InputLabel>
      <Select
        name={name}
        labelname={`${name}-label`}
        multiple
        value={value || []}
        onChange={onChange}
        renderValue={selected => selected.join(", ")}
      >
        {options.map(value => (
          <MenuItem key={value} value={value}>
            <ListItemText primary={value} />
          </MenuItem>
        ))}
      </Select>
      {helperTextComponent}
    </FormControl>
  )
}

export default StandardSelect;