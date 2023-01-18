import * as marketListingsTableDefinition from "./market-listings"
import * as playersTableDefinition from "./players"
import * as exchangePlayersTableDefinition from "./exchange-players"

export default {
  "market-listings": { ...marketListingsTableDefinition },
  "exchange-players": { ...exchangePlayersTableDefinition },

  players: { ...playersTableDefinition },
}
