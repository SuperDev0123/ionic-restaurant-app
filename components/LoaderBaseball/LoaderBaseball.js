import { styled, spacing } from "@mui/system"
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball"

const Spinner = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 9999;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: #212121;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  svg {
    fill: #fff;
    height: 100px;
    width: 100px;
    animation-name: spin;
    animation-duration: 1500ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`

const LoaderBaseball = () => (
  <Spinner>
    <SportsBaseballIcon />
  </Spinner>
)

export default LoaderBaseball
