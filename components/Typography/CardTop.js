import { styled } from "@mui/system"
import Typography from "@mui/material/Typography"

function CardTop({ children, smallText, text }) {
  const CardTop = styled("div")`
    padding: 1rem .5rem;
    background: ${props => props.theme.palette.primary.main};
    margin-top: 2rem;
    h4 {
        text-transform: uppercase;
        font-size: 2rem;
        line-height: 1;
        margin: 0;
        & span {
            display: block;
            font-size: 1rem;
            line-height: 1;
        }
    }
  `
  return (
    <CardTop>
        <h4>
            <span>{smallText + " "}</span>
            {text}
        </h4>
    </CardTop>
  )
}

export default CardTop
