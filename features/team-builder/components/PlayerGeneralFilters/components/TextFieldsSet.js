import { TextField } from "@mui/material";

function TextFieldsSet({arrayOfData, handleFilterChange, filters}) {
  const defaultStyle = { width: "48%" };
  return arrayOfData.map((data, key) => {
    return (
      <TextField
        key={`general-filter-field-${key}`}
        name={data.name}
        style={data.style ? data.style : defaultStyle}
        value={filters[data.name]}
        onChange={handleFilterChange}
        label={data.label}
      />
    )
  });
}

export default TextFieldsSet;
