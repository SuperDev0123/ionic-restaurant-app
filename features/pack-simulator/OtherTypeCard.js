import Image from "next/image";
import { PlayerName, CardArtBorder } from "./styledComponents";
import { pickRarityIcon } from "./utils";

function OtherTypeCard({cardData}) {
  return (
    <>
      {getCardArtBorder(cardData)}
      <div className="overallRating">
        <span>{cardData.itemOverall}</span>
        <img
          src={pickRarityIcon(cardData.itemRarity)}
          alt="Rarity shield"
          height={50}
          width={50}
        />
      </div>
      <Image
        src={cardData.itemImage}
        className={cardData.itemRarity}
        height={296}
        width={210}
        alt=""
      />
    </>
  )
}

function getCardArtBorder(card) {
  if (card.itemType == "Stadium" || card.itemType == "Sponsorship") {
    return (
      <CardArtBorder>
        <Image
          src={`/images/borders/Free Agents.png`}
          width={210}
          height={296}
          alt=""
        />
        <PlayerName>{card.itemName}</PlayerName>
      </CardArtBorder>
    )
  }
}

export default OtherTypeCard;