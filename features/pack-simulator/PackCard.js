import PlayerCard from "@components/PlayerCard";
import Image from "next/image";
import ReactCardFlip from "react-card-flip"
import OtherTypeCard from "./OtherTypeCard";
import { CardWrapper, CardBack } from "./styledComponents";
import { getCardBack } from "./utils";

function PackCard({cardData, isFlipped, onClick}) {
  let theCard;
  if(cardData.itemType === "Player") {
    theCard = (<PlayerCard data={cardData.item} width={210} />);
  } else {
    theCard = (<OtherTypeCard cardData={cardData} />);
  }

  return (
    <CardWrapper>
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
      >
        <Image
          src={getCardBack(cardData.itemType)}
          height={296}
          width={210}
          onClick={onClick}
          alt=""
        />
        <CardBack>
          {theCard}
        </CardBack>
      </ReactCardFlip>
    </CardWrapper>
  )
}

export default PackCard;