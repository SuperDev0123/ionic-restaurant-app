import styles from "../../PlayerCard.module.css";

function PlayerName({ player, parentWidth }) {
  const { name } = player;

  const style = {
    bottom: parentWidth / 10.7, 
    width: parentWidth / 1.12
  };

  return (
    <div className={styles.playerName} style={style}>
      {name}
    </div>
  )
}

export default PlayerName;