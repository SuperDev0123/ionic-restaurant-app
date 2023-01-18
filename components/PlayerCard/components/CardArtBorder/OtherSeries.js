import Image from 'next/image';
import styles from '../../PlayerCard.module.css';


function OtherSeries({ parentWidth, parentHeight, player }) {
  const { series } = player;
  const imageName = series.toLowerCase().replaceAll(" ", "-");

  const width = parentWidth / 8.75;
  const height = parentHeight / 2.16;

  return (
    <div className={styles.cardArtBoarderWrapper}>
      <Image
        className={styles.seriesImage}
        src={`/images/borders/${imageName}.png`}
        width={width}
        height={height}
        alt=""
      />
    </div>
  )
}

export default OtherSeries;