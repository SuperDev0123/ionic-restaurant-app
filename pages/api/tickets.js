import handleTicketPostReq from "../../services/tickets/controllers/handle-ticket-post-req"

export default function handler(req, res) {
  const { method } = req
  switch (method) {
    case "POST":
      return handleTicketPostReq(req, res)
    default:
      return res.status(405).send("The method is not supported")
  }
}
