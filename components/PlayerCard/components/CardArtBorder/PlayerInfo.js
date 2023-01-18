import styles from '../../PlayerCard.module.css';

function PlayerInfo({ player, parentWidth }) {
  if(isMissingData(player)) return null;

  const { team, throw_hand, bat_hand, display_position } = player;

  const style = {
    width: parentWidth / 1.29, 
    bottom: parentWidth / 78, 
    left: parentWidth / 84
  };

  return (
    <div className={styles.playerInfo} style={style}>
      <span>{display_position}</span>
        <span>
          {throw_hand}/{bat_hand}
        </span>
      <span>{team}</span>
    </div>
  )
}

function isMissingData(player) {
  if (
    player.team === undefined ||
    player.throw_hand === undefined ||
    player.bat_hand === undefined ||
    player.display_position === undefined
  )
    return true;

  return false;
}

export default PlayerInfo;