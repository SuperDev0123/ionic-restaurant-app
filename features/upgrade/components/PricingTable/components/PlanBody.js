import { HeadCellCaption, HeadCellTitle, PriceText } from "./styled-components"
import Link from "next/link"
import { Button, Typography } from "@mui/material"
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined"
import useAuth from "@useAuth"

const ManagePlanButton = props => {
  const { manageAccount } = useAuth()
  if (props.bronze) {
    return (
      <Button variant="contained" color="secondary" disabled>
        Your Current Plan
      </Button>
    )
  }
  return (
    <Button
      variant="contained"
      onClick={manageAccount}
      color="secondary"
      endIcon={
        <ArrowForwardIosOutlinedIcon
          style={{ width: "0.6em", height: "0.6em" }}
        />
      }
    >
      Manage Subscription
    </Button>
  )
}

const ManagePlan = props => {
  const { manageAccount, currentUserRole, startCheckoutSession } = useAuth()
  if (props.plan == "Diamond" && currentUserRole == "PRO-Diamond") {
    return <ManagePlanButton />
  } else if (props.plan == "Gold" && currentUserRole == "PRO-Gold") {
    return <ManagePlanButton />
  } else if (props.plan == "Silver" && currentUserRole == "PRO-Silver") {
    return <ManagePlanButton />
  } else if (props.plan == "Bronze" && currentUserRole == "Free - Bronze") {
    return <ManagePlanButton bronze />
  }
  if (currentUserRole == "Free - Bronze") {
    if (props.annualPricing) {
      return (
        <Button
          variant="contained"
          onClick={() => startCheckoutSession(props.priceIdAnnual, {productName: `${props.plan} - Annual`})}
          endIcon={
            <ArrowForwardIosOutlinedIcon
              style={{ width: "0.6em", height: "0.6em" }}
            />
          }
        >
          Upgrade Now
        </Button>
      )
    } else {
      return (
        <Button
          variant="contained"
          onClick={() => startCheckoutSession(props.priceIdMonthly, {productName: `${props.plan} - Monthly`})}
          endIcon={
            <ArrowForwardIosOutlinedIcon
              style={{ width: "0.6em", height: "0.6em" }}
            />
          }
        >
          Upgrade Now
        </Button>
      )
    }
  } else {
    return ""
  }
}

const SubscribeToPlan = props => {}

function PlanBody({
  plan,
  annualPricing,
  captionAfterPriceStyle = {},
  buttonStyle = {},
}) {
  const { currentUser, currentUserIsSilverPlus, startCheckoutSession } =
    useAuth()
  return (
    <>
    <div>
      <HeadCellTitle className={plan.title}>{plan.title || ""}</HeadCellTitle>
      <HeadCellCaption>{plan.captionBeforePrice || ""}</HeadCellCaption>
      {annualPricing ? (
        <>
          <PriceText>{plan.priceAnnualPerMonth || ""}</PriceText>
          {plan.priceAnnual ? (
              <Typography variant="caption">Billed annually at {plan.priceAnnual || ""}</Typography>
          ):("")}
        </>
      ) : (
        <PriceText>{plan.priceMonthly || ""}</PriceText>
      )}
      <HeadCellCaption style={{marginTop: "1rem", marginBottom: "1rem"}}>
        {plan.captionAfterPrice || ""}
      </HeadCellCaption>
    </div>
    {currentUser ? (
      <ManagePlan
        plan={plan.title}
        priceIdAnnual={plan.priceIdAnnual}
        priceIdMonthly={plan.priceIdMonthly}
        annualPricing={annualPricing}
      />
    ) : (
      <Link href="/register" legacyBehavior>
        <Button
          fullWidth
          variant="contained"
          size="large"
          endIcon={
            <ArrowForwardIosOutlinedIcon
              style={{ width: "0.6em", height: "0.6em" }}
            />
          }
          style={buttonStyle}
        >
          Get Started
        </Button>
      </Link>
    )}
    </>
  )
}

export default PlanBody
