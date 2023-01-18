import { useCallback } from "react"
import { useRouter } from "next/router"
import {
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material"

import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"

import axios from "axios"
import { updateOnePlayer } from "../../../../utils/roster-for-builder-context"
import { PlayerListing, PlayerOverall, PlayerSeries } from "../../../styled/teamBuilderGroup";
import { ModalPaper } from "../../../styled/others";

const PlayerSearchModal = ({
  position: playerPosition,
  playerType,
  setPlayersForRoster,
  handleCloseModal,
  openModal,
  fetchDataPlayerSearch,
  playerSearchData,
  positionLong,
}) => {
  const router = useRouter()

  const addPlayerToRoster = useCallback(
    async player => {
      try {
        const {
          data: { img: playerImage, name: playerName, overall },
        } = await axios.get(
          `https://api.showzone.io/api/player-profiles/${player.card_id}`
        )
        setPlayersForRoster(prevState =>
          updateOnePlayer(
            prevState,
            playerType,
            playerPosition,
            player.card_id,
            playerImage,
            playerName,
            overall
          )
        )
        handleCloseModal()
      } catch (err) {
        console.log(err)
      }
    },
    [playerPosition, handleCloseModal, router]
  )

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ModalPaper>
        <Box>
          <Typography variant="h6" component="h2">
            Select a Player for {positionLong}
          </Typography>
          <IconButton
            aria-label="close"
            className="closeModalIcon"
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={fetchDataPlayerSearch}
            fullWidth
          />
          {playerSearchData.map(player => (
            <PlayerListing
              key={`team-builder-search-modal-player-${player.card_id}`}
              onClick={() => addPlayerToRoster(player)}
            >
              <span>
                <PlayerOverall>
                  <span>OVR</span>
                  {player.overall}
                </PlayerOverall>
                <div>
                  <PlayerSeries>{player.series}</PlayerSeries>
                  <Typography variant="h6">
                    {player.name} / {player.display_position}
                  </Typography>
                  <PlayerSeries>
                    Secondary: {player.display_secondary_positions.join(", ")}
                  </PlayerSeries>
                </div>
              </span>
              <div>
                <PlayerSeries>
                  True Overall: {player.playerprofileadvanced?.overall_true}
                </PlayerSeries>
                <PlayerSeries>
                  Bats/Throws: {player.bat_hand}/{player.throw_hand}
                </PlayerSeries>
              </div>
            </PlayerListing>
          ))}
        </Box>
      </ModalPaper>
    </Modal>
  )
}

export default PlayerSearchModal
