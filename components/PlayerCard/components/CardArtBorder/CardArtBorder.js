import LiveSeries from './LiveSeries';
import OtherSeries from './OtherSeries';

const otherSeries = [
  "Breakout",
  "2nd Half Heroes",
  "All-Star",
  "Postseason",
  "Rookie",
  "Veteran",
]

export default function CardArtBorder ({parentWidth, parentHeight, player}) {
  if(typeof player !== 'object' || player === null) return null;

  const { series } = player;

  if(series === "Live") return (
    <LiveSeries
      player={player}
      parentWidth={parentWidth}
      parentHeight={parentHeight}
    />
  );
  
  if (otherSeries.includes(series))
    return (
      <OtherSeries
        player={player}
        parentWidth={parentWidth}
        parentHeight={parentHeight}
      />
    )

  return null;
}