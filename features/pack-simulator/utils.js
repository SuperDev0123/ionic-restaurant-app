import standardPackBack from "@public/images/standard-pack-back.jpg"
import standardPackEquipment from "@public/images/standard-pack-equipment.jpg"
import standardPackUnlockable from "@public/images/standard-pack-unlockable.jpg"
import standardPackStadium from "@public/images/standard-pack-stadium.jpg"

export function getCardBack(itemType) {
  if (itemType == "Equipment") return standardPackEquipment;
  if (itemType == "Unlockable" || itemType == "Sponsorship") return standardPackUnlockable;
  if (itemType == "Stadium") return standardPackStadium;

  return standardPackBack;
}

export function pickRarityIcon(itemRarity) {
  if (itemRarity == "Diamond") return "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-diamond.png";
  if (itemRarity == "Gold") return "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-gold.png";
  if (itemRarity == "Silver") return "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-silver.png";
  if (itemRarity == "Bronze") return "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-bronze.png";
  
  return "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-common.png";
}

export function getArrayOfCards(data) {
  const pack = data.Pack;
  return [
    pack.card1,
    pack.card2,
    pack.card3,
    pack.card4,
    pack.card5,
  ]
}

export function newUpdatedArray(array, index, value) {
  const newArray = [...array];
  newArray[index] = value;
  return newArray;
}