import catchControllerErrors from "../../utils/catch-controller-errors"
import stripe from "../../../adapters/stripe"
import calculatePriceStadiums from "../processors/calculate-price-stadiums"

const handlePaymentIntentReqStadiums = async (req, res) => {
  const {
    body: { stadiumPackage },
  } = req
  const amount = calculatePriceStadiums(stadiumPackage)
  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
  })
  return res.json({ clientSecret, amount })
}

export default catchControllerErrors(handlePaymentIntentReqStadiums)
