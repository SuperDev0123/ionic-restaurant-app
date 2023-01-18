import { createContext, useState, useContext, useEffect, useCallback } from "react"
import { useRouter } from "next/router"
import PlayerGeneralFilters from "../components/PlayerGeneralFilters"
import GeneratorConstraints from "../components/GeneratorConstraints"
import useUpdatedTeamOveralls from "../hooks/use-updated-team-overalls"
import useAuth from "@useAuth"
import axios from "axios"
import { newEmptyRoster } from "../utils/generate-empty-roster"

const TeamBuilderContext = createContext()

export const useTeamBuilderContext = () => useContext(TeamBuilderContext)

export const TeamBuilderContextProvider = ({ children }) => {
  const { query } = useRouter()
  const [openFilters, setOpenFilters] = useState(false)
  const [openGeneratorConstraints, setOpenGeneratorConstraints] =
    useState(false)
  const [generatorConstraints, setGeneratorConstraints] = useState([])
  const [filters, setFilters] = useState([])  
  const [playersForRoster, setPlayersForRoster] = useState(newEmptyRoster())
  const teamOveralls = useUpdatedTeamOveralls(playersForRoster)
  const [optimizeButtonActive, setOptimizeButtonActive] = useState(false)
  const [inventoryExists, setInventoryExists] = useState(false)
  const {
    currentUser,
    userLoaded,
  } = useAuth()
  const contextValues = {
    openFilters,
    filters,
    teamOveralls,
    playersForRoster,
    optimizeButtonActive,
    generatorConstraints,
    setGeneratorConstraints,
    setPlayersForRoster,
    setOpenFilters,
    setOpenGeneratorConstraints,
    setFilters,
    setOptimizeButtonActive,
  }

  const checkOptimizeButton = () => {}

  const fetchData = useCallback(async () => {
    if (userLoaded) {
      axios
        .get(`https://api.showzone.io/api/user-inventory/${currentUser?.uid}/`)
        .then(async getUserInventoryBaseData => {
          if (getUserInventoryBaseData.data) {
            setInventoryExists(true)
          }
        })
        .catch(err => {})
    }
  }, [currentUser?.uid, userLoaded])

  useEffect(() => { fetchData(); }, [fetchData, userLoaded])

  useEffect(() => {
    async function setPlayersAndOptimizeButton() {
      // await setPlayersForRoster(extractPlayersFromQueries(query))
      if (
        playersForRoster.batters.catcher.player &&
        playersForRoster.batters.first_base.player &&
        playersForRoster.batters.second_base.player &&
        playersForRoster.batters.third_base.player &&
        playersForRoster.batters.short_stop.player &&
        playersForRoster.batters.left_field.player &&
        playersForRoster.batters.center_field.player &&
        playersForRoster.batters.right_field.player &&
        playersForRoster.batters.bench_1.player &&
        playersForRoster.batters.bench_2.player &&
        playersForRoster.batters.bench_3.player &&
        playersForRoster.batters.bench_4.player &&
        playersForRoster.batters.bench_5.player
      ) {
        setOptimizeButtonActive(true)
      }
    }
    setPlayersAndOptimizeButton()
  }, [
    playersForRoster.batters.bench_1.player,
    playersForRoster.batters.bench_2.player,
    playersForRoster.batters.bench_3.player,
    playersForRoster.batters.bench_4.player,
    playersForRoster.batters.bench_5.player,
    playersForRoster.batters.catcher.player,
    playersForRoster.batters.center_field.player,
    playersForRoster.batters.first_base.player,
    playersForRoster.batters.left_field.player,
    playersForRoster.batters.right_field.player,
    playersForRoster.batters.second_base.player,
    playersForRoster.batters.short_stop.player,
    playersForRoster.batters.third_base.player,
    query,
  ])

  return (
    <TeamBuilderContext.Provider value={contextValues}>
      <PlayerGeneralFilters
        openFilters={openFilters}
        setOpenFilters={setOpenFilters}
        setFilters={setFilters}
        filters={filters}
        inventoryExists={inventoryExists}
      />
      <GeneratorConstraints
        openGeneratorConstraints={openGeneratorConstraints}
        setOpenGeneratorConstraints={setOpenGeneratorConstraints}
        setGeneratorConstraints={setGeneratorConstraints}
        generatorConstraints={generatorConstraints}
        filters={filters}
      />
      {children}
    </TeamBuilderContext.Provider>
  )
}

export default TeamBuilderContext
