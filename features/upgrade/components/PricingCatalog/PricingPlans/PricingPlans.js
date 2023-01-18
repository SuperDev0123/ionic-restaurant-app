import Grid from "@mui/material/Grid"

import SilverPlanCard from "./SilverPlanCard"

const PricingPlans = () => (
  <Grid container justifyContent="center">
    <Grid item xs={12} lg={12}>
      <Grid container spacing={6} alignItems="flex-start">
        <Grid item xs={12} md={6}>
          <SilverPlanCard />
        </Grid>
        <Grid item xs={12} md={6}>
          GoldPlanCard
        </Grid>
        <Grid item xs={12} md={12}>
          DiamonPlanCard
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

export default PricingPlans
