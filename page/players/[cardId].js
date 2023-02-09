import React, { useState, useCallback, useEffect } from "react"
import PageHeaderPlayerProfile from "@components/PageHeaderPlayerProfile"
import PlayerProfile from "../../features/player-profile/components/PlayerProfile"
import { useParams } from "react-router-dom"
import { Skeleton } from "@mui/material"
import { CapacitorHttp } from "@capacitor/core"

function PlayerProfilePage({}) {
  let { cardId } = useParams()
  const [player, setPlayer] = useState("")
  const [loadingPlayer, setLoadingPlayer] = useState(true)

  const getPlayer = async () => {
    setLoadingPlayer(true)
    let options = {
      url: `https://showzone-api-dev.onrender.com/api/player-profiles/${cardId}/?format=json`,
    }
    const response = await CapacitorHttp.request({ ...options, method: "GET" })
    setPlayer(response.data)
    setLoadingPlayer(false)
  }

  useEffect(() => {
    getPlayer()
  }, [])

  return (
    <>
      {loadingPlayer ? (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={300}
        />
      ) : (
        <>
          <PageHeaderPlayerProfile
            game={player?.game ?? ""}
            breadcrumbsItems={[
              { name: "Homeplate", href: "/" },
              { name: "Players", href: "/players" },
              { name: player?.name ?? "" },
            ]}
            player={player}
          ></PageHeaderPlayerProfile>
          <PlayerProfile player={player} />
        </>
      )}
    </>
  )
}

export default PlayerProfilePage

// export async function getStaticProps({ params: { cardId } }) {
//   const playerRes = await fetch(
//     `https://showzone-api-dev.onrender.com/api/player-profiles/${cardId}/?format=json`
//   )
//   const player = await playerRes.json()

//   return {
//     props: {
//       cardId,
//       player: {
//         ...player,
//         isPitcher: Boolean(player.pitch_velocity),
//         hasPitches: Boolean(player.pitch_1),
//         hasSecondaries: player.display_secondary_positions !== "",
//       },
//     },
//     revalidate: REVALIDATION_MINS * 60,
//   }
// }

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true,
//   }
// }
