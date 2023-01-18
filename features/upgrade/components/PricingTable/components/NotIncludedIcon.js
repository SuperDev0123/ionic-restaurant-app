import {Tooltip} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";


function NotIncludedIcon() {
  const style = {width: '.9em', height: '.9em'};
  return (
    <Tooltip title="Not included">
      <RemoveIcon style={style}/>
    </Tooltip>
  )
}

export default NotIncludedIcon;