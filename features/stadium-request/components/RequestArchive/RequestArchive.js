import Request from "./Request"
import { Grid, Typography, Link } from "@mui/material"

const RequestArchive = ({ stadiumRequests }) => (
  <>
    <Typography variant="h2">Active Projects</Typography>
    <Grid
      sx={{ marginTop: "1rem", marginBottom: "2rem" }}
      className="requests"
      container
      spacing={6}
    >
      {stadiumRequests.map(request =>
        request.fields.status!=="Complete" && request.fields.status ? (
          <Grid key={request.name} item xs={12} md={6} lg={4}>
            <Request request={request} />
          </Grid>
        ) : (
          ""
        )
      )}
    </Grid>
    {/* <Typography variant="h2" gutterBottom>
      Recently Completed Projects
    </Typography>
    <Grid
      sx={{ marginTop: "1rem", marginBottom: "2rem" }}
      className="requests"
      container
      spacing={3}
    >
      {stadiumRequests.map(request =>
        !request.acf.active_request ? (
          <Grid key={request.name} item xs={12} md={6} lg={4}>
            <Request request={request} />
          </Grid>
        ) : (
          ""
        )
      )}
    </Grid> */}
  </>
)

export default RequestArchive
