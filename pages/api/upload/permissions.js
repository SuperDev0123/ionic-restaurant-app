import handlePostUploadPermissionReq from "../../../services/uploads/controllers/handle-post-upload-permission-req"

export default function handler(req, res) {
  const { method } = req
  switch (method) {
    case "POST":
      return handlePostUploadPermissionReq(req, res)
    default:
      return res.status(405).send("The method is not supported")
  }
}
