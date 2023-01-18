import React, { useState, useEffect } from "react"
// import CardContent from "@mui/material/CardContent"
// import Grid from "@mui/material/Grid"
// import Button from "@mui/material/Button"
import dynamic from "next/dynamic"
// import { Card, Spacer, Typography } from "./AccountDetails"
// import Link from "@components/OurLink"
// import axios from 'axios'
// import { styled } from "@mui/system"
// import * as QueryString from "query-string"
// import { useRouter } from "next/router"
import useAuth from "@useAuth"
// import { array } from "prop-types"
import useNotifs from "../../../../notifications/contexts/useNotifs"


const UserProfilePlayerSearch = dynamic(
  () =>
    import(
      "../../../../players-db/components/PlayerSearch/UserProfilePlayerSearch"
    ),
  { ssr: false }
)

// const StatRow = styled("div")`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: flex-start;
// `

// const StatBox = styled("div")`
//   min-width: 70px;
//   font-weight: bold;
//   color: #fff;
//   background: #444;
//   text-align: center;
//   margin-right: 0.5rem;
//   margin-bottom: 0.5rem;
//   padding: 0.5rem;
// `

const PlayersFollowed = () => {
  const {
    currentUserIsSilverPlus,
    currentUserIsGoldPlus,
    currentUserIsDiamondPlus,
    currentUser,
    userLoaded
  } = useAuth()
  // const router = useRouter()
  // const [userRosters, setUserRosters] = useState([])
  // const [userRostersLoaded, setUserRostersLoaded] = useState(false)
  const [cardSearch, setCardSearch] = useState([])
  // const [players, setPlayers] = useState([])
  // const [playersCount, setPlayersCount] = useState([])
  const { userNotifications, userFollows } = useNotifs()

  useEffect(() => {
    if(userFollows.length > 0) {
        var cardsToSearchFor = []

        for(const card of userFollows) {
          cardsToSearchFor.push(card.card_id)
        }
        setCardSearch(cardsToSearchFor)
        // fetchData(cardsToSearchFor)
    }
  }, [userLoaded])

  // const fetchData = async (cards) => {
  //   const {
  //     data: { results },
  //   } = await axios.get(
  //     `https://api.showzone.io/api/player-profiles/?format=json&card_id=${cards}&order_by=dsc overall`
  //   )

  //   console.log('data', results)
  //   setPlayers(results)
  // }


  return (
    <> 
      { cardSearch.length > 0 ? <UserProfilePlayerSearch cards={cardSearch} /> : <></> }
      <br />
    </>
  )
}

export default PlayersFollowed
