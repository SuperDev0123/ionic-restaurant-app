import styles from '../../PlayerCard.module.css';
import BorderImage from "./BorderImage";
import PlayerInfo from "./PlayerInfo";
import PlayerName from "./PlayerName";
import TeamLogo from "./TeamLogo";

function LiveSeries({ parentWidth, parentHeight, player }) {
  return (
    <div className={styles.cardArtBoarderWrapper}>
      <TeamLogo player={player} parentWidth={parentWidth} />

      <BorderImage
        player={player}
        parentWidth={parentWidth}
        parentHeight={parentHeight}
      />

      <PlayerName player={player} parentWidth={parentWidth} />

      <PlayerInfo player={player} parentWidth={parentWidth} />
    </div>
  )
}

export default LiveSeries;
