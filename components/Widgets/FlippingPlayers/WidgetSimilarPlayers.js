import React, { useState, useCallback, useEffect } from "react"
import Box from "@mui/material/Box"
import MuiCardContent from "@mui/material/CardContent"
import Paper from "@mui/material/Paper"
import MuiTypography from "@mui/material/Typography"
import { spacing, styled } from "@mui/system"
import axios from "axios"
import { useRouter } from "next/router"

import WidgetSimilarPlayersCard from "./WidgetSimilarPlayersCard"

const Typography = styled(MuiTypography)(spacing)

const CardContent = styled(MuiCardContent)`
  position: relative;
  width: 100%;
  ${props => props.theme.breakpoints.up("md")} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  Button,
  a {
    text-decoration: none;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    ${props => props.theme.breakpoints.up("md")} {
      margin-top: 0;
      margin-left: 0;
    }
  }
`
const WidgetSimilarPlayers = () => {
const router = useRouter();
  const [listings, setListings] = useState([])

//   const fetchData = useCallback(async () => {
//     let results = await axios.get(`https://api.showzone.io/api/market-listings/?format=json&order_by=dsc%20profit_minute`)
//     setListings(results.data.results.splice(0,6))
//   })

//   useEffect(fetchData, [])

  var card_id = router.query.cardId

  useEffect(() => {
    if(card_id) {
      axios.get(`https://api.showzone.io/api/player-profiles/${card_id}/`).then(results => {
        var results = results.data

        var similar_cards = results.playerprofileadvanced.similar_cards
        
        
        if(similar_cards) {
          var string = similar_cards.join(',')
          var url = `https://api.showzone.io/api/player-profiles/?format=json&card_id=${string}`
          axios.get(url).then(results => {
            var similar_card_data = results.data.results
            setListings(similar_card_data)
            // a999c0cab150490ffefb7ce9ec889830,78aeaeb85180eb884e1ca6b280a2447f,b1dbc35c151f29dc80ec97a4fced097f,01393c6508393b2e45aa397eca03092d,a0b5fdf3b820fef7f83a0eb3a1f3ad17
          })
        }

      })
    }
  }, [])

  return (
    <div className="flippingWidget">
      <Paper elevation={0}>
          <CardContent>
            <Typography variant="h6">Similar Cards</Typography>
          </CardContent>
            {listings.map(listing => (
              <WidgetSimilarPlayersCard
                key={listing.item}
                card_id={listing.card_id}
                name={listing?.name}
                image={listing?.img}
                playerprofileadvanced={listing?.playerprofileadvanced}
                tsnLink={listing?.tsn_link}
                rarity={listing?.rarity}
                item_type={listing?.item_type}
              />
            ))}
      </Paper>
    </div>
  )
}

export default WidgetSimilarPlayers