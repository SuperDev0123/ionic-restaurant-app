import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import PlayerComparisonTable from "./PlayerComparisonTable"
import PlayerSearchModal from "./PlayerSearchModal"
import _ from 'lodash'

export const MAX_PLAYERS = 5

const PlayerComparison = () => {
  const router = useRouter()
  let [data, setData] = useState([])
  const [originalData, setOriginalData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [reachedMaxPlayers, setReachedMaxedPlayers] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)
  const [parallel, setParallel] = useState(0)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const {
        data: { results },
      } = await axios.get(
        `https://api.showzone.io/api/player-profiles/?format=json&card_id=${router.query?.players}&order_by=dsc overall`
      )

      let players = results.map(player => {
        player.parallel = 0
        return player
      })
      setData(players)
      setOriginalData(players)
      

    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [router.query?.players])

  useEffect(() => { fetchData(); }, [router.query?.players])

  useEffect(() => {
    if (
      router.query?.players &&
      router.query?.players.split(",").length >= MAX_PLAYERS
    ) {
      setReachedMaxedPlayers(true)
    } else {
      setReachedMaxedPlayers(false)
    }
  }, [router.query?.players])



  const updatePlayer = (player, $event) => {
    console.log('player', player)
    let newData = JSON.parse(JSON.stringify(originalData))


    let foundPlayer = newData.find(checkPlayer => {
      return checkPlayer.card_id === player.card_id
    })

    foundPlayer.parallel = parseInt($event)

    Object.keys(foundPlayer).map(key => {
      if(typeof foundPlayer[key] == 'number' && key !== 'age' && key !== 'parallel' && key !== 'overall') {
        foundPlayer[key] = foundPlayer[key] + parseInt($event)

        if(key === 'stamina' || key === 'pitching_clutch' || key === 'hits_per_bf' || key === 'k_per_bf' || key === 'bb_per_bf' || key === 'contact_right' || key === 'contact_left' || key === 'power_right' || key === 'power_left' || key === 'plate_vision' || key === 'plate_discipline' || key === 'batting_clutch') {
          if(foundPlayer[key] > 125) {
            foundPlayer[key] = 125
          }
        } else {
          if(foundPlayer[key] > 99) {
            foundPlayer[key] = 99
          }
        }
      }
    })

    if($event > 0) {
      foundPlayer.playerprofileadvanced.overall_true = foundPlayer.playerprofileadvanced[`overall_${foundPlayer.display_position.toLowerCase()}_${$event}`]
    } else {
      console.log('here', `overall_${foundPlayer.display_position}`)
      foundPlayer.playerprofileadvanced.overall_true = foundPlayer.playerprofileadvanced[`overall_${foundPlayer.display_position.toLowerCase()}`]
    }

    let players = data.map(updatedPlayer => {
      if(updatedPlayer.card_id === foundPlayer.card_id) {
        updatedPlayer = foundPlayer
      }

      return updatedPlayer
    })


    
    
    setData(players)
    
  }

  // useEffect(() => {

  // }, [data])

  return (
    <>
      <PlayerComparisonTable
        players={data}
        hideAddButton={reachedMaxPlayers}
        onAddPlayer={handleOpenModal}
        updatePlayer={updatePlayer}
        parallel={parallel}
      />
      <PlayerSearchModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        playersToExclude={router.query?.players}
      />
    </>
  )
}

export default PlayerComparison
