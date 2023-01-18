import { useEffect, useState } from "react"
import TeamOveralls from "./TeamOveralls"
import TeamBuilderGroup from "./TeamBuilderGroup"
import useAuth from "@useAuth"
import { useTeamBuilderContext } from "../../contexts/TeamBuilderContext"
import axios from "axios"
import { generateSaveRequestData, getSlug } from "../../utils/save-request-data"
import { newContextRosterFromSaved } from "../../utils/roster-for-builder-context"
import { SaveBlock } from "../styled/teamBuilder"
import RosterName from "./components/RosterName"
import RosterDescription from "./components/RosterDescription"
import RosterActions from "./components/RosterActions"
import Alert from "@mui/material/Alert"
import Link from "@components/OurLink"

const TeamBuilder = ({ data = undefined }) => {
  const { currentUserIsSilverPlus, currentUser, userLoaded } = useAuth()
  const [rosterPrivate, setRosterPrivate] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editModeTitle, setEditModeTitle] = useState(false)
  const [editModeDescription, setEditModeDescription] = useState(false)
  const [rosterName, setRosterName] = useState(data?.name || "")
  const [rosterDescription, setRosterDescription] = useState(
    data?.description || ""
  )
  const { teamOveralls, playersForRoster, setPlayersForRoster } =
    useTeamBuilderContext()

  const handlePrivateCheck = type => {
    setRosterPrivate(type)
  }

  useEffect(() => {
    if (data !== undefined) {
      setPlayersForRoster(newContextRosterFromSaved(data))
    }
  }, [data])

  const saveRoster = () => {
    if (!userLoaded || !currentUser) return
    setIsSaving(true)
    // var queryString = window.location.search
    // var urlParams = new URLSearchParams(queryString)
    var slug = getSlug(rosterName)
    var name = rosterName || "Untitled Roster"
    var description = ""

    if (rosterDescription) {
      description = rosterDescription
    }

    var postStatement = generateSaveRequestData({
      id: data?.id || null,
      name,
      description,
      rosterPrivate,
      currentUser,
      slug,
      teamOveralls,
      playersForRoster,
    })

    axios
      .post("https://api.showzone.io/api/save-user-roster", postStatement)
      .then(results => {
        // var queryString = window.location.search
        // var urlParams = new URLSearchParams(queryString)

        // urlParams.append("id", results.data.rosterId)
        // urlParams.append("hyvor_id", slug)

        window.location.replace(
          "/players/team-builder/" + results.data.rosterId
        )
      })
  }

  let handleEditModeTitle = () => {
    setEditModeTitle(!editModeTitle)
  }

  let handleEditModeDescription = () => {
    setEditModeDescription(!editModeDescription)
  }

  let handleRosterNameChange = e => {
    setRosterName(e.target.value)
  }

  let handleDescriptionChange = e => {
    setRosterDescription(e.target.value)
  }

  return (
    <>
      <SaveBlock>
        <div className="rosterName">
          <RosterName
            rosterName={rosterName}
            editModeTitle={editModeTitle}
            handleRosterNameChange={handleRosterNameChange}
            handleEditModeTitle={handleEditModeTitle}
          />
          <RosterDescription
            rosterDescription={rosterDescription}
            editModeDescription={editModeDescription}
            handleDescriptionChange={handleDescriptionChange}
            handleEditModeDescription={handleEditModeDescription}
          />
        </div>
        <RosterActions
          isSaving={isSaving}
          rosterPrivate={rosterPrivate}
          handlePrivateCheck={handlePrivateCheck}
          saveRoster={saveRoster}
          currentUser={currentUser}
          userLoaded={userLoaded}
          data={data}
        />
      </SaveBlock>

      <TeamOveralls />
      <TeamBuilderGroup title="Batters" playerType="batters" optimizeButton />
      <TeamBuilderGroup title="Starters" playerType="starters" />
      <TeamBuilderGroup title="Bullpen" playerType="bullpen" />
    </>
  )
}

function ShouldSignUp({ currentUser }) {
  return (
    <>
      {!currentUser ? (
        <Alert severity="info" sx={{marginBottom: "1rem"}}>
          Sign up for a <Link href="/register">Free ShowZone Pro account</Link> to save your rosters.
        </Alert>
      ) : (
        ""
      )}
    </>
  )
}

export default TeamBuilder
