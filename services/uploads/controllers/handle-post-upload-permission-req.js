import { PaymentRequiredError } from "restify-errors"
import getPaymentIntentStatus from "../../../adapters/stripe/services/get-payment-intent-status"
import catchControllerErrors from "../../utils/catch-controller-errors"
import { createSignedViewUrl, createSignedUploadUrl } from "../processors"
import config from "../../../config"

const handlePostUploadPermissionReq = async (req, res) => {
  const {
    body: { files, paymentIntentId },
  } = req
  const paymentIntentStatus = await getPaymentIntentStatus(paymentIntentId)
  if (paymentIntentStatus !== "succeeded")
    throw new PaymentRequiredError("You must pay before uploading logos")

  const dirPath = `${config.imageUpload.uploadDirectory}/${paymentIntentId}`
  const uploadUrls = await Promise.all(
    files.map(file => createSignedUploadUrl(file, dirPath))
  )
  const viewUrls = await Promise.all(
    files.map(file => createSignedViewUrl(file, dirPath))
  )

  return res.json({ uploadUrls, viewUrls })
}

export default catchControllerErrors(handlePostUploadPermissionReq)
