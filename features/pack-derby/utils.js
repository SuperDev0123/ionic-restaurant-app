export function getDataForPlayerCard(card) {
  return {
    card_id: card.item,
    img: card.itemImage,
    name: card.itemName,
    overall: card.itemOverall,
    series: card.itemSeries,
    team: card.itemTeam,
  };
}