import React, { useState, useEffect } from "react"
import { Grid as MuiGrid } from "@mui/material"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
// import Button from "@mui/material/Button"
import MuiCard from "@mui/material/Card"
import AdBlock from "@components/AdBlock"
import { styled, spacing } from "@mui/system"
import CardContent from "@mui/material/CardContent"
// import FormControl from "@mui/material/FormControl"
// import InputLabel from "@mui/material/InputLabel"
// import Select from "@mui/material/Select"
// import MenuItem from "@mui/material/MenuItem"
// import ListItemText from "@mui/material/ListItemText"
import useAuth from "@useAuth"
import axios from 'axios'
import * as QueryString from "query-string"
import { useRouter } from "next/router"
// import HyvorTalkEmbed from "@components/HyvorTalkEmbed"

const Card = styled(MuiCard)(spacing)
const Spacer = styled("div")(spacing)

const Grid = styled(MuiGrid)`
  ${props => props.theme.breakpoints.up("lg")} {
    max-width: 350px;
    min-width: 350px;
    width: 350px;
  }
`

// function TabPanel(props) {
//   const { children, value, index, ...other } = props

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
//     </div>
//   )
// }

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

function SidebarTeamBuilder(props) {
  const router = useRouter()
  const [value, setValue] = React.useState(0)
  const { currentUserIsGoldPlus, currentUser, userLoaded } = useAuth()
  const [userRosters, setUserRosters] = useState([])
  const [selectedRoster, setSelectedRoster] = useState(null)
  console.log('triggered)')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSelectedRoster = ($ev) => {


    var id = $ev.target.value

    var find = userRosters.find(roster => {
      return roster.id == id
    })

    console.log('find', find)

    var qs = QueryString.stringify(find)
    console.log('qs', qs)
    router.push(
      "/players/team-builder?" + qs,
      undefined,
      { scroll: false }
    )
    setSelectedRoster($ev.target.value)
  }

  const loadUserRosters = () => {
    if(userLoaded) {
      console.log('reosruesir')
      try {
        axios.get('https://api.showzone.io/api/user-saved-roster/?user_id=' + currentUser.uid).then(results => {
          console.log('userRosters', userRosters)
          setUserRosters(results.data.results)
          checkForRosterId()
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

  const checkForRosterId = () => {
    const queryString = window.location.search;
  
    var urlParams =  new URLSearchParams(queryString);

    var roster_id = urlParams.get('id')
    console.log('id', roster_id)
    setSelectedRoster(roster_id)
    
  }

  return (
    <>
      {props.sidebarHidden === "true" ? (
        <></>
      ) : (
        <>
          <Grid item xs={12}>
            <Card>
              <Paper elevation={0}>
                <Box mx={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Use Your Own Inventory
                    </Typography>
                    <Spacer mb={4} />
                    <Typography paragraph>
                      ShowZone Pro Members can generate lineups using cards they
                      actually own in the game.
                    </Typography>
                    <Typography paragraph>
                      Simply check the &quot;Use Your Inventory&quot; box in the
                      Filters panel.
                    </Typography>
                  </CardContent>
                </Box>
              </Paper>
            </Card>
            <AdBlock id="pw-sidebar-top" type="margin-bottom margin-top medium-rec" />
            {/* <Spacer mb={6} />
            <Card>
              <Paper elevation={0}>
                <Box mx={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Open Existing Roster
                    </Typography>
                    <Spacer mb={4} />
                    <FormControl fullWidth>
                      <InputLabel name="quirks-label">
                        Select a Roster
                      </InputLabel>
                      <Select
                        name="userRosters"
                        labelname="userRosters"
                        value={parseInt(selectedRoster)}
                        onChange={handleSelectedRoster}
                        
                      >
                        {userRosters.map(roster => (
                          <MenuItem key={roster.id} value={roster.id}>
                            <ListItemText primary={roster.name} />
                          </MenuItem>
                        ))}
                      </Select>
                      <Spacer mb={2} />
                      <Button variant="contained" href="/players/team-builder">Empty Builder</Button>
                    </FormControl>
                  </CardContent>
                </Box>
              </Paper>
            </Card>
            <Spacer mb={6} />
            { selectedRoster ? <HyvorTalkEmbed notTeamBuilder={false}/> : <></> } */}
          </Grid>
          
        </>
      )}
    </>
  )
}

export default SidebarTeamBuilder
