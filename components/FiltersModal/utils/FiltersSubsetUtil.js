export class FiltersSubsetUtil {
  static PLAYERS = "players"
  static EXCHANGE = "exchange"
  static MARKET = "market"

  static arrayTypeProps = {
    players: [
      "game",
      "rarity",
      "series",
      "position",
      "position_secondary",
      "team",
      "bat_hand",
      "throw_hand",
      "quirks",
      "born",
      "all_positions",
      "all_teams",
      "pitches",
    ],
    exchange: ["division", "position", "team", "rarity", "series"],
    market: ["item_type", "rarity", "series", "position", "team", "slot"],
  }

  static getArrayTypeProps(subset) {
    if (subset === this.PLAYERS) return this.arrayTypeProps.players
    if (subset === this.EXCHANGE) return this.arrayTypeProps.exchange
    if (subset === this.MARKET) return this.arrayTypeProps.market

    return []
  }
}