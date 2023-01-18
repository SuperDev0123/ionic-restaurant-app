import catchControllerErrors from "../../utils/catch-controller-errors"
import sendTicket from "../processors/send-ticket"

const handleTicketPostReq = async (req, res) => {
  const { body: ticketFields } = req
  await sendTicket(ticketFields)
  return res.json({ ok: true })
}

export default catchControllerErrors(handleTicketPostReq)
