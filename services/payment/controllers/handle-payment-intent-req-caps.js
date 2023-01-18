import catchControllerErrors from "../../utils/catch-controller-errors"
import stripe from "../../../adapters/stripe"
import calculatePriceCaps from "../processors/calculate-price-caps"

const handlePaymentIntentReqCaps = async (req, res) => {
  const {
    body: { capPackage },
  } = req
  const amount = calculatePriceCaps(capPackage)
  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
  })
  return res.json({ clientSecret, amount })
}

export default catchControllerErrors(handlePaymentIntentReqCaps)
