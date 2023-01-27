import { useState, useEffect, useCallback } from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { styled, spacing } from "@mui/system"
import LoaderBaseballInline from "@components/LoaderBaseball/LoaderBaseballInline"
import { Button, Card as MuiCard, CardContent } from "@mui/material"
import axios from "axios"
import Donut from "@components/Charts/Donut"
import DonutBlank from "@components/Charts/DonutBlank"

const Card = styled(MuiCard)(spacing)

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

  const series = [
    inventoryBaseData?.owned_count,
    inventoryBaseData?.total_card_count - inventoryBaseData?.owned_count,
  ]

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      {!baseDataIsLoading ? (
        <Card mb={6}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Your Inventory Overview
            </Typography>
            <Grid container spacing={6}>
              <Grid item xs={12} md={5}>
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
              <Grid item xs={12} md={7}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}></Grid>
                  <Grid item xs={12} md={6}>
                    {props.inventoryExists ? (
                      <Donut
                        series={series}
                        title="Completion in Cards"
                        labels={["Owned", "Not Owned"]}
                        totalFormatter={function () {
                          return (
                            Math.round(
                              (inventoryBaseData?.owned_count /
                                inventoryBaseData?.total_card_count) *
                                100
                            ) + "%"
                          )
                        }}
                      />
                    ) : (
                      <DonutBlank
                        title="Completion in Cards"
                      />
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

export default BaseInventory
