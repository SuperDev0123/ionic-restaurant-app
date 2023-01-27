export class TierBuilderUtil {
  static itemIdCounter = 0;

  static generateItemId(offset = 0) {
    this.itemIdCounter++;
    return `item-${this.itemIdCounter}-${offset}`;
  }

  static generateItemObject({ index, player }) {
    return {
      id: this.generateItemId(index),
      player,
    }
  }

  static generateTiersDataArray(pageData) {
    if (!pageData) return [[], [], [], [], [], [], []];

    return [
      this.generateTierData(pageData.pool),
      this.generateTierData(pageData.s_tier),
      this.generateTierData(pageData.a_tier),
      this.generateTierData(pageData.b_tier),
      this.generateTierData(pageData.c_tier),
      this.generateTierData(pageData.d_tier),
      this.generateTierData(pageData.f_tier),
    ]
  }

  static generateTierData(arrayOfPlayers) {
    if (!Array.isArray(arrayOfPlayers)) return [];

    return arrayOfPlayers.map((player, index) => this.generateItemObject({ player, index }));
  }

  static getArraysOfIds(tiersData) {
    return tiersData.map((tier) => {
      return tier.map(item => item.player.card_id);
    });
  }
}