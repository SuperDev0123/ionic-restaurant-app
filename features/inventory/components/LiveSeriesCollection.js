import { useState, useEffect, useCallback } from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { styled, spacing } from "@mui/system"
import { Doughnut } from "react-chartjs-2"
import LoaderBaseballInline from "@components/LoaderBaseball/LoaderBaseballInline"
import {
  Card as MuiCard,
  CardContent,
  // Typography as MuiTypography,
  // Divider as MuiDivider,
} from "@mui/material"
import axios from "axios"

const Card = styled(MuiCard)(spacing)

const Blur = styled("span")`
  color: transparent;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
`

const BlankDoughnut = props => (
  <div
    style={{
      position: "relative",
      textAlign: "center",
      width: "150px",
      margin: "1rem auto",
    }}
  >
    <Doughnut
      data={{
        labels: ["Owned", "Not Owned"],
        datasets: [
          {
            data: [0, 1],
            backgroundColor: ["#ed2024", "#EEE"],
            // hoverBackgroundColor: [
            //   "#FF6384",
            //   "#36A2EB",
            // ],
          },
        ],
      }}
      options={{
        cutout: 50,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      }}
    />
    <Typography
      sx={{
        position: "absolute",
        top: "58px",
        left: "33px",
        letterSpacing: "-2px",
        width: "85px",
      }}
      variant="h2"
      display="block"
    >
      0%
    </Typography>
    <Typography variant="overline" display="block">
      Completion in {props.text}
    </Typography>
  </div>
)

