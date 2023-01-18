import { styled } from "@mui/system";

export const PlayerButtonWrapper = styled("div")`
  position: relative;
  margin-right: 1rem;
  margin-bottom: 1rem;
  a {
    position: absolute;
    z-index: 99;
    bottom: 7rem;
    left: -25px;
    transform: rotate(-90deg);
  }
`

export const AddPlayerButton = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 168px;
  height: 238px;
  font-weight: bold;
  background: ${props => props.theme.palette.background.paper};
`

/* PlayerSearchModal */
export const PlayerListing = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  ${props => props.theme.breakpoints.up("md")} {
    font-size: 1.2rem;
  }
  &:hover {
    background: red;
  }
  span {
    display: flex;
    align-items: center;
  }
`

export const PlayerOverall = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1;
  margin-right: 1rem;
  span {
    font-size: 0.75rem;
  }
`

export const PlayerSeries = styled("div")`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
`