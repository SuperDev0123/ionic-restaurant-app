import React, { useState, useCallback, useEffect } from "react"
import { styled, spacing } from "@mui/system"
import Typography from "@mui/material/Typography"
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import MuiDivider from "@mui/material/Divider"
import NavLink from "../OurNavLink"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import MuiAlert from "@mui/material/Alert"
import { useRouter } from "next/router"
import { useTeamBuilderContext } from "../../features/team-builder/contexts/TeamBuilderContext"
import axios from "axios"
import copy from "copy-to-clipboard"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import * as QueryString from "query-string"

import useAuth from "@useAuth"
var slugify = require('slugify')
import moment from 'moment'

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)
const Divider = styled(MuiDivider)(spacing)
const Alert = styled(MuiAlert)`
  position: absolute;
  margin-top: 0.5rem;
  ${props => props.theme.breakpoints.up("md")} {
    right: 1rem;
    text-align: right;
  }
`

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const PageHeader = ({
  children,
  breadcrumbsItems = [],
  hideDivider = false,
  includeShareButton,
}) => {
  console.log("children", children)
  const router = useRouter()
  const { currentUserIsGoldPlus, currentUser, userLoaded } = useAuth()
  const [open, setOpen] = React.useState(false)
  const [rosterName, setRosterName] = React.useState(null)
  const [isSaving, setIsSaving] = React.useState(false)
  const [rosterPrivate, setRosterPrivate] = React.useState(false)
  const [userRosters, setUserRosters] = useState([])
  const [selectedRoster, setSelectedRoster] = useState(null)

  const {
    teamOveralls,
    playersForRoster,
    setPlayersForRoster,
    filters,
    optimizeButtonActive,
    setOptimizeButtonActive,
    generatorConstraints,
    setGeneratorConstraints,
    setOpenGeneratorConstraints,
    setOpenFilters,
  } = useTeamBuilderContext()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { asPath } = useRouter()
  const [showShareNotification, setShowShareNotication] = useState(false)

  const loadUserRosters = () => {
    if(userLoaded) {
      try {
        axios.get('https://api.showzone.io/api/user-saved-roster/?user_id=' + currentUser.uid).then(results => {
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

  const saveRoster = () => {
    console.log("save roster")
    setIsSaving(true)
    // axios.post
    // create a slug

    var queryString = window.location.search
    var urlParams =  new URLSearchParams(queryString);
    
    var id = null 
    if(urlParams.get('id')) {
      id = urlParams.get('id')
    }
    var slug = null
    var name = null
    console.log('rn', rosterName, selectedRoster)
    if(rosterName) {
      name = rosterName
      slug = slugify(rosterName) + '-' + moment().format('YYYY-MM-DD-hh-mm-ss')
    }
    if(selectedRoster) {
      console.log(userRosters)
      var find = userRosters.find(roster => {
        return roster.id == selectedRoster
      })
      console.log('find', find)
      name = find.name
      slug = find.hyvor_id
    }

    console.log('name', name)
    console.log('slug', slug)

    axios.post('https://api.showzone.io/api/save-user-roster', {
      id: id,
      name: name,
      is_public: rosterPrivate,
      user_id: currentUser.uid,
      hyvor_id: slug,
      date: new Date(),
      team_overall: teamOveralls["Team Overall Rating"],
      team_true_overall: teamOveralls["Team True Overall Rating"],
      team_power: teamOveralls["Team Power Rating"],
      team_contact: teamOveralls["Team Contact Rating"],
      team_pitching: teamOveralls["Team Pitching Rating"],
      team_speed: teamOveralls["Team Speed Rating"],
      team_defense: teamOveralls["Team Defense Rating"],
      catcher: playersForRoster.batters.catcher.player,
      first_base: playersForRoster.batters.first_base.player,
      second_base: playersForRoster.batters.second_base.player,
      third_base: playersForRoster.batters.third_base.player,
      short_stop: playersForRoster.batters.short_stop.player,
      left_field: playersForRoster.batters.left_field.player,
      center_field: playersForRoster.batters.center_field.player,
      right_field: playersForRoster.batters.right_field.player,
      bench_1: playersForRoster.batters.bench_1.player,
      bench_2: playersForRoster.batters.bench_2.player,
      bench_3: playersForRoster.batters.bench_3.player,
      bench_4: playersForRoster.batters.bench_4.player,
      bench_5: playersForRoster.batters.bench_5.player,
      starter_1: playersForRoster.starters.starter_1.player,
      starter_2: playersForRoster.starters.starter_2.player,
      starter_3: playersForRoster.starters.starter_3.player,
      starter_4: playersForRoster.starters.starter_4.player,
      starter_5: playersForRoster.starters.starter_5.player,
      bullpen_1: playersForRoster.bullpen.bullpen_1.player,
      bullpen_2: playersForRoster.bullpen.bullpen_2.player,
      bullpen_3: playersForRoster.bullpen.bullpen_3.player,
      bullpen_4: playersForRoster.bullpen.bullpen_4.player,
      bullpen_5: playersForRoster.bullpen.bullpen_5.player,
      bullpen_6: playersForRoster.bullpen.bullpen_6.player,
      bullpen_7: playersForRoster.bullpen.bullpen_7.player,
      bullpen_8: playersForRoster.bullpen.bullpen_8.player,
    }).then(results => {
      console.log('results', results)
      var queryString = window.location.search
      var urlParams =  new URLSearchParams(queryString);
      
      urlParams.append('id', results.data.rosterId)
      urlParams.append('hyvor_id', slug)

      console.log('urlParams', urlParams.toString())


      window.location.replace('/players/team-builder?' + urlParams.toString())
    })

    // create hyvor api
  }

  const handleSelectedRoster = ($ev) => {


    var id = $ev.target.value

    var find = userRosters.find(roster => {
      return roster.id == id
    })

    var qs = QueryString.stringify(find)
    console.log('qs', qs)
    router.push(
      "/players/team-builder?" + qs,
      undefined,
      { scroll: false }
    )
    setSelectedRoster($ev.target.value)
  }

  const checkForRosterId = () => {
    const queryString = window.location.search;
  
    var urlParams =  new URLSearchParams(queryString);

    var roster_id = urlParams.get('id')
    console.log('id', roster_id)
    setSelectedRoster(roster_id)
    
  }

  const handleRosterNameChange = $event => {
    setRosterName($event.target.value)
  }
  const handlePrivateCheck = $event => {
    setRosterPrivate($event.target.checked)
  }

  const handleInventoryCheckmark = $event => {
    setInventoryCheckbox($event.target.checked)
    var user_id = null

    if ($event.target.checked) {
      user_id = currentUser.uid
    }
    console.log("user", user_id)
    setGeneratorConstraints(prevState => ({
      ...prevState,
      ["user_id"]: user_id,
    }))
  }
 
  const updateRoster = () => {
    var r = confirm('Are you sure you want to do this? This will override the current entry.')
    if(r === true) {
      saveRoster()
    }
  }

  return (
    <>
      
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3" component="h1">
            {children}
          </Typography>
          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            {breadcrumbsItems.map(({ name, href }) =>
              href !== undefined ? (
                <NavLink key={`breadcrumbs-${name}`} href={href}>
                  {name}
                </NavLink>
              ) : (
                <Typography key={`breadcrumbs-${name}`}>{name}</Typography>
              )
            )}
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Button
            sx={{ marginRight: "1rem" }}
            variant="contained"
            onClick={() => setOpenFilters(true)}
          >
            Filters
          </Button>
          <Button
            sx={{ marginRight: "1rem" }}
            variant="contained"
            onClick={() => setOpenGeneratorConstraints(true)}
            // onClick={() => generatRoster()}
          >
            Generate
          </Button>
          { selectedRoster ? <Button
            sx={{ marginRight: "1rem" }}
            variant="contained"
            onClick={updateRoster}
          >
            Update
          </Button> : <></> }
          {showShareNotification ? (
            <Alert severity="success">Share link copied to clipboard.</Alert>
          ) : (
            ""
          )}
          {/* <Grid item xs={12}>
            {userRosters.length > 0 ? (
              <FormControl fullWidth>
               <InputLabel name="quirks-label">Load a Roster</InputLabel>
               <Select
                 name="userRosters"
                 labelname="userRosters"
                 value={parseInt(selectedRoster)}
                 onChange={handleSelectedRoster}
                //  renderValue={selected => selected.join(", ")}
               >
                 {userRosters.map(roster => (
                   <MenuItem key={roster.id} value={roster.id}>
                     <ListItemText primary={roster.name} />
                   </MenuItem>
                 ))}
                 <MenuItem key={null} value={null}>
                    <ListItemText primary="Create New Roster" />
                  </MenuItem>
               </Select>
             </FormControl>
            ) : (
              <></>
            )}
          </Grid> */}
        </Grid>
      </Grid>

      <Divider my={6} />
    </>
  )
}

export default PageHeader
