import { useState } from "react"
import DesktopPricingTable from "./desktop"
import MobilePricingTable from "./mobile"
import { styled } from "@mui/material/styles"
import { Box, Switch, Stack, Typography, FormControlLabel } from "@mui/material"

function PricingTable({ tableData, style }) {
  const [annualPricing, setAnnualPricing] = useState(true)
  const handleChange = event => {
    setAnnualPricing(!annualPricing)
  }

  return (
    <Box style={style}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{ marginBottom: "2rem" }}
      >
        <Typography onClick={handleChange} variant="h3" sx={{color: !annualPricing ? "" : "#666"}}>Monthly</Typography>
        <Switch checked={annualPricing} onChange={handleChange} color="error" />
        <Typography onClick={handleChange} variant="h3" sx={{color: annualPricing ? "" : "#666"}}>Annual</Typography>
      </Stack>
      <MobilePricingTable data={tableData} annualPricing={annualPricing} />
      <DesktopPricingTable data={tableData} annualPricing={annualPricing} />
    </Box>
  )
}

export default PricingTable
