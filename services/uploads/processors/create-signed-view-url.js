import { bucket } from "../../../adapters/google-cloud-storage"
import config from "../../../config"

const createSignedViewUrl = async (file, dirPath = "") => {
  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + config.imageUpload.viewPermissionMinutes * 60 * 1000,
  }
  const [url] = await bucket
    .file(`${dirPath}/${file.name}`)
    .getSignedUrl(options)

  return url
}

export default createSignedViewUrl
