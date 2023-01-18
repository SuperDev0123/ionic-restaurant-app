import config from "../../../../../config"

const {
  stripe: { capPrices },
} = config
 
const calculatePriceCaps = capPackage => {
  let price = capPrices[0]
  try {
    price = capPrices[capPackage] ?? capPrices[0]
  } catch (err) {}

  return (price / 100).toFixed(2)
}

export default calculatePriceCaps
