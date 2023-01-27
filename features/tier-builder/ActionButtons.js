import {
  Typography,
  Button,
  IconButton,
} from "@mui/material"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useState } from "react"
import { useRouter } from "next/router"

function ActionButtons({
  isSaving,
  isPublic,
  setIsPublic,
  save,
  handleFilterOpen,
  currentUser,
  userLoaded,
  data,
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
          {isPublic ? (
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <Typography variant="caption">Tier List is Public</Typography>
              <IconButton onClick={() => setIsPublic(false)}>
                <VisibilityIcon />
              </IconButton>
            </div>
          ) : (
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <Typography variant="caption">Tier List is Public</Typography>
              <IconButton onClick={() => setIsPublic(true)}>
                <VisibilityOffIcon />
              </IconButton>
            </div>
          )}
          <Button
            variant="contained"
            sx={{ marginLeft: "1rem" }}
            onClick={handleFilterOpen}
          >
            Filters
          </Button>
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
            onClick={save}
            disabled={!userLoaded || !currentUser}
          >
            Save
          </Button>
        </>
      )}
    </div>
  )
}

export default ActionButtons;