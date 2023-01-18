import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/router"
import { styled } from "@mui/system"
import {
  Box,
  Typography,
  Paper as MuiPaper,
  InputAdornment,
  Modal,
  TextField,
  IconButton,
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material"

import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"

import axios from "axios"
import debounce from "lodash/debounce"

const ModalPaper = styled(MuiPaper)`
  position: relative;
  width: 500px;
  padding: 2rem;
  max-width: 100%;
  max-height: 80vh;
  height: 80vh;
  overflow: scroll;
  h2 {
    margin-bottom: 2rem;
  }
  .closeModalIcon {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
  .doneModalIcon {
    position: absolute;
    right: 4rem;
    top: 1rem;
  }
  .MuiFormControl-root {
    margin-bottom: 2rem;
  }
`

const PlayerListing = styled("div")`
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
const PlayerOverall = styled("div")`
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

const PlayerSeries = styled("div")`
  font-size: 0.75rem;
`

const PlayerSearchModal = ({
  handleCloseModal,
  openModal,
  playersToExclude,
}) => {
  const router = useRouter()
  const [playerSearchData, setPlayerSearchData] = useState([])
  const [includeLegacyPlayers, setIncludeLegacyPlayers] = useState(false)
  let gamesToInclude = "MLB The Show 22"
  if(includeLegacyPlayers) {
      gamesToInclude = "MLB The Show 22, MLB The Show 21, MLB The Show 20, MLB The Show 19, MLB The Show 20";
  } else {
      gamesToInclude = "MLB The Show 22";
  }
  const addPlayerForComparison = useCallback(
    player => {
      let playersParams = router.query.players
      if (playersParams !== undefined) {
        playersParams = playersParams + "," + player.card_id
      } else {
        playersParams = player.card_id
      }
      handleCloseModal()
      router.push(`/players/compare?players=${playersParams}`)
    },
    [router, handleCloseModal]
  )

  const fetchPlayersForComparison = useCallback(async () => {
    try {
      const searchPlayersResponse = await axios.get(
        `https://api.showzone.io/api/player-profiles/?format=json&game=${gamesToInclude}&order_by=desc%20playerprofileadvanced__overall_true&exclude_card_id=${playersToExclude}`
      )
      setPlayerSearchData(searchPlayersResponse.data.results)
    } catch (err) {
      console.error(err)
    }
  }, [playersToExclude])

  const fetchDataPlayerSearch = useCallback(
    debounce(async event => {
      try {
        const searchTerm = event.target.value
        const searchedPlayersRes = await axios.get(
          `https://api.showzone.io/api/player-profiles/?format=json&search=${searchTerm}&game=${gamesToInclude}&exclude_card_id=${playersToExclude}&order_by=desc%20playerprofileadvanced__overall_true`
        )
        setPlayerSearchData(searchedPlayersRes.data.results)
      } catch (err) {
        console.log(err)
      }
    }, 300),
    [playersToExclude]
  )

  useEffect(() => {
    if (openModal) {
      fetchPlayersForComparison()
    }
  }, [openModal])


  const handleSwitchChange = (event) => {
    setIncludeLegacyPlayers(event.target.checked);
    // fetchDataPlayerSearch();
  };

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
            Search for Players to Compare
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
        {/* <FormControlLabel
            value="include_legacy_players"
            control={<Switch color="primary" />}
            label="Include Legacy Players?"
            labelPlacement="start"
            sx={{marginBottom: "1rem"}}
            onChange={handleSwitchChange}
            checked={includeLegacyPlayers}
        /> */}
          {playerSearchData.map(player => (
            <PlayerListing
              key={player.card_id}
              onClick={() => addPlayerForComparison(player)}
            >
              <span>
                <PlayerOverall>
                  <span>OVR</span>
                  {player.overall}
                </PlayerOverall>
                <div>
                  <PlayerSeries>{player.series}</PlayerSeries>
                  <Typography variant="h6">{player.name}</Typography>
                </div>
              </span>
              <div>
                <PlayerSeries>{player.game}</PlayerSeries>
              </div>
            </PlayerListing>
          ))}
        </Box>
      </ModalPaper>
    </Modal>
  )
}

export default PlayerSearchModal
