import { styled } from "@mui/system"
import useAuth from "@useAuth"

const AdDiv = styled("div")`
  background: none;
  max-width: 100%;
  z-index: -1;

  &.leaderboard {
    min-height: 60px;
    ${props => props.theme.breakpoints.up("md")} {
        min-height: 100px;
    }
  }
  &.medium-rec {
    min-height: 100px;
    ${props => props.theme.breakpoints.up("md")} {
        min-height: px;
    }
  }
  &.sidebar-top {
    margin-bottom: 2rem;
  }
  &.sidebar-bottom {
    margin-top: 2rem;
  }
  &.margin-top {
    margin-top: 2rem;
  }
  &.margin-bottom {
    margin-bottom: 2rem;
  }
`
const AdBlock = ({ id, type }) => {
  const { currentUserIsSilverPlus } = useAuth()

  if (currentUserIsSilverPlus) return null
  return <AdDiv id={id} className={type} />
}
export default AdBlock
