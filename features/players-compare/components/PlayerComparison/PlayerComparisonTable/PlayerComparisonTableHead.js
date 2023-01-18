import { useCallback, useEffect } from "react"
import { useRouter } from "next/router"
import { styled } from "@mui/system"
import {
  TableRow,
  TableCell as MuiTableCell,
  TableHead,
  IconButton as MuiIconButton,
} from "@mui/material"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import CloseIcon from "@mui/icons-material/Close"
import AddIcon from "@mui/icons-material/Add"
import Image from "next/image";
const diamondBg = "/images/bg-rarity-diamond.jpg"

const TableCell = styled(MuiTableCell)`
  width: 210px !important,
  max-width: 210px !important,
`
 
const CardArt = styled("div")`
  display: inline-block;
  position: relative;
  background: url(${diamondBg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 210px;
  height: 296px;
  .overallRating {
    position: absolute;
    right: 9px;
    top: 8px;
    z-index: 999;
    span {
      position: absolute;
      font-size: 1.25rem;
      font-weight: bold;
      top: 9px;
      left: 12px;
      text-shadow: 2px 2px 8px #000;
    }
    img {
      width: 50px;
    }
  }
`





const AddPlayerButton = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 210px;
  height: 296px;
  cursor: pointer;
  font-weight: bold;
  background: ${props => props.theme.palette.background.paper};
`

const RemoveButton = styled(MuiIconButton)`
  position: absolute;
  top: 5px;
  left: 5px;
  opacity: 0.5;
  background: ${props => props.theme.palette.background.paper};
  &:hover {
    opacity: 1;
    background: ${props => props.theme.palette.background.paper};
  }
  svg {
    fill: #fff;
  }
`

const PlayerComparisonTableHead = ({
  players = [],
  updatePlayer,
  parallel,
  hideAddButton = false,
  onAddPlayer = () => ({}),
}) => {
  const router = useRouter()
  const removePlayerForComparison = useCallback(
    player => {
      const newPlayers = router.query?.players
        .split(",")
        .filter(item => item !== player.card_id)
        .join(",")
      router.push(
        newPlayers.length === 0
          ? "/players/compare"
          : `/players/compare?players=${newPlayers}`
      )
    },
    [router]
  )

  const handleParallel = (player, $event) => {
    updatePlayer(player, $event.target.value)
  }

  

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        {players.map(player => (
          <TableCell key={player.card_id}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Parallel Level</InputLabel>
              { player.game === 'MLB The Show 22' ? <Select
                native
                value={player.parallel}
                label="Parallel Level"
                onChange={ ($event) => handleParallel(player, $event) }
              >
                <option value={0}>Unparalleled</option>
                <option value={1}>Parallel I</option>
                <option value={2}>Parallel II</option>
                <option value={3}>Parallel III</option>
                <option value={4}>Parallel IV</option>
                <option value={5}>Parallel V</option>
              </Select> : null }
            </FormControl> 
            <br /><br />
            <CardArt>
              <div className="overallRating">
                <span>{player?.overall ?? ""}</span>
                <img
                  className="rarityShield"
                  src={pickRarityIcon(player)}
                  alt="Rarity shield"
                />
              </div>

              {player?.img ? (
                <Image
                  src={player?.img}
                  alt={player?.name + " card art" ?? ""}
                  width={210}
                  height={296}
                />
              ) : (
                <Image
                  src={
                    "https://storage.googleapis.com/showzone-cloud/card-images/default-actionshot.jpg"
                  }
                  alt={player?.name + " card art" ?? ""}
                  width={210}
                  height={296}
                />
              )}
              <RemoveButton
                size="small"
                color="secondary"
                onClick={() => removePlayerForComparison(player)}
                player={player.card_id}
              >
                <CloseIcon />
              </RemoveButton>
            </CardArt>

            
          </TableCell>
        ))}
        {!hideAddButton ? (
          <TableCell>
            <AddPlayerButton onClick={onAddPlayer}>
              <AddIcon />
              Add Player
            </AddPlayerButton>
          </TableCell>
        ) : (
          ""
        )}
      </TableRow>
    </TableHead>
  )
}

export default PlayerComparisonTableHead

function pickRarityIcon(player) {
  let rarityIcon =
    "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-common.png"
  if (player.overall > 84) {
    rarityIcon =
      "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-diamond.png"
  } else if (player.overall > 79) {
    rarityIcon =
      "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-gold.png"
  } else if (player.overall > 70) {
    rarityIcon =
      "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-silver.png"
  } else if (player.overall > 55) {
    rarityIcon =
      "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-bronze.png"
  } else {
    rarityIcon =
      "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-common.png"
  }

  return rarityIcon
}
