import { useState } from "react";
import { useEffect } from "react";
import CardArtBorder from "./components/CardArtBorder";
import styles from './PlayerCard.module.css';
import { getPlayerFromAPI, getPropsClassName } from "./utils"
import ViewCardButton from "./components/ViewCardButton";
import PlayerCardImage from "./components/PlayerCardImage";
import OverallRating from "./components/OverallRating";

const RATIO = 1.42;

/**
 * @param {string | object} data - if this parameter is a string, it will be treated as the player ID 
 * and therefore an API request will be made to get the player data. If it is an object, no API request 
 * will be made and this data will be used as player data
 * 
 * @param {number} width - width of the player card, default value is 168 (px)
 * 
 * @param {boolean} showViewButton - if true, the View Card button will be shown, otherwise the button will 
 * be hidden
 */

export default function PlayerCard({data, width = 168, showViewButton = true, ...props}) {
  const [player, setPlayer] = useState({});
  const height = width * RATIO;

  useEffect(() => {
    if(typeof data === "string") {
      getPlayerFromAPI(data, setPlayer);
    }

    if(typeof data === "object") {
      setPlayer(data);
    }
  }, []);

  const style = {
    ...props.style,
    width, 
    height, 
    fontSize: width / 10
  }

  const propsClassName = getPropsClassName(props.className);

  return (
    <div {...props} className={propsClassName + styles.wrapper} style={style}>
      <CardArtBorder
        parentWidth={width}
        parentHeight={height}
        player={player}
      />

      <OverallRating overall={player.overall} />

      <PlayerCardImage imageUrl={player.img} />

      <ViewCardButton
        parentWidth={width}
        playerId={player.card_id}
        isVisible={showViewButton}
      />
    </div>
  );
}