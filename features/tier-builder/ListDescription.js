import {
  Typography,
  IconButton,
  TextField as MuiTextField,
  InputAdornment,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import { useState } from "react";

function ListDescription({
  description,
  setDescription,
}) {
  const [editMode, setEditMode] = useState(false);

  let handleDescriptionChange = e => {
    setDescription(e.target.value)
  }

  return (
    <>
      {editMode ? (
        <MuiTextField
          value={description}
          placeholder="Describe your tier list..."
          disabled={!editMode}
          onChange={handleDescriptionChange}
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
        <Typography variant="p">
          {description ? description : "Tier List description..."}
          <IconButton onClick={() => setEditMode(!editMode)}>
            <EditIcon />
          </IconButton>
        </Typography>
      )}
    </>
  )
}

export default ListDescription;