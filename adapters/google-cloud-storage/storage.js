const { Storage } = require("@google-cloud/storage")

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
  },
})

export default storage
