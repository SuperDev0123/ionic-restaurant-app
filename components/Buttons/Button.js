import { styled } from "@mui/system"

function Button({ children, size, color, href, onClick, disabled, variant, style }) {
  const ShowZoneButton = styled("a")`
    cursor: pointer;
    display: inline-block;
    transform: skewX(-20deg);
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
    color: ${color === "white"
      ? "#fff"
      : color === "gold"
      ? props => props.theme.palette.primary.gold
      : props => props.theme.palette.primary.main};
    line-height: 1.5;
    border: ${size === "xl" ? "4px" : "2px"} solid
      ${color === "white"
        ? "#fff"
        : color === "gold"
        ? props => props.theme.palette.primary.gold
        : props => props.theme.palette.primary.main};
    padding: ${size === "xl" ? ".5rem 1rem" : size === "sm" ? ".35rem .5rem" : size === "xs" ? ".25rem .5rem" : ".5rem 1rem"};
    font-size: ${size === "xl" ? "1.25rem" : size === "sm" ? ".75rem" : size === "xs" ? ".65rem" : "1rem"};
    ${props => props.theme.breakpoints.up("md")} {
      padding: ${size === "xl" ? "1rem 2rem" : size === "sm" ? ".5rem 1rem" : size === "xs" ? ".25rem .5rem" : ".5rem 1rem"};
      font-size: ${size === "xl" ? "2rem" : size === "sm" ? ".75rem" : size === "xs" ? ".65rem" : "1rem"};
    }
    &:hover:not(.disabled) {
      background: ${color === "white"
        ? "#fff"
        : color === "gold"
        ? props => props.theme.palette.primary.gold
        : props => props.theme.palette.primary.main};
      color: ${color === "white" ? "#000" : "#fff"};
    }
    span {
      transform: skewX(20deg);
      display: flex;
      align-items: center;
      span {
        display: none;
        transform: skewX(0deg);
        ${props => props.theme.breakpoints.up("sm")} { 
            display: inline-block;
        }
      }
      svg {
        width: 20px;
      }
    }
    &.filled {
      background: ${color === "white"
        ? "#fff"
        : color === "gold"
        ? props => "rgba(186, 16, 12, .9)"
        : props => "rgba(237, 32, 36, .9)"};
      color: ${color === "white" ? "#000" : "#fff"};
      &:hover {
        background: ${color === "white"
        ? "#fff"
        : color === "gold"
        ? props => "rgba(186, 16, 12, 1)"
        : props => "rgba(237, 32, 36, 1)"};
      }
    }
    &.round {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transform: skewX(0deg);
        height: 40px;
        width: 40px;
        & span {
            transform: skewX(0deg);
        }
    }
    &.disabled {
      opacity: 0.35;
      cursor: default;
    }
  `
  return (
    <>
      {disabled ? (
        <ShowZoneButton className={`disabled ${variant}`} style={style}>
          <span>{children}</span>
        </ShowZoneButton>
      ) : (
        <ShowZoneButton href={href} onClick={onClick} className={`${variant}`} style={style}>
          <span>{children}</span>
        </ShowZoneButton>
      )}
    </>
  )
}

export default Button
