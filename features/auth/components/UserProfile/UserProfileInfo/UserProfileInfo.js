import React, { useState, useCallback, useEffect } from "react"
import { styled, spacing } from "@mui/system"
import MuiGrid from "@mui/material/Grid"
import AccountDetails from "./AccountDetails"
import DiscordAccess from "./DiscordAccess"
import BronzeUpgradeMessage from "./BronzeUpgradeMessage"
import useAuth from "@useAuth"


import axios from 'axios'
import debounce from "lodash/debounce"
import updateUserUsername from "../../../../../adapters/firebase/services/update-user-username"

import { Button, FormControl, InputLabel, Select, MenuItem, Box, Tabs, Tab, Typography, Card as MuiCard, CardMedia, CardContent as MuiCardContent, TextField, Snackbar, Alert } from "@mui/material"
// import RostersGenerated from "./RostersGenerated"
// import PlayersFollowed from "./PlayersFollowed"

import { CompactPicker } from 'react-color';


const Card = styled(MuiCard)`
`

const CardContent = styled(MuiCardContent)`
`

const Grid = styled(MuiGrid)(spacing)

const Styles = styled("div")`
  tr {
    white-space: nowrap;
  }
`


const UserProfileInfo = ({ user = null, changeColor, triggerAlert }) => {

  const { currentUser, updateUserInfo } = useAuth()

  const [primaryColor, setPrimaryColor] = useState(null)
  const [secondaryColor, setSecondaryColor] = useState(null)
  const [isUnique, setIsUnique] = useState(false)
  const [username, setUsername] = useState(null)
  const [description, setDescription] = React.useState('')
  const [twitchID, setTwitchID] = useState(null)
  const [newUsername, setNewUsername] = useState('')

  useEffect(() => {
    setPrimaryColor(user?.primary_color)
    setSecondaryColor(user?.secondary_color)
    setDescription(user?.description)
    setUsername(user?.username)
    isUsernameUnique(user?.username, 2)
  },[user])

  const handleTwitchIDChange = event => {
    setTwitchID(event.target.value)
    axios.post(`https://showzone-user-api.onrender.com/users/save-twitch-id`, {
      user_id: user?.id,
      value: event.target.value
    }).then(results => {

    })
  }

  const handleDescriptionChange = event => {
    
    setDescription(event.target.value)
    axios.post(`https://showzone-user-api.onrender.com/users/save-description`, {
      user_id: user?.id,
      value: event.target.value
    }).then(results => {

    })
  }


  const handleUsernameChange = (ev) => {
    setNewUsername(ev.target.value)
    isUsernameUnique(ev.target.value)
  }

  const handleColorChange = (color, primary) => {
    console.log('color', color, primary)
    
    if(primary === 'primary') {
      setPrimaryColor(color.hex)
    }
    if(primary === 'secondary') {
      setSecondaryColor(color.hex)
    }

    changeColor(color, primary)
  }


  const isUsernameUnique = (username, key = 1) => {
    if(username) {
      axios.get(`https://showzone-user-api.onrender.com/users/is-unique-username/${username}`).then(results => {
        console.log('isUsernameUnique', results.data)
        if(results.data.users >= key) {
          setIsUnique(true)
        } else {
          setIsUnique(false)
        }
      })
    }
  }

  const saveUsername = async () => {
    console.log('triggered', user)
    try {
      // update google
      console.log('user', user)
      console.log('currentUser', currentUser)
      await currentUser.updateProfile({ displayName: newUsername })
      console.log('fart')
      
      await axios.post(`https://showzone-user-api.onrender.com/users/update-username/`, {
        id: user?.id,
        username: newUsername
      })

      triggerAlert('Successfully updated username')

    } catch(err) {
      console.log('err', err)
    }
  }

  return (
    <>
    <Styles>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={4} xl={4}>
          <AccountDetails />
        </Grid>
        <Grid item xs={12} lg={8} xl={8}>
          <BronzeUpgradeMessage />
          <DiscordAccess />
          { user ? <Card>
            <CardContent>
              <Typography variant="h6" component="h6" gutterBottom>
                User Profile Settings
              </Typography>
              <Box>
                
                <TextField multiline label="Description" value={ description } onChange={ handleDescriptionChange } my={2} />
                <TextField multiline label="Twitch ID" value={ twitchID } onChange={ handleTwitchIDChange } my={2} />
                <p>Your Twitch ID can be found here: <a href="https://www.streamweasels.com/tools/convert-twitch-username-to-user-id/">Find Your Twitch ID</a></p>

                <br />
                <p>Primary Account Color</p>
                <CompactPicker color={ primaryColor || "#000000"} onChangeComplete={(event) => { handleColorChange(event, 'primary' )}}></CompactPicker>
                <p>Secondary Account Color</p>
                <CompactPicker color={ secondaryColor || "#000000"} onChangeComplete={(event) => { handleColorChange(event, 'secondary' )}}></CompactPicker>
                
                
              </Box>
            </CardContent>
          </Card> : <></> }
        </Grid>
      </Grid>
    </Styles>
    </>
  )
}

export default UserProfileInfo
