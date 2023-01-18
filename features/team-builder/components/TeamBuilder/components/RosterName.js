import {
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import { TextField } from "../../styled/teamBuilder";

function RosterName({rosterName, editModeTitle, handleRosterNameChange, handleEditModeTitle}) {
  return (
    <>
      {editModeTitle ? (
        <TextField
          name="rosterName"
          value={rosterName}
          placeholder="Name your roster..."
          disabled={!editModeTitle}
          onChange={handleRosterNameChange}
          sx={{ margin: 0, width: "100%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleEditModeTitle}>
                  <CheckIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <Typography variant="h2">
          {rosterName ? rosterName : "Untitled Roster..."}
          <IconButton onClick={handleEditModeTitle}>
            <EditIcon />
          </IconButton>
        </Typography>
      )}
    </>
  )
}

export default RosterName;