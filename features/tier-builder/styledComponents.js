import { styled, spacing } from "@mui/system"
import MuiGrid from "@mui/material/Grid"

export const Styles = styled("div")`
  tr {
    white-space: nowrap;
  }
`

export const Grid = styled(MuiGrid)(spacing)

export const Tier = styled("div")`
line-height: 238px;
font-weight: 700;
font-size: 30px;

&.red {
  color: #fb7f7f;
  border-right: 4px solid #fb7f7f;
}
&.orange {
  color: #fcbe7f;
  border-right: 4px solid #fcbe7f;
}
&.orange-yellow {
  color: #fcdf7f;
  border-right: 4px solid #fcdf7f;
}
&.yellow {
  color: #fdff7f;
  border-right: 4px solid #fdff7f;
}
&.yellow-green {
  color: #bfff7f;
  border-right: 4px solid #bfff7f;
}
&.green {
  color: #7fff7e;
  border-right: 4px solid #7fff7e;
}
&.normal {
  font-size: 10px;
  border-right: 4px solid #fff;
}
`
export const ListHeaderBlock = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
  ${props => props.theme.breakpoints.up("md")} {
    flex-direction: row;
  }
`
