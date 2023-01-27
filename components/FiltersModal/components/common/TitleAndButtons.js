import {
  IconButton,
  Typography,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DoneIcon from "@mui/icons-material/Done"

function TitleAndButtons({ onClose, handleFilterSubmit }) {
  return (
    <>
      <Typography component="h2" variant="h6">
        Filter Data
      </Typography>
      <IconButton
        aria-label="close"
        className="closeModalIcon"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <IconButton
        aria-label="submit"
        className="doneModalIcon"
        onClick={handleFilterSubmit}
      >
        <DoneIcon />
      </IconButton>
    </>
  )
}

export default TitleAndButtons;