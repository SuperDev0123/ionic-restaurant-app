import stripe from "../client"

const getPaymentIntentStatus = async paymentIntentId => {
  const { status } = await stripe.paymentIntents.retrieve(paymentIntentId)
  return status
}

export default getPaymentIntentStatus
