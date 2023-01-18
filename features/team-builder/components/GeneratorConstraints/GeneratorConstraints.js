import React, { useState } from "react"
import {
  Modal,
  Link,
  Typography,
  IconButton,
  Alert,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import * as QueryString from "query-string"
import axios from "axios"
import { useTeamBuilderContext } from "../../contexts/TeamBuilderContext"
import useAuth from "@useAuth"
import { newContextRoster } from "../../utils/roster-for-builder-context"
import { generatorRequestData } from "./request-data"
import ConstraintTextFields from "./components/ConstraintTextFields"
import GenerateButton from "./components/GenerateButton"
import HitterObjectiveForm from "./components/HitterObjectiveForm"
import StartingPitcherForm from "./components/StartingPitcherForm"
import ReliefPitcherForm from "./components/ReliefPitcherForm"
import { ModalPaper, FilterFields } from "../styled/others"

const GeneratorConstraints = props => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [rosterError, setRosterError] = useState(false)
  const { setPlayersForRoster } = useTeamBuilderContext()
  const { currentUserIsGoldPlus, currentUser, userLoaded } = useAuth()
  const handleConstraintsOpen = () => {
    props.setOpenGeneratorConstraints(true)
  }

  const handleConstraintsClose = () => {
    props.setOpenGeneratorConstraints(false)
  }

  const handleSubmit = () => {
    props.setOpenGeneratorConstraints(false)
  }

  const handleGeneratorRoster = async () => {
    setIsGenerating(true)
    const qs = QueryString.stringify(
      { ...props.filters },
      { arrayFormat: "comma" }
    )
    await axios({
      method: "post",
      url:
        "https://api.showzone.io/api/team-builder/generate-roster?" +
        "game=MLB The Show 22&" +
        qs,
      data: generatorRequestData(qs, props.generatorConstraints),
    })
      .then(function (response) {
        setPlayersForRoster(newContextRoster(response.data.Players));
        props.setOpenGeneratorConstraints(false)
        setIsGenerating(false)
      })
      .catch(function (error) {
        setIsGenerating(false)
        setRosterError(true)
        setTimeout(function () {
          setRosterError(false)
        }, 5000)
      })
  }

  const handleFilterChange = event => {
    let eventName = event.target.name
    let eventValue = event.target.value

    if(eventName === 'use_inventory') {
      if(event.target.checked === true) {
        eventName = 'user_id'
        eventValue = currentUser?.uid
      }
      if(event.target.checked === false) {
        eventName = 'user_id'
        eventValue = null
      }
    }

    props.setGeneratorConstraints(prevState => ({
      ...prevState,
      [eventName]: eventValue,
    }))
  }

  return (
    <Modal
      open={props.openGeneratorConstraints}
      onClose={handleConstraintsClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ModalPaper>
        <Typography component="h2" variant="h6">
          Roster Constraints
        </Typography>
        <Typography paragraph>
          Note: The constraints you have set on the &quot;Filters&quot; will also be used here.
        </Typography>
        <IconButton
          aria-label="close"
          className="closeModalIcon"
          onClick={handleConstraintsClose}
        >
          <CloseIcon />
        </IconButton>
        {!currentUserIsGoldPlus ? (
          <Typography display="block" mb={5}>
            The Generate function is only available to ShowZone Pro subscribers.
            To access this feature,{" "}
            <Link href="/pro">upgrade to ShowZone Pro</Link>.
          </Typography>
        ) : (
          ""
        )}
        
        <FilterFields>
          <ConstraintTextFields 
            generatorConstraints={props.generatorConstraints}
            onChange={handleFilterChange}
            disabled={!currentUserIsGoldPlus}
          />
          <HitterObjectiveForm 
            value={props.generatorConstraints.objective_hit}
            onChange={handleFilterChange}
            disabled={!currentUserIsGoldPlus}
          />
          <StartingPitcherForm 
            value={props.generatorConstraints.objective_sp}
            onChange={handleFilterChange}
            disabled={!currentUserIsGoldPlus}
          />
          <ReliefPitcherForm 
            value={props.generatorConstraints.objective_rp}
            onChange={handleFilterChange}
            disabled={!currentUserIsGoldPlus}
          />
        </FilterFields>
        {rosterError ? (
          <Alert sx={{ marginBottom: "1rem" }} severity="error">
            Not enough players to generate roster. Try adjusting your filters or
            contraints.
          </Alert>
        ) : (
          ""
        )}
        <GenerateButton 
          isGenerating={isGenerating}
          onClick={handleGeneratorRoster}
          disabled={!currentUserIsGoldPlus}
        />
      </ModalPaper>
    </Modal>
  )
}

export default GeneratorConstraints
