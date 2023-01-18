import Link from "@components/OurLink";
import { Button } from "@mui/material";

export default function ViewCardButton({parentWidth, playerId, isVisible}) {
  if(playerId === undefined || !isVisible) return null;

  const width = parentWidth / 2.25;
  const height = parentWidth / 5.8;

  const style = {
    width: width,
    height: height,
    fontSize: parentWidth / 14,
    left: - (width / 2 - height / 2) - 1,
    top: "calc(50% - " + (height / 2) + "px)",
    zIndex: 5,
  }

  return (
    <Button
      size="small"
      component={Link}
      target="_blank"
      href={"https://showzone.io/players/" + playerId}
      variant="contained"
      color="secondary"
      style={style}
      onClick={(e) => e.stopPropagation()}
    >
      View Card
    </Button>
  )
}