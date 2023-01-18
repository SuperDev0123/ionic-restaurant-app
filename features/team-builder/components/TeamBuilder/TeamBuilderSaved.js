import React, { useState } from "react"
import TeamOverallsSaved from "./TeamOveralls/TeamOverallsSaved"
import TeamBuilderGroupSaved from "./TeamBuilderGroup/TeamBuilderGroupSaved"
import useAuth from "@useAuth"
// var slugify = require("slugify")
import {
  Typography,
  Button,
} from "@mui/material"
// import moment from "moment"
import axios from "axios"
import { useRouter } from "next/router"
import { generateSaveRequestData, getSlug } from "../../utils/save-request-data"
import { newContextRosterFromSaved } from "../../utils/roster-for-builder-context"
import { SaveBlock } from "../styled/teamBuilder";
import { getRosterForSaved } from "../../utils/roster-for-saved"

const TeamBuilderSaved = props => {
  const { currentUserIsSilverPlus, currentUser, userLoaded } = useAuth()
  const router = useRouter();
  const [disabledEdit, setDisabledEdit] = useState(false);
  const [disabledClone, setDisabledClone] = useState(false);
  const { batters, starters, bullpen } = getRosterForSaved(props);

  const editRoster = () => {
    setDisabledEdit(true);
    router.push(router.asPath + "/edit");
  }

  const cloneRoster = () => {
    if(!userLoaded || !currentUser) return;
    if(props?.data === undefined) return;
    const data = props.data;
    setDisabledClone(true);

    let slug = getSlug(data.name);

    var postStatement = generateSaveRequestData({
      id: null,
      name: data.name,
      description: data.description,
      rosterPrivate: false,
      currentUser,
      slug,
      teamOveralls:{
        "Team Overall Rating": data.team_overall,
        "Team True Overall Rating": data.team_true_overall,
        "Team Power Rating": data.team_power,
        "Team Contact Rating": data.team_contact,
        "Team Pitching Rating": data.team_pitching,
        "Team Speed Rating": data.team_speed,
        "Team Defense Rating": data.team_defense,
      },
      playersForRoster: newContextRosterFromSaved(data),
    });

    axios
      .post("https://api.showzone.io/api/save-user-roster", postStatement)
      .then(results => {
        window.location.replace(
          "/players/team-builder/" + results.data.rosterId
        )
      })
  }

  const editButton = (userLoaded && currentUser?.uid === props?.data?.user_id) ? (
    <Button
      variant="contained"
      sx={{ marginLeft: "1rem" }}
      onClick={editRoster}
      disabled={disabledEdit}
    >
      Edit
    </Button>
  ) : "";

  return (
    console.log(props.data),
    (
      <>
        <SaveBlock>
          <div className="rosterName">
            <Typography variant="h2">{props?.data?.name}</Typography>
            <Typography variant="h4">by {props?.data?.user_name}</Typography>
            <Typography variant="p">{props?.data?.description}</Typography>
          </div>
          <div className="rosterActions">
            <Button
              variant="contained"
              sx={{ marginLeft: "1rem" }}
              onClick={cloneRoster}
              disabled={disabledClone || !userLoaded || !currentUser}
            >
              {disabledClone ? "Cloning..." : "Clone"}
            </Button>
            {editButton}
          </div>
        </SaveBlock>

        <TeamOverallsSaved data={props.data} />
        <TeamBuilderGroupSaved title="Batters" players={batters} />
        <TeamBuilderGroupSaved title="Starters" players={starters} />
        <TeamBuilderGroupSaved title="Bullpen" players={bullpen} />
      </>
    )
  )
}

export default TeamBuilderSaved
