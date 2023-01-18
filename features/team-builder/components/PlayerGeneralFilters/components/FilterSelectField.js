import { FormControl, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";

export function FilterSelectField({title, name, value, onChange, paramsObj}) {
  return (
    <FormControl fullWidth>
      <InputLabel name={`${name}-label`}>{title}</InputLabel>
      <Select
        name={name}
        labelname={`${name}-label`}
        multiple
        value={value}
        onChange={onChange}
        renderValue={selected => selected.join(", ")}
      >
        {paramsObj.map(param => (
          <MenuItem key={param} value={param}>
            <ListItemText primary={param} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
