import Image from "next/image";
import styles from "../PlayerCard.module.css";

const defaultImageUrl = "/images/bg-rarity-diamond.jpg";

function PlayerCardImage({imageUrl}) {
  const url = imageUrl ?? defaultImageUrl;

  return (
    <Image
      fill
      src={url}
      alt="Player Card Image"
      className={styles.playerCardImage}
    />
  )
}

export default PlayerCardImage;