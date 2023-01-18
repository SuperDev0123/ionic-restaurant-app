import {
  Typography,
  Button,
  IconButton,
} from "@mui/material"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useState } from "react"
import { useRouter } from "next/router"

function RosterActions({
  isSaving,
  rosterPrivate,
  handlePrivateCheck,
  saveRoster,
  currentUser,
  userLoaded,
  data
}) {
  const router = useRouter();
  const [disabledCancel, setDisabledCancel] = useState(false);

  const cancelEditing = () => {
    setDisabledCancel(true);
    router.push("/players/team-builder/" + data.id);
  }

  return (
    <div className="rosterActions">
      {isSaving ? (
        <Button variant="contained" disabled={true}>
          Saving... please wait...
        </Button>
      ) : (
        <>
          {rosterPrivate ? (
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <Typography variant="caption">Roster is Private</Typography>
              <IconButton onClick={() => handlePrivateCheck(false)}>
                <VisibilityOffIcon />
              </IconButton>
            </div>
          ) : (
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <Typography variant="caption">Roster is Public</Typography>
              <IconButton onClick={() => handlePrivateCheck(true)}>
                <VisibilityIcon />
              </IconButton>
            </div>
          )}
          {data?.id ? (
            <Button
              variant="contained"
              sx={{ marginLeft: "1rem" }}
              onClick={cancelEditing}
              disabled={disabledCancel}
            >
              Cancel
            </Button>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            sx={{ marginLeft: "1rem" }}
            onClick={saveRoster}
            disabled={!userLoaded || !currentUser}
          >
            Save
          </Button>
        </>
      )}
    </div>
  )
}

export default RosterActions;