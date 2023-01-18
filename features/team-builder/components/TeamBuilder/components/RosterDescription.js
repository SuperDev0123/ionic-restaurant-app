import {
  Typography,
  IconButton,
  TextField as MuiTextField,
  InputAdornment,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"

function RosterDescription({rosterDescription, editModeDescription, handleDescriptionChange, handleEditModeDescription}) {
  return (
    <>
      {editModeDescription ? (
        <MuiTextField
          value={rosterDescription}
          placeholder="Describe your roster..."
          disabled={!editModeDescription}
          onChange={handleDescriptionChange}
          sx={{ margin: 0, width: "100%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleEditModeDescription}>
                  <CheckIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <Typography variant="p">
          {rosterDescription ? rosterDescription : "Roster description..."}
          <IconButton onClick={handleEditModeDescription}>
            <EditIcon />
          </IconButton>
        </Typography>
      )}
    </>
  )
}

export default RosterDescription;