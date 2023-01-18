import { useState, useEffect, useCallback } from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { styled, spacing } from "@mui/system"
import { Doughnut } from "react-chartjs-2"
import LoaderBaseballInline from "@components/LoaderBaseball/LoaderBaseballInline"
import {
  Button,
  Card as MuiCard,
  CardContent,
  // Typography as MuiTypography,
  // Divider as MuiDivider,
} from "@mui/material"
import axios from "axios"

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

const BaseInventory = props => {
  const [baseDataIsLoading, setBaseDataIsLoading] = useState(true)
  const [inventoryBaseData, setInventoryBaseData] = useState([])
  const fetchData = useCallback(async () => {
    axios
      .get(
        `https://api.showzone.io/api/user-inventory/${props.currentUser?.uid}/`
      )
      .then(async getUserInventoryBaseData => {
        if (getUserInventoryBaseData.data) {
          setInventoryBaseData(getUserInventoryBaseData.data)
          setBaseDataIsLoading(false)
          props.setInventoryExists(true)
        } else {          
          setBaseDataIsLoading(false)
        }
      })
      .catch(err => {
        setBaseDataIsLoading(false)
      })
  }, [props.currentUser?.uid, props.setInventoryExists])

  useEffect(() => { fetchData(); }, [fetchData])

  return (
    <>
      {!baseDataIsLoading ? (
        <Card mb={6}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Your Inventory Overview
            </Typography>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Typography paragraph>
                      {!props.inventoryExists
                        ? "You don't have a saved inventory. Follow the instructions above to get started. "
                        : ""}
                    </Typography>
                    <Typography paragraph>
                      {!props.currentUser
                        ? "You will need a ShowZone account - you can sign up here. "
                        : ""}
                    </Typography>
                    <Typography>
                      <strong>Total Cards: </strong>{" "}
                      {props.inventoryExists
                        ? inventoryBaseData?.owned_count?.toLocaleString() +
                          " / " +
                          inventoryBaseData?.total_card_count?.toLocaleString()
                        : ""}
                    </Typography>
                    <Typography>
                      <strong>Estimated Value: </strong>{" "}
                      {props.inventoryExists
                        ? inventoryBaseData?.owned_value?.toLocaleString()
                        : ""}
                    </Typography>
                    <Typography variant="caption" paragraph>
                      This does not include duplicates.
                    </Typography>
                    {props.inventoryExists ? (
                      <Button
                        variant="contained"
                        href="/players/team-builder?use_inventory=true"
                      >
                        Use Your Inventory in Team Builder
                      </Button>
                    ) : (
                      <Button disabled variant="contained">
                        Use Your Inventory in Team Builder
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: "flex" }}>
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
                              Math.round(inventoryBaseData?.owned_count),
                              Math.round(inventoryBaseData?.total_card_count) -
                                Math.round(inventoryBaseData?.owned_count),
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
                            //   enabled: false,
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
                        (inventoryBaseData?.owned_count /
                          inventoryBaseData?.total_card_count) *
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

export default BaseInventory
