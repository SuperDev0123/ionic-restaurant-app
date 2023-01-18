import { useState, useCallback } from "react"
import { styled } from "@mui/system"
import AddIcon from "@mui/icons-material/Add"
import Typography from "@mui/material/Typography"
import axios from "axios"
import debounce from "lodash/debounce"
import recursiveSearch from "../../../../utils/recursive-search"
import PlayerSearchModal from "./PlayerSearchModal"
import usePlayerData from "../../../../hooks/use-player-data"
import useAuth from "@useAuth"
import { useTeamBuilderContext } from "../../../../../../features/team-builder/contexts/TeamBuilderContext"
import {
  PlayerButtonWrapper,
  AddPlayerButton as DefaultAddPlayerButton,
} from "../../../styled/teamBuilderGroup";
import PlayerCard from "@components/PlayerCard"

const AddPlayerButton = styled(DefaultAddPlayerButton)`
  cursor: pointer;
`

const PlayerButtonAndSearch = props => {
  const [openModal, setOpenModal] = useState(false)
  const [playerSearchData, setPlayerSearchData] = useState([])
  const { playerData } = usePlayerData(props.player)

  const { currentUserIsGoldPlus, currentUser, userLoaded } = useAuth()
  const { generatorConstraints } = useTeamBuilderContext()
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)
  const fetchDataPlayerSearch = useCallback(
    debounce(async event => {
      setOpenModal(true)
      try {
        const searchTerm = event.target.value || ""
        const excludeSelectedPlayers = recursiveSearch(
          props.playersForRoster,
          "playerName"
        )
        const filterQuery =
          "&" +
          Object.keys(props.filters)
            .map(key => key + "=" + props.filters[key])
            .join("&")

        let url = `https://api.showzone.io/api/player-profiles/?format=json&order_by=desc%20playerprofileadvanced__overall_true&game=MLB The Show 22&search=${searchTerm}&exclude_card_name=${excludeSelectedPlayers}&all_positions=${props.positionShort}&${filterQuery}`

        /// to do - switch must be turned on also
        if (generatorConstraints.user_id) {
          url = `https://api.showzone.io/api/user-inventory/${currentUser.uid}/owned?format=json&order_by=desc%20playerprofileadvanced__overall_true&game=MLB The Show 22&search=${searchTerm}&exclude_card_name=${excludeSelectedPlayers}&all_positions=${props.positionShort}&${filterQuery}`
        }

        const {
          data: { results: newSearchData },
        } = await axios.get(url)
        setPlayerSearchData(newSearchData)
      } catch (err) {
        console.log(err)
      }
    }, 300),
    [
      props.playersForRoster,
      props.filters,
      props.positionShort,
      generatorConstraints.user_id,
    ]
  )

  return (
    <>
      <PlayerButtonWrapper>
        <PlayerSearchModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          positionLong={props.positionLong}
          positionShort={props.positionShort}
          playerSearchData={playerSearchData}
          setPlayersForRoster={props.setPlayersForRoster}
          playersForRoster={props.playersForRoster}
          position={props.position}
          playerType={props.playerType}
          fetchDataPlayerSearch={fetchDataPlayerSearch}
        />
        <Typography variant="caption">{props.positionLong}</Typography>
        <AddPlayerButton onClick={fetchDataPlayerSearch}>
          {props.player && playerData ? (
            <PlayerCard data={playerData} width={168} />
          ) : (
            <AddIcon />
          )}
        </AddPlayerButton>
        
      </PlayerButtonWrapper>
    </>
  )
}

export default PlayerButtonAndSearch
