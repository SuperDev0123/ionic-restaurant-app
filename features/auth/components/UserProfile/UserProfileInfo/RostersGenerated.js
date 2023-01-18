import React, { useState, useEffect } from "react"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import { Card, Spacer, Typography } from "./AccountDetails"
// import Link from "@components/OurLink"
import axios from 'axios'
import { styled } from "@mui/system"
// import * as QueryString from "query-string"
// import { useRouter } from "next/router"

import useAuth from "@useAuth"
// import { array } from "prop-types"

const StatRow = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const StatBox = styled("div")`
  min-width: 70px;
  font-weight: bold;
  color: #fff;
  background: #444;
  text-align: center;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
`

const RostersGenerated = (uid = null) => {
  const {
    currentUserIsSilverPlus,
    currentUserIsGoldPlus,
    currentUserIsDiamondPlus,
    currentUser,
    userLoaded
  } = useAuth()
//   const router = useRouter()
  const [userRosters, setUserRosters] = useState([])
  const [userRostersLoaded, setUserRostersLoaded] = useState(false)

  const loadUserRosters = () => {
    if(userLoaded) {
      try {

        var currentUid = currentUser.uid
        if(uid) {
            currentUid = uid
        }
        console.log('currentUid', currentUid)
        axios.get('https://api.showzone.io/api/user-saved-roster/?user_id=' + currentUid).then(results => {
            var data = results.data.results

            data.map((roster) => {
                roster.hyvor_comments = null
                return roster
            })
          setUserRosters(data)
          setUserRostersLoaded(true)
        }).catch(err => {
          console.log('err', err)
        })
      } catch (err) {

      }
    }
  }

  useEffect(() => {
    loadUserRosters() 
  }, [userLoaded])

  useEffect(() => {
    const populateRatings = async () => {

        const myArray = await Promise.all(userRosters.map(async (roster) => {
            try {
                const data = await axios.get(`https://talk.hyvor.com/api/v1/pages?website_id=6431&page_identifier=${roster.hyvor_id}`)
                // const data = await axios.get(`https://talk.hyvor.com/api/v1/pages?website_id=6431&page_identifier=ddc6dcb682f8fa80f20e986207d14e79`)
        
                if(data.data.data.length > 0) {
                    roster.hyvor_comments = data.data.data[0]
                }
            } catch (err) {
                
            }
            return roster
        }))

        setUserRosters(myArray)  
    }
    populateRatings() 
  }, [userRostersLoaded])

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          { uid ? '' : 'Your Saved Rosters' }
        </Typography>

        <Spacer mb={6} />

        {userRosters.map(roster => {
            return (
                <>
                <Spacer mb={6} />
                <Grid justifyContent="space-between" alignItems="center" container spacing={6}>
                    <Grid item xs={12} sm={8} md={10}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            {roster.name}
                        </Typography>
                        <StatRow>
                            <StatBox>
                                <Typography className="stat-title" component="p">
                                    OVR
                                </Typography>
                                <Typography variant="h6" component="p">
                                    {parseInt(roster.team_overall)}
                                </Typography>
                            </StatBox>
                            <StatBox>
                                <Typography className="stat-title" component="p">
                                    TRUE OVR
                                </Typography>
                                <Typography variant="h6" component="p">
                                    {parseInt(roster.team_true_overall)}
                                </Typography>
                            </StatBox>
                            <StatBox>
                                <Typography className="stat-title" component="p">
                                    PITCH
                                </Typography>
                                <Typography variant="h6" component="p">
                                    {parseInt(roster.team_pitching)}
                                </Typography>
                            </StatBox>
                            <StatBox>
                                <Typography className="stat-title" component="p">
                                    CON
                                </Typography>
                                <Typography variant="h6" component="p">
                                    {parseInt(roster.team_contact)}
                                </Typography>
                            </StatBox>
                            <StatBox>
                                <Typography className="stat-title" component="p">
                                    POW
                                </Typography>
                                <Typography variant="h6" component="p">
                                    {parseInt(roster.team_power)}
                                </Typography>
                            </StatBox>
                            <StatBox>
                                <Typography className="stat-title" component="p">
                                    DEF
                                </Typography>
                                <Typography variant="h6" component="p">
                                    {parseInt(roster.team_defense)}
                                </Typography>
                            </StatBox>
                            <StatBox>
                                <Typography className="stat-title" component="p">
                                    SPD
                                </Typography>
                                <Typography variant="h6" component="p">
                                    {parseInt(roster.team_speed)}
                                </Typography>
                            </StatBox>
                        </StatRow>
                    </Grid>
                    {/* <Grid item xs={12} sm={2}>
                        <Typography variant="h3" component="h1">
                            <Spacer mb={10} />
                            { roster.hyvor_comments?.ratings.average || ''}
                        </Typography>
                        <Typography variant="p">
                            <Spacer mb={10} />
                            { roster.hyvor_comments?.ratings.count ? `${roster.hyvor_comments?.ratings.count} Reviews` : 'No Ratings'}
                        </Typography>
                    </Grid> */}
                    <Grid item xs>
                        <Typography variant="h3" component="h1">
                            <Button href={"players/team-builder/" + roster.id} variant="contained">View in Team Builder</Button>
                        </Typography>
                    </Grid>
                </Grid>
                </>
            )
        })}
      </CardContent>
    </Card>
  )
}

export default RostersGenerated
