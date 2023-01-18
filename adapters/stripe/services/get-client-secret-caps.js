import axios from "axios"

const getClientSecret = async ({capPackage }) => {
  const {
    data: { clientSecret },
  } = await axios.post("/api/payment-intents-caps", { capPackage })
  return clientSecret
}

export default getClientSecret