const LiveSeriesCollection = (props) => {
  const [liveSeriesDataIsLoading, setLiveSeriesDataIsLoading] = useState(false)
  const [inventoryLiveSeriesData, setInventoryLiveSeriesData] = useState([])

  const fetchData = useCallback(async () => {
    setLiveSeriesDataIsLoading(true)
    axios
      .get(
        `https://api.showzone.io/api/user-inventory/${props.currentUser?.uid}/live-series-collection/`
      )
      .then(async getUserInventoryLiveSeriesData => {
        if (getUserInventoryLiveSeriesData.data) {
          setInventoryLiveSeriesData(getUserInventoryLiveSeriesData.data.results[0])
          setLiveSeriesDataIsLoading(false)
        } else {
          setLiveSeriesDataIsLoading(false)
        }
      })
      .catch(err => {
        setLiveSeriesDataIsLoading(false)
      })
  }, [props.currentUser?.uid])

  useEffect(() => { fetchData(); }, [fetchData])
  
  return (
    <>
      {!liveSeriesDataIsLoading ? (
        <Card mb={6}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Live Series Collection
            </Typography>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography>
                      {!props.inventoryExists
                        ? "You don't have a saved inventory. Follow the instructions above to get started."
                        : props.inventoryExists && !props.currentUserIsGoldPlus
                        ? "This data is temporarily free for all users, but will soon only be available to ShowZone Pro Gold or higher subscribers."
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography>
                      <strong>American League: </strong>{" "}
                      {props.inventoryExists ? (
                        inventoryLiveSeriesData?.al_owned_count + " / " + 600
                      ) : props.inventoryExists ? (
                        <Blur>69 / 269</Blur>
                      ) : (
                        ""
                      )}
                    </Typography>
                    <Typography>
                      <strong>AL West: </strong>{" "}
                      {props.inventoryExists ? (
                        inventoryLiveSeriesData?.al_west_owned_count +
                        " / " +
                        200
                      ) : props.inventoryExists ? (
                        <Blur>69 / 269</Blur>
                      ) : (
                        ""
                      )}
                    </Typography>
                    <Typography>
                      <strong>AL Central: </strong>{" "}
                      {props.inventoryExists ? (
                        inventoryLiveSeriesData?.al_central_owned_count +
                        " / " +
                        200
                      ) : props.inventoryExists ? (
                        <Blur>69 / 269</Blur>
                      ) : (
                        ""
                      )}
                    </Typography>
                    <Typography>
                      <strong>AL East: </strong>{" "}
                      {props.inventoryExists ? (
                        inventoryLiveSeriesData?.al_east_owned_count +
                        " / " +
                        200
                      ) : props.inventoryExists ? (
                        <Blur>69 / 269</Blur>
                      ) : (
                        ""
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography>
                      <strong>National League: </strong>{" "}
                      {props.inventoryExists ? (
                        inventoryLiveSeriesData?.nl_owned_count + " / " + 600
                      ) : props.inventoryExists ? (
                        <Blur>69 / 269</Blur>
                      ) : (
                        ""
                      )}
                    </Typography>
                    <Typography>
                      <strong>NL West: </strong>{" "}
                      {props.inventoryExists ? (
                        inventoryLiveSeriesData?.nl_west_owned_count +
                        " / " +
                        200
                      ) : props.inventoryExists ? (
                        <Blur>69 / 269</Blur>
                      ) : (
                        ""
                      )}
                    </Typography>
                    <Typography>
                      <strong>NL Central: </strong>{" "}
                      {props.inventoryExists ? (
                        inventoryLiveSeriesData?.nl_central_owned_count +
                        " / " +
                        200
                      ) : props.inventoryExists ? (
                        <Blur>69 / 269</Blur>
                      ) : (
                        ""
                      )}
                    </Typography>
                    <Typography>
                      <strong>NL East: </strong>{" "}
                      {props.inventoryExists ? (
                        inventoryLiveSeriesData?.nl_east_owned_count +
                        " / " +
                        200
                      ) : props.inventoryExists ? (
                        <Blur>69 / 269</Blur>
                      ) : (
                        ""
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography>
                      <strong>Total Collection: </strong>{" "}
                      {props.inventoryExists ? (
                        inventoryLiveSeriesData?.owned_live_series_count +
                        " / " +
                        1200
                      ) : props.inventoryExists ? (
                        <Blur>69 / 269</Blur>
                      ) : (
                        ""
                      )}
                    </Typography>
                    <Typography>
                      <strong>Stubs Needed to Complete: </strong>{" "}
                      {props.inventoryExists ? (
                        inventoryLiveSeriesData?.live_series_stubs_needed?.toLocaleString()
                      ) : props.inventoryExists ? (
                        <Blur>69 / 269</Blur>
                      ) : (
                        ""
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ display: "flex", flexWrap: "wrap" }}
              >
                {props.inventoryExists ? (
                  <div
                    style={{
                      position: "relative",
                      textAlign: "center",
                      width: "150px",
                      margin: "1rem auto",
                    }}
                  >
                    <Doughnut
                      data={{
                        labels: ["Owned", "Not Owned"],
                        datasets: [
                          {
                            data: [
                              inventoryLiveSeriesData?.owned_live_series_count,
                              1200 -
                                inventoryLiveSeriesData?.owned_live_series_count,
                            ],
                            backgroundColor: ["#ed2024", "#EEE"],
                            // hoverBackgroundColor: [
                            //   "#FF6384",
                            //   "#36A2EB",
                            // ],
                          },
                        ],
                      }}
                      options={{
                        cutout: 50,
                        plugins: {
                          //   tooltip: {
                          //     enabled: false,
                          //   },
                          legend: {
                            display: false,
                          },
                          title: {
                            display: false,
                          },
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "58px",
                        left: "33px",
                        letterSpacing: "-2px",
                        width: "85px",
                      }}
                      variant="h2"
                      display="block"
                    >
                      {Math.round(
                        inventoryLiveSeriesData?.completed_live_series_count_percentage
                      )}
                      %
                    </Typography>
                    <Typography variant="overline" display="block">
                      Completion in Cards
                    </Typography>
                  </div>
                ) : (
                  <BlankDoughnut text="Cards" />
                )}
                {props.inventoryExists ? (
                  <div
                    style={{
                      position: "relative",
                      textAlign: "center",
                      width: "150px",
                      margin: "1rem auto",
                    }}
                  >
                    <Doughnut
                      data={{
                        labels: ["Owned", "Not Owned"],
                        datasets: [
                          {
                            data: [
                              Math.round(
                                inventoryLiveSeriesData?.completed_live_series_cost_percentage
                              ),
                              100 -
                                Math.round(
                                  inventoryLiveSeriesData?.completed_live_series_cost_percentage
                                ),
                            ],
                            backgroundColor: ["#ed2024", "#EEE"],
                            // hoverBackgroundColor: [
                            //   "#FF6384",
                            //   "#36A2EB",
                            // ],
                          },
                        ],
                      }}
                      options={{
                        cutout: 50,
                        plugins: {
                          legend: {
                            display: false,
                          },
                          title: {
                            display: false,
                          },
                          tooltip: {
                            enabled: false,
                          },
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "58px",
                        left: "33px",
                        letterSpacing: "-2px",
                        width: "85px",
                      }}
                      variant="h2"
                      display="block"
                    >
                      {Math.round(
                        inventoryLiveSeriesData?.completed_live_series_cost_percentage
                      )}
                      %
                    </Typography>
                    <Typography variant="overline" display="block">
                      Completion in Stubs
                    </Typography>
                  </div>
                ) : (
                  <BlankDoughnut text="Stubs" />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <>
          <LoaderBaseballInline></LoaderBaseballInline>
        </>
      )}
    </>
  )
}

export default LiveSeriesCollection
