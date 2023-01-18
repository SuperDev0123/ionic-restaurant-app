const Airtable = require("airtable")
import config from "../../config"

const airTable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  config.airTable.baseId
)

export default airTable
