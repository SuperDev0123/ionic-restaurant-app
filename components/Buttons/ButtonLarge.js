import { styled } from "@mui/system"
import Grid from "@mui/material/Grid"
import MuiButton from "@mui/material/Button"

const Button = styled(MuiButton)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  width: 100%;
  color: #fff;
  line-height: 1.5;
  border: 2px solid #fff;
  height: 250px;
  transform: skewX(-3deg);
  &:hover {
    background: ${props => props.theme.palette.primary.main}
  }
`
const BigText = styled("p")`
  font-size: 3rem;
  margin: 0;
  line-height: 1;
  margin: 3px 0 8px;
  transform: skewX(3deg);
`
const SmallText = styled("p")`
  font-size: 1.5rem;
  margin: 0;
  line-height: 1;
  transform: skewX(3deg);
`

function ButtonLarge( props ) {
  return (
    <Button href={props.href}>
      <SmallText>{props.topText}</SmallText>
      <BigText>{props.bigText}</BigText>
      <SmallText>{props.bottomText}</SmallText>
    </Button>
  )
}

export default ButtonLarge
