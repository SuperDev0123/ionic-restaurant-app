import { bucket } from "../../../adapters/google-cloud-storage"
import config from "../../../config"

const createSignedUploadUrl = async (file, dirPath = "") => {
  const options = {
    version: "v4",
    action: "write",
    expires:
      Date.now() + config.imageUpload.uploadPermissionMinutes * 60 * 1000, // 30 minutes
    contentType: file.type,
  }
  const [url] = await bucket
    .file(`${dirPath}/${file.name}`)
    .getSignedUrl(options)

  return url
}

export default createSignedUploadUrl
