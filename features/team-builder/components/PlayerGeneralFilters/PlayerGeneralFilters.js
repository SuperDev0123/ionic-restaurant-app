import React, { useState, useEffect } from "react"
import { useTeamBuilderContext } from "../../../../features/team-builder/contexts/TeamBuilderContext"
import {
  Button,
  Modal,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  FormControlLabel,
  Checkbox,
  IconButton,
  FormHelperText,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import useAuth from "@useAuth"
import DoneIcon from "@mui/icons-material/Done"
import { rarity, teams, quirks, locations, series } from "./filter-params"
import Link from "@components/OurLink"
import TextFieldsSet from "./components/TextFieldsSet"
import { fieldsDataArray } from "./text-fields-data"
import { FilterSelectField } from "./components/FilterSelectField"
import { ModalPaper, FilterFields } from "../styled/others"

const PlayerGeneralFilters = props => {
  const { currentUserIsSilverPlus, currentUser, userLoaded } = useAuth()
  const [inventoryCheckbox, setInventoryCheckbox] = useState(false)
  const { filters, setGeneratorConstraints } = useTeamBuilderContext()
  const handleFilterOpen = () => {
    props.setOpenFilters(true)
  }

  const handleFilterClose = () => {
    props.setOpenFilters(false)
  }

  const handleFilterSubmit = () => {
    props.setOpenFilters(false)
  }

  const handleFilterChange = event => {
    let eventName = event.target.name
    let eventValue = event.target.value

    props.setFilters(prevState => ({
      ...prevState,
      [eventName]: eventValue,
    }))
  }

  const checkForUseYourInventory = () => {
    const queryString = window.location.search
    var urlParams = new URLSearchParams(queryString)
    var use_inventory = urlParams.get("use_inventory")
    if (use_inventory == "true") {
      handleInventoryCheckmark({
        target: {
          checked: true,
        },
      })
    }
  }

  const handleInventoryCheckmark = $event => {
    setInventoryCheckbox($event.target.checked)
    var user_id = null
    if ($event.target.checked && currentUser) {
      user_id = currentUser.uid
    }
    setGeneratorConstraints(prevState => ({
      ...prevState,
      ["user_id"]: user_id,
    }))
  }

  useEffect(checkForUseYourInventory, [userLoaded])

  return (
    <Modal
      open={props.openFilters}
      onClose={handleFilterClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ModalPaper>
        <Typography component="h2" variant="h6">
          Filter Data
        </Typography>
        <IconButton
          aria-label="close"
          className="closeModalIcon"
          onClick={handleFilterClose}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          aria-label="submit"
          className="doneModalIcon"
          onClick={handleFilterSubmit}
        >
          <DoneIcon />
        </IconButton>

        <FilterFields>
          <FormControlLabel
            style={{ width: "100%", marginBottom: "0rem" }}
            control={
              <Checkbox
                name="use_inventory"
                checked={inventoryCheckbox}
                onChange={handleInventoryCheckmark}
              />
            }
            label="Use Your Inventory"
            disabled={!props.inventoryExists}
          />
          {!props.inventoryExists ? (
            <FormHelperText sx={{ margin: "0 0 1rem", width: "100%" }}>
              Download <Link href="/inventory">your inventory</Link> to use this
              filter.
            </FormHelperText>
          ) : (
            ""
          )}
          <TextFieldsSet
            arrayOfData={fieldsDataArray[0]}
            handleFilterChange={handleFilterChange}
            filters={props.filters}
          />
          <FilterSelectField
            title="Rarity"
            name="rarity"
            value={props.filters.rarity || []}
            onChange={handleFilterChange}
            paramsObj={rarity}
          />
          <FilterSelectField
            title="Series"
            name="series"
            value={props.filters.series || []}
            onChange={handleFilterChange}
            paramsObj={series}
          />
          <FormControl fullWidth>
            <InputLabel name="event-label">Event Eligible</InputLabel>
            <Select
              name="event"
              labelname="event-label"
              value={filters.event || []}
              onChange={handleFilterChange}
            >
              <MenuItem key="yes" value="true">
                <ListItemText primary="Yes" />
              </MenuItem>
              <MenuItem key="no" value="false">
                <ListItemText primary="No" />
              </MenuItem>
              <MenuItem key="null" value="All">
                <ListItemText primary="All" />
              </MenuItem>
            </Select>
          </FormControl>
          <TextFieldsSet
            arrayOfData={fieldsDataArray[1]}
            handleFilterChange={handleFilterChange}
            filters={props.filters}
          />
          <FilterSelectField
            title="Team"
            name="team"
            value={props.filters.team || []}
            onChange={handleFilterChange}
            paramsObj={teams}
          />
          <FormControl fullWidth>
            <InputLabel name="all-teams-label">Teams Played For</InputLabel>
            <Select
              name="all_teams"
              labelname="all-teams-label"
              multiple
              value={filters.all_teams || []}
              onChange={handleFilterChange}
              renderValue={selected => selected.join(", ")}
            >
              {teams.map(team => (
                <MenuItem key={team} value={team}>
                  <ListItemText primary={team} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Search for players that ever played for a specific team.
            </FormHelperText>
          </FormControl>
          <FormControl style={{ width: "48%" }}>
            <InputLabel name="bats-label">Bats</InputLabel>
            <Select
              name="bat_hand"
              labelname="bats-label"
              multiple
              value={props.filters.bat_hand || []}
              onChange={handleFilterChange}
              renderValue={selected => selected.join(", ")}
            >
              <MenuItem key="R" value="R">
                <ListItemText primary="Right" />
              </MenuItem>
              <MenuItem key="L" value="L">
                <ListItemText primary="Left" />
              </MenuItem>
              <MenuItem key="S" value="S">
                <ListItemText primary="Switch" />
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ width: "48%" }}>
            <InputLabel name="throws-label">Throws</InputLabel>
            <Select
              name="throw_hand"
              labelname="throws-label"
              multiple
              value={props.filters.throw_hand || []}
              onChange={handleFilterChange}
              renderValue={selected => selected.join(", ")}
            >
              <MenuItem key="R" value="R">
                <ListItemText primary="Right" />
              </MenuItem>
              <MenuItem key="L" value="L">
                <ListItemText primary="Left" />
              </MenuItem>
            </Select>
          </FormControl>
          <FilterSelectField
            title="Born"
            name="born"
            value={props.filters.born || []}
            onChange={handleFilterChange}
            paramsObj={locations}
          />
          <TextFieldsSet
            arrayOfData={fieldsDataArray[2]}
            handleFilterChange={handleFilterChange}
            filters={props.filters}
          />
          <FilterSelectField
            title="Quirks"
            name="quirks"
            value={props.filters.quirks || []}
            onChange={handleFilterChange}
            paramsObj={quirks}
          />
        </FilterFields>
        <Button variant="contained" onClick={handleFilterSubmit}>
          Apply Filters
        </Button>
      </ModalPaper>
    </Modal>
  )
}

export default PlayerGeneralFilters
