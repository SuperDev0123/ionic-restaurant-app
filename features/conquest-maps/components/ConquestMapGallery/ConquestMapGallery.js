import Grid from "@mui/material/Grid"
import ConquestMap from "./ConquestMap"

const ConquestMapGallery = ({ conquestMaps }) => (
  <Grid className="conquestMaps" container spacing={3}>
    {conquestMaps.map(conquestMap => (
      <Grid key={conquestMap?.title?.rendered} item xs={12} md={4}>
        <ConquestMap conquestMap={conquestMap} />
      </Grid>
    ))}
  </Grid>
)

export default ConquestMapGallery
