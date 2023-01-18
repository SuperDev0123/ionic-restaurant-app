import catchControllerErrors from "../../utils/catch-controller-errors"
import stripe from "../../../adapters/stripe"
import { calculatePrice } from "../processors"

const handlePaymentIntentReq = async (req, res) => {
  const {
    body: { numberOfLogos },
  } = req
  const amount = calculatePrice(numberOfLogos)
  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
  })
  return res.json({ clientSecret, amount })
}

export default catchControllerErrors(handlePaymentIntentReq)
