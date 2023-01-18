import { styled } from "@mui/system"
import MuiTableCell from "@mui/material/TableCell"
import { hsl } from "polished"

const TableCell = styled(MuiTableCell)`
  width: 210px !important;
  max-width: 210px !important;
`

const CellHighlightHighValue = props => {

  const assignColour = (dataArray, attribute) => {
    var uniqueValues = new Set(dataArray)

    var sort = Array.from(uniqueValues).sort((a,b) => { return b - a })

    var i = 0

    var sortMax = Math.max(...sort)
    var sortMin = Math.min(...sort)
    
    var percent = 0
    if(sortMax > 0) {
      percent = ((attribute - sortMin)*100)/(sortMax - sortMin)
    }
    var hue = Math.floor((percent) * 120 / 100) 
    
    return { backgroundColor: `hsl(${hue},50%,20%)` }

    // if(highValue === attribute) {
    //   return { backgroundColor: colours[0] }
    // }
    // if(lowValue === attribute) {
    //   return { backgroundColor: colours[4] }
    // }
  }


  let dataArray = []
  const attribute = eval("props.player." + props.attribute_name)
  props.players.forEach(p => {
    dataArray.push(eval("p." + props.attribute_name))
  })

  // if (attribute == highValue) {
  //   return <TableCell className="highlightCell">{attribute}</TableCell>
  // } else {
    return <TableCell style={assignColour(dataArray, attribute)}>{attribute}</TableCell>
  // }
}

export default CellHighlightHighValue
