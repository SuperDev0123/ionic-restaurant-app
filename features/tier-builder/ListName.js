import {
  Typography,
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
// import { TextField } from "../../styled/teamBuilder";
import { styled } from "@mui/system";
import { useState } from "react";

export const TextField = styled(MuiTextField)`
  input {
    font-size: 1.75rem;
    padding: 0.5rem;
    margin: 0;
  }
`

function ListName({
  name,
  setName,
}) {
  const [editMode, setEditMode] = useState(false);

  let handleNameChange = e => {
    setName(e.target.value)
  }

  return (
    <>
      {editMode ? (
        <TextField
          name="name"
          value={name}
          placeholder="Name your tier list..."
          disabled={!editMode}
          onChange={handleNameChange}
          sx={{ margin: 0, width: "100%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setEditMode(!editMode)}>
                  <CheckIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <Typography variant="h2">
          {name ? name : "Untitled Tier List..."}
          <IconButton onClick={() => setEditMode(!editMode)}>
            <EditIcon />
          </IconButton>
        </Typography>
      )}
    </>
  )
}

export default ListName;