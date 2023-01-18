import Image from "next/image";
import styles from "../../PlayerCard.module.css";

function TeamLogo({ player, parentWidth }) {
  const { team } = player;

  const teamLogoWidth = parentWidth / 5.6;

  const style = { 
    width: teamLogoWidth, 
    height: teamLogoWidth 
  };

  return (
    <div className={styles.teamLogoWrapper} style={style} >
      <Image src={`/images/team-icons/${team}.png`} fill alt="Team Logo" />
    </div>
  )
}

export default TeamLogo;