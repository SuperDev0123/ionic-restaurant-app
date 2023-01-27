import { useState, useEffect, useCallback } from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { styled, spacing } from "@mui/system"
import LoaderBaseballInline from "@components/LoaderBaseball/LoaderBaseballInline"
import { Card as MuiCard, CardContent } from "@mui/material"
import axios from "axios"
import Donut from "@components/Charts/Donut"
import DonutBlank from "@components/Charts/DonutBlank"
 
const Card = styled(MuiCard)(spacing)

const Blur = styled("span")`
  color: transparent;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
`

const LiveSeriesCollection = props => {
  const [liveSeriesDataIsLoading, setLiveSeriesDataIsLoading] = useState(true)
  const [inventoryLiveSeriesData, setInventoryLiveSeriesData] = useState([])

  const fetchData = useCallback(async () => {
    setLiveSeriesDataIsLoading(true)
    axios
      .get(
        `https://api.showzone.io/api/user-inventory/${props.currentUser?.uid}/live-series-collection/`
      )
      .then(async getUserInventoryLiveSeriesData => {
        if (getUserInventoryLiveSeriesData.data) {
          setInventoryLiveSeriesData(
            getUserInventoryLiveSeriesData.data.results[0]
          )
          setLiveSeriesDataIsLoading(false)
        } else {
          setLiveSeriesDataIsLoading(false)
        }
      })
      .catch(err => {
        setLiveSeriesDataIsLoading(false)
      })
  }, [props.currentUser?.uid])

  const seriesCards = [
    inventoryLiveSeriesData?.owned_live_series_count,
    1200 - inventoryLiveSeriesData?.owned_live_series_count,
  ]

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      {!liveSeriesDataIsLoading ? (
        <Card mb={6}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Live Series Collection
            </Typography>
            <Grid container spacing={6}>
              <Grid item xs={12} md={5}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Typography paragraph>
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
              <Grid item xs={12} md={7}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    {props.inventoryExists && !liveSeriesDataIsLoading  ? (
                      <Donut
                        series={seriesCards}
                        title="Completion in Cards"
                        labels={["Owned", "Not Owned"]}
                        totalFormatter={function () {
                          return (
                            Math.round(
                              (inventoryLiveSeriesData?.owned_live_series_count /
                                1200) *
                                100
                            ) + "%"
                          )
                        }}
                      />
                    ) : (
                      <DonutBlank title="Completion in Cards" />
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {props.inventoryExists && !liveSeriesDataIsLoading ? (
                      <Donut
                        series={seriesCards}
                        title="Completion in Stubs"
                        labels={["Owned", "Not Owned"]}
                        totalFormatter={function () {
                          return (
                            Math.round(
                              (inventoryLiveSeriesData?.owned_live_series_count /
                                1200) *
                                100
                            ) + "%"
                          )
                        }}
                        type="donut"
                      />
                    ) : (
                      <DonutBlank title="Completion in Stubs" />
                    )}
                  </Grid>
                </Grid>
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
