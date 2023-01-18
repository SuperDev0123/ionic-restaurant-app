import { BadRequestError } from "restify-errors"
import config from "../../../config"

const {
  stripe: { logoPrices },
} = config
 
const calculatePrice = numberOfLogos => {
  if (numberOfLogos in logoPrices) return logoPrices[numberOfLogos]

  throw new BadRequestError('invalid input entered for "number of logos"')
}

export default calculatePrice
