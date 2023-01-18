import { useState } from "react"
import { faObjectGroup } from "@fortawesome/free-solid-svg-icons"
import { Typography, Grid, Switch, FormControlLabel } from "@mui/material"

const CollectionTable = ({
  data,
  inventoryExists,
  vouchersRequired,
  vouchersTotal,
}) => {
  const [checked, setChecked] = useState(false)

  const switchHandler = event => {
    setChecked(event.target.checked)
  }
  
  if (data === undefined || data === null) return ""

  const arrayOfKeys = Object.keys(data)
  const legendsTotalIndex = arrayOfKeys.indexOf("legends_total")
  if (legendsTotalIndex !== -1) arrayOfKeys.splice(legendsTotalIndex, 1)

  let firstHalf = []
  let secondHalf = []

  arrayOfKeys.forEach((key, index) => {
    const component = getSeriesComponent(data[key], inventoryExists, checked)

    if (index < 10) firstHalf.push(component)
    else secondHalf.push(component)
  })

  let total = ""

  if (data.hasOwnProperty("legends_total")) {
    total = getTotalComponent(
      data.legends_total,
      inventoryExists,
      vouchersRequired,
      vouchersTotal
    )
  }

  return (
    <>
      <Grid item xs={12}>
        <FormControlLabel control={<Switch onChange={switchHandler} checked={checked}/>} label="Show Stubs Needed" />
      </Grid>

      <Grid item xs={12} md={6}>
        {firstHalf}
      </Grid>
      <Grid item xs={12} md={6}>
        {secondHalf}
      </Grid>
      {total}
    </>
  )
}

function getSeriesComponent(obj, inventoryExists, checked) {
  const body = inventoryExists
    ? obj.cards_owned + " / " + obj.cards_required
    : ""
  const bodyStubs = inventoryExists
    ? obj.stubs_needed
    : ""

  return (
    <Typography>
      <strong>{obj.series + ": "}</strong>
      {checked ? (
        bodyStubs.toLocaleString("en-US")
      ):(
        body
      )}
    </Typography>
  )
}

function getTotalComponent(
  legendsTotal,
  inventoryExists,
  vouchersRequired,
  vouchersTotal
) {
  let totalBody = ""
  let stubsBody = ""
  let note = ""

  if (inventoryExists) {
    console.log(legendsTotal)
    totalBody = legendsTotal.cards_owned + " / " + legendsTotal.cards_required
    stubsBody = legendsTotal.stubs_needed.toLocaleString()
    note = (
      <Typography paragraph>
        Note: Only {vouchersRequired} of the {vouchersTotal} vouchers are
        required. According to your inventory, you need the most stubs to
        complete the{" " + legendsTotal.collection_excluded + " "}
        series, so we have removed it from these totals. This total also assume
        you will obtain the remaining free/non-market cards.
      </Typography>
    )
  }

  return (
    <Grid item xs={12} md={12}>
      <Typography>
        <strong>Total Collection: </strong>
        {totalBody}
      </Typography>
      <Typography gutterBottom>
        <strong>Stubs Needed to Complete: </strong>
        {stubsBody}
      </Typography>
      {note}
    </Grid>
  )
}

export default CollectionTable
