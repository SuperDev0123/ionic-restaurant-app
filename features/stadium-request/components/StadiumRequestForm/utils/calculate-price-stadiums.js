import config from "../../../../../config"

const {
  stripe: { stadiumPrices },
} = config
 
const calculatePriceStadiums = stadiumPackage => {
  let price = stadiumPrices[0]
  try {
    price = stadiumPrices[stadiumPackage] ?? stadiumPrices[0]
  } catch (err) {}

  return (price / 100).toFixed(2)
}

export default calculatePriceStadiums
