import storage from "./storage"

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME)

export default bucket
