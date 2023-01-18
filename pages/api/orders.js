import handlePostOrderReq from "../../services/orders/controllers/handle-post-order-req"

export default function handler(req, res) {
  const { method } = req
  switch (method) {
    case "POST":
      return handlePostOrderReq(req, res)
    default:
      return res.status(405).send("The method is not supported")
  }
}
