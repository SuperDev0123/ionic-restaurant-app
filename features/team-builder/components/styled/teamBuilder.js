import { styled } from "@mui/system";
import { Accordion as MuiAccordion, TextField as MuiTextField} from "@mui/material";

export const TextField = styled(MuiTextField)`
  input {
    font-size: 1.75rem;
    padding: 0.5rem;
    margin: 0;
  }
`

export const SaveBlock = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
  ${props => props.theme.breakpoints.up("md")} {
    flex-direction: row;
  }
`

export const Accordion = styled(MuiAccordion)`
  margin-bottom: 1rem;
  padding: 0.5rem;
`