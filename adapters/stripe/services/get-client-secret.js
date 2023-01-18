import axios from "axios"

const getClientSecret = async ({ numberOfLogos }) => {
  const {
    data: { clientSecret },
  } = await axios.post("/api/payment-intents", { numberOfLogos })
  return clientSecret
}

export default getClientSecret
