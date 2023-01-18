import { Button } from "@mui/material";
import { styled } from "@mui/system";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball"

const Spinner = styled("span")`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  svg {
    height: 15px;
    width: 15px;
    margin-top: 5px;
    animation-name: spin;
    animation-duration: 1500ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`

function GenerateButton({isGenerating, onClick, disabled}) {
  let theComponent = isGenerating ? (
    <Button variant="contained" disabled>
      Generating Roster...
      <Spinner>
        <SportsBaseballIcon />
      </Spinner>
    </Button>
  ) : (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
    >
      Generate Roster
    </Button>
  );

  return theComponent;
}

export default GenerateButton;

