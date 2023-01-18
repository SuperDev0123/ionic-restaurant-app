import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {Tooltip} from "@mui/material";


function IncludedIcon() {
  const style = {width: '.9em', height: '.9em'};
  return (
    <Tooltip title="Included">
      <CheckCircleIcon color="info" style={style}/>
    </Tooltip>
  )
}

export default IncludedIcon;