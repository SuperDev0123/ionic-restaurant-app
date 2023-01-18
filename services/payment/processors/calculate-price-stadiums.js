import { BadRequestError } from "restify-errors"
import config from "../../../config"

const {
  stripe: { stadiumPrices},
} = config

const calculatePriceStadiums = stadiumPackage => {
  if (stadiumPackage in stadiumPrices) return stadiumPrices[stadiumPackage]

  throw new BadRequestError('invalid input entered for "number of logos"')
}

export default calculatePriceStadiums
