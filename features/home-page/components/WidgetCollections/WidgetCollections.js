import React, { useState, useCallback, useEffect } from "react"
import Box from "@mui/material/Box"
import MuiCardContent from "@mui/material/CardContent"
import Paper from "@mui/material/Paper"
import MuiTypography from "@mui/material/Typography"
import { spacing, styled } from "@mui/system"

import WidgetCollectionsItem from "./WidgetCollectionsItem"
import axios from "axios"
const Typography = styled(MuiTypography)(spacing)

const CardContent = styled(MuiCardContent)`
  position: relative;
  width: 100%;
  ${props => props.theme.breakpoints.up("md")} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  Button {
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    ${props => props.theme.breakpoints.up("md")} {
      margin-top: 0;
      margin-left: 0;
    }
  }
  a {
    text-decoration: none;
  }
`

const WidgetCollections = () => {
  const [collections, setCollections] = useState([])
  const fetchData = useCallback(async () => {
    let legendCollection = await axios.get(
      `https://api.showzone.io/api/player-collection-flashback?format=json`
    )
    let legendCollectionCost = legendCollection.data

    let legendCollectionCutch = await axios.get(
      `https://api.showzone.io/api/player-collection-flashback-cutch?format=json`
    )
    let legendCollectionCutchCost = legendCollectionCutch.data

    let legendCollectionRollins = await axios.get(
      `https://api.showzone.io/api/player-collection-flashback-rollins?format=json`
    )
    let legendCollectionRollinsCost = legendCollectionRollins.data

    let legendCollectionMantle = await axios.get(
      `https://api.showzone.io/api/player-collection-flashback-mantle?format=json`
    )
    let legendCollectionMantleCost = legendCollectionMantle.data

    let liveCollection = await axios.get(
      `https://api.showzone.io/api/player-collection-live/?format=json`
    )
    let liveCollectionCost = liveCollection.data

    // console.log('results', results)
    setCollections([
      {
        name: "Mantle Collection",
        image:
          "https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ2lqIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f61fcc9d381f0ff0ffb625ca8874f0e559b60fb5/a3b3613dcef59433023905eb7c54d9b2.jpg",
        cost: legendCollectionMantleCost?.results[0].sell,
        collectionLink: "/collections/mantle",
      },
      {
        name: "Rollins Collection",
        image:
          "https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ0NlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cbfb3eb76db072f7d5ae2e1d4efe9bb0ab1d7e49/d8ef6c71a38003b91f6270f8499347fe.jpg",
        cost: legendCollectionRollinsCost?.results[0].sell,
        collectionLink: "/collections/rollins",
      },
      {
        name: "McCutchen Collection",
        image:
          "https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaW1iIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a2144d1f3ad8a19143dbf7bf51cc28bca3c19849/aa667ca14da6278c2dc5cd39b7ca44cb.jpg",
        cost: legendCollectionCutchCost?.results[0].sell,
        collectionLink: "/collections/mccutchen",
      },
      {
        name: "Brett Collection",
        image:
          "https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU9ZIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2fb8b727cbe4314ed9b2d2734ee362398c73dbde/9fa3002a2742df45efa313946865405a.jpg",
        cost: legendCollectionCost?.results[0].sell,
        collectionLink: "/collections/brett",
      },
      {
        name: "Live Series Collection",
        image:
          "https://mlb22.theshow.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa2VRIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--16a9c9e32470d8122ad33ebb6d96c1f1ed1b35b7/4f9438b1cfff29770bb28c524879509b.jpg",
        cost: liveCollectionCost?.results[0].buy,
        collectionLink: "/collections/live-series",
      },
    ])
  })

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flippingWidget">
      <Paper elevation={0}>
        <Box>
          <CardContent>
            <Typography variant="h6">Collection Costs</Typography>
          </CardContent>
        </Box>
        <Box>
          {collections.map(col => (
            <WidgetCollectionsItem key={col?.name} {...col} />
          ))}
        </Box>
      </Paper>
    </div>
  )
}

export default WidgetCollections
