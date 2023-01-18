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
import CollectionTable from "./CollectionTable"

const Card = styled(MuiCard)(spacing)

// const Blur = styled("span")`
//   color: transparent;
//   text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
// `

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

const MantleCollection = props => {
  const [mcCutchenDataIsLoading, setMantleDataIsLoading] = useState(false)
  const [inventoryMantleData, setInventoryMantleData] = useState([])

  const fetchData = useCallback(async () => {
    setMantleDataIsLoading(true)
    axios
      .get(
        `https://api.showzone.io/api/user-inventory/${props.currentUser?.uid}/legends-collection-mantle/`
      )
      .then(async getUserInventoryLegendData => {
        if (getUserInventoryLegendData.data) {
          setInventoryMantleData(getUserInventoryLegendData.data.results[0])
          setMantleDataIsLoading(false)
        } else {
          setMantleDataIsLoading(false)
        }
      })
      .catch(err => {
        setMantleDataIsLoading(false)
      })
  }, [props.currentUser?.uid])

  useEffect(fetchData, [fetchData])

  return (
    <>
      {!mcCutchenDataIsLoading ? (
        <Card mb={6}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Mantle Collection
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
                  <CollectionTable 
                    data={inventoryMantleData} 
                    inventoryExists={props.inventoryExists} 
                    vouchersRequired={18}
                    vouchersTotal={19}
                  />
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
                              inventoryMantleData?.legends_total
                                ?.cards_owned,
                              inventoryMantleData?.legends_total
                                ?.cards_required -
                                inventoryMantleData?.legends_total
                                  ?.cards_owned,
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
                          tooltip: {
                            enabled: false,
                          },
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
                        (inventoryMantleData?.legends_total?.cards_owned /
                          inventoryMantleData?.legends_total
                            ?.cards_required) *
                          100
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
                              inventoryMantleData?.legends_total
                                ?.total_cost -
                                inventoryMantleData?.legends_total
                                  ?.stubs_needed,
                              inventoryMantleData?.legends_total
                                ?.stubs_needed,
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
                        ((inventoryMantleData?.legends_total?.total_cost -
                          inventoryMantleData?.legends_total?.stubs_needed) /
                          inventoryMantleData?.legends_total?.total_cost) *
                          100
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

export default MantleCollection
