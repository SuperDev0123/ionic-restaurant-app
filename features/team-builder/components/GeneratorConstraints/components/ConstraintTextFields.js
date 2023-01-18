import { TextField } from "@mui/material";

const constraintKeys = [
    {key: "cons_max_cost", label: "Maximum Team Cost"},
    {key: "cons_max_ovr", label: "Maximum Team Overall"},
    {key: "cons_min_lsw", label: "Minimum Lefty/Switch Hitters"},
    {key: "cons_min_lsp", label: "Minimum Lefty Starting Pitchers"},
    {key: "cons_min_lrp", label: "Minimum Lefty Relief Pitchers"},
];

function ConstraintTextFields({generatorConstraints, onChange, disabled}) {
    return constraintKeys.map((constraint, key) => {
      return (
        <TextField
          key={`constraint-text-${key}`}
          name={constraint.key}
          style={{ width: "100%" }}
          value={generatorConstraints[constraint.key]}
          onChange={onChange}
          label={constraint.label}
          disabled={disabled}
        />
      )
    });
  }

  export default ConstraintTextFields;