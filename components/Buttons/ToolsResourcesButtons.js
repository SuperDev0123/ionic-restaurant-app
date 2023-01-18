import { styled } from "@mui/system"
import Grid from "@mui/material/Grid"
import ButtonLarge from "./ButtonLarge"

function ToolsResourcesButtons({props}) {
  return (
    <Grid container spacing={8}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <ButtonLarge href="/players" topText="Complete" bigText="Players" bottomText="Database" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <ButtonLarge href="/flipping" topText="Advanced" bigText="Flipping" bottomText="Tools" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <ButtonLarge href="/collections/tracker" topText="Check Your" bigText="Collection" bottomText="Progress" />  
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <ButtonLarge href="/players/team-builder" bigText="Team Builder"/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <ButtonLarge href="/conquest-maps" bigText="Conquest" bottomText="Rewards" />  
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <ButtonLarge href="/pack-derby" bigText="Pack Derby" />  
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <ButtonLarge href="/theme-teams" bigText="Theme Teams" bottomText="Database" />  
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <ButtonLarge href="/news" bigText="News & Tips" />  
        </Grid>
    </Grid>
  )
}

export default ToolsResourcesButtons
