import { PaymentRequiredError } from "restify-errors"
import catchControllerErrors from "../../utils/catch-controller-errors"
import airTable from "../../../adapters/airtable"
import getPaymentIntentStatus from "../../../adapters/stripe/services/get-payment-intent-status"
import sendTicket from "../../tickets/processors/send-ticket-cap"

const handlePostOrderReq = async (req, res) => {
  const {
    body: { paymentIntentId, formData, files },
  } = req
  const paymentIntentStatus = await getPaymentIntentStatus(paymentIntentId)
  if (paymentIntentStatus !== "succeeded")
    throw new PaymentRequiredError("You must pay before submitting your request.")

  await airTable("CAP Requests").create([
    {
      fields: {
        paymentIntentId: paymentIntentId,
        date: new Date(),
        attachments: files.map(({ url }) => ({ url })),
        ...formData,
      },
    },
  ])

  await sendTicket({ paymentIntentId, ...formData }, files)

  return res.json({ done: true })
}

export default catchControllerErrors(handlePostOrderReq)
