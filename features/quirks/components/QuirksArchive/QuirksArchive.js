import Quirk from "./Quirk"
import { Grid, Typography, Link } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"

const QuirksArchive = ({ quirks }) => (
  <>
    <Card>
      <CardContent>
        <Typography variant="h2" color="text.secondary" gutterBottom>
          Active Quirks
        </Typography>
        <Typography variant="p" component="p" gutterBottom>
          Active Quirks increase a player&apos;s attributes beyond what you
          see on their card. Many Active Quirks are situational - meaning they
          are applied based on what is happening in the game at that very
          moment. Active Quirks are cumulative. For example, if a player has the
          “Day Player” and “Homebody” quirks, they will see increases for both
          while playing a day game at home.
        </Typography>
        <Typography variant="p" component="p" gutterBottom>
          For more information on quirks,{" "}
          <Link
            target="_blank"
            href="https://www.youtube.com/watch?v=OS_aDYLDgPU"
          >
            check out this video by TheScann
          </Link>
          . We will continue to update this page as additional research about
          quirks is released.
        </Typography>
      </CardContent>
    </Card>
    <Grid
      sx={{ marginTop: "1rem", marginBottom: "2rem" }}
      className="quirks"
      container
      spacing={6}
    >
      {quirks.map(quirk =>
        quirk.acf.active_quirk ? (
          <Grid key={quirk.title.rendered} item xs={12} md={6} lg={4}>
            <div id={quirk.title.rendered}>
              <Quirk quirk={quirk} />
            </div>
          </Grid>
        ) : (
          ""
        )
      )}
    </Grid>
    <Card>
      <CardContent>
        <Typography variant="h2" color="text.secondary" gutterBottom>
          Inactive Quirks
        </Typography>
        <Typography variant="p" component="p" gutterBottom>
          Inactive Quirks simply indicate a player has an attribute or set of
          attributes that meets a specific minimum threshold. They do not boost
          stats or offer any benefits - they are more of a badge of honor.
        </Typography>
      </CardContent>
    </Card>
    <Grid
      sx={{ marginTop: "1rem", marginBottom: "2rem" }}
      className="quirks"
      container
      spacing={3}
    >
      {quirks.map(quirk =>
        !quirk.acf.active_quirk ? (
          <Grid key={quirk.title.rendered} item xs={12} md={6} lg={4}>
            <div id={quirk.title.rendered}>
              <Quirk quirk={quirk} />
            </div>
          </Grid>
        ) : (
          ""
        )
      )}
    </Grid>
  </>
)

export default QuirksArchive
