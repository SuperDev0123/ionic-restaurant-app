import Image from 'next/image';
import styles from '../../PlayerCard.module.css';

function BorderImage({ player, parentWidth, parentHeight }) {
  const { team } = player;

  return (
    <div className={styles.borderImageWrapper}>
      <Image
        src={`/images/borders/${team}.png`}
        width={parentWidth}
        height={parentHeight}
        alt="Border Image"
      />
    </div>
  )
}

export default BorderImage;