import axios from "axios"

const getClientSecret = async ({ stadiumPackage }) => {
  const {
    data: { clientSecret },
  } = await axios.post("/api/payment-intents-stadium", { stadiumPackage })
  return clientSecret
}

export default getClientSecret
