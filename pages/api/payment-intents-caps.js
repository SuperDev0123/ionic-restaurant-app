import handlePaymentIntentReq from "../../services/payment/controllers/handle-payment-intent-req-caps"

export default function handler(req, res) {
  const { method } = req
  switch (method) {
    case "POST":
      return handlePaymentIntentReq(req, res)
    default:
      return res.status(405).send("The method is not supported")
  }
}
