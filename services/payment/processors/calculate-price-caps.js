import { BadRequestError } from "restify-errors"
import config from "../../../config"

const {
  stripe: { capPrices},
} = config

const calculatePriceCaps = capPackage => {
  if (capPackage in capPrices) return capPrices[capPackage]

  throw new BadRequestError('invalid input entered for "number of logos"')
}

export default calculatePriceCaps
