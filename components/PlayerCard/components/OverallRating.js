import Image from "next/image";
import styles from "../PlayerCard.module.css";
import { getRarityIconUrl } from "../utils";

function OverallRating({overall}) {

  return (
    <div className={styles.overallRating}>
      <Image
        src={getRarityIconUrl(overall)}
        alt="Rarity shield"
        fill
      />
      <span>{overall ?? ""}</span>
    </div>
  )
}

export default OverallRating;