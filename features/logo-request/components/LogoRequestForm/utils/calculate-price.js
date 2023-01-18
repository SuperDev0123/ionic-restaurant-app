import config from "../../../../../config"

const {
  stripe: { logoPrices },
} = config

const calculatePrice = numberOfLogos => {
  let price = logoPrices[0]
  try {
    price = logoPrices[numberOfLogos] ?? logoPrices[0]
  } catch (err) {}

  return (price / 100).toFixed(2)
}

export default calculatePrice
