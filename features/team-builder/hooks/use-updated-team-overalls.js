import { useState, useCallback, useEffect } from "react"
import axios from "axios"

import recursiveSearch from "../utils/recursive-search"

const useUpdatedTeamOveralls = players => {
  const [teamOveralls, setTeamOveralls] = useState({})
  const updateTeamOveralls = useCallback(async thePlayers => {
    try {
      const playersQs = recursiveSearch(thePlayers, "player")
        .split(",")
        .filter(ps => !!ps)
        .join(",")
      if (!playersQs) return
      const { data: newTeamOveralls } = await axios.post(
        "https://api.showzone.io/api/team-builder/generate-overalls",
        {
          roster: recursiveSearch(thePlayers, "player"),
        }
      )
      setTeamOveralls(newTeamOveralls)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    updateTeamOveralls(players)
  }, [players, updateTeamOveralls])

  return teamOveralls
}

export default useUpdatedTeamOveralls
