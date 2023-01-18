import { spacing, styled } from "@mui/system"
import Image from "next/image";
import {
  Card as MuiCard,
  CardContent,
  Chip as MuiChip,
  Typography as MuiTypography,
  Avatar,
  Tooltip
} from "@mui/material"

const Card = styled(MuiCard)(spacing)

const Chip = styled(MuiChip)(spacing)

const Spacer = styled("div")(spacing)

const Typography = styled(MuiTypography)(spacing)

const QuirkBox = styled("a")`
  min-width: 48%;
  background: #333;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 10px;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  color: #fff;
  text-decoration: none;
  ${props => props.theme.breakpoints.up("md")} {
    min-width: 31%;
    max-width: 31%;
  }
  ${props => props.theme.breakpoints.up("lg")} {
    min-width: 48%;
    max-width: 48%;
  }
  &:hover {
    background: #444;
    transition: 0.5s;
  }
`

const QuirkBoxWrapper = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const grabDetails = (value) => {
  let image = <></>
  let text = ''
  if(value === 'Breaking Ball Hitter') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_BreakingBallHitter.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Batting attributes receive a slight boost when a breaking ball is thrown.'
  }
  if(value === 'Knee Buckler') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_KneeBuckler.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when player has 90+ break and 70+ control on a breaking pitch.'
  }
  if(value === 'Catcher Pop Time') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_PopTime.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Catcher will react to base stealers faster, increasing the likelihood of throwing out a runner.'
  }
  if(value === '20 Vision') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_20Vision.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when a player has at least 85 vision.'
  }
  if(value === 'Bomber') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Bomber.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when a player has 75+ power against R and L.'
  }
  if(value === 'Buntmaster') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Buntmaster.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when a player has 55+ bunt and drag bunt attributes.'
  }
  if(value === 'Cannon') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Cannon.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when a player has 90+ arm strength.'
  }
  if(value === 'Cheesy') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Cheesy.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given given when player has 85+ velocity and 70= control on 4-seam fastball or cutter.'
  }
  if(value === 'Control Artist') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_ControlArtist.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when player has 80+ BB/9 attribute.'
  }
  if(value === 'Grounded') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Grounded.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when player has 70+ HR/9 attribute.'
  }
  if(value === 'Hitting Machine') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_HittingMachine.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when player has 75+ contact against R and L.'
  }
  if(value === 'Illusionist') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Illusionist.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when player has 75+ break and 75+ control attributes on change-up.'
  }
  if(value === 'Knuckleballer') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Knuckleballer.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given if player throws a knuckleball.'
  }
  if(value === 'Mr. Splitee') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_MrSplitee.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when player has 75+ control and 80+ break on splitter.'
  }
  if(value === 'Platoon') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Platoon.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'If contact is higher than power, contact must at least be an 80 and power be a 70+ vs. L or R. If power is higher that contact, power must be 70+ (no contact minimum requirement). And the opposite handedness can’t be over a 60+ in power or contact.'
  }
  if(value === 'Quick Reflexes') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_QuickReflexes.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when player has 85+ fielding reaction.'
  }
  if(value === 'Sinkerballer') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Sinkerballer.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when player has 70+ velocity, 70+ break and 70+ control on sinker, 2-seam fastball or running fastball.'
  }
  if(value === 'Sniper') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Sniper.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when player has 80+ arm accuracy.'
  }
  if(value === 'Softhands') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Softhands.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when player has 90+ fielding attribute.'
  }
  if(value === 'Speedster') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Speedster.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when player has 85+ speed'
  }
  if(value === 'Stingy') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Stingy.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when player has 80+ H/9 attribute.'
  }
  if(value === 'Thief') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Thief.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when a player has 65+ stealing ability.'
  }
  if(value === 'Unbreakable') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Unbreakable.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when player has a durability attribute of 90+.'
  }
  if(value === 'Untouchable') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Untouchable.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when player has 80+ K/9.'
  }
  if(value === 'Vacuum') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Vacuum.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when a player has 80+ blocking ability.'
  }
  if(value === 'Walker') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Walker.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when a player has 85+ discipline.'
  }
  if(value === 'Workhorse') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Workhorse.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Quirk is given when a player has 92+ stamina.'
  }


  if(value === 'Day Player') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_DayPlayer.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Player will receive an attribute boost during day games. The exact attributes are unknown, but an increase is PCI size has been documented.'
  }

  if(value === 'Dead Red') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_DeadRed.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Batting attributes receive a slight boost when a fastball is thrown.'
  }

  if(value === 'Fighter') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Fighter.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Player will receive an attribute in the 9th inning or later. The exact attributes that are boosted are unknown.'
  }

  if(value === 'First-Pitch Hitter') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_FirstPitchHitter.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Batting attributes receive a slight boost on the first pitch of an at-bat.'
  }

  if(value === 'Homebody') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Homebody.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Player will receive an attribute boost during home games. The exact attributes are unknown, but an increase is PCI size has been documented.'
  }
  if(value === 'Night Player') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_NightPlayer.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Player will receive an attribute boost during night games. The exact attributes are unknown, but an increase is PCI size has been documented.'
  }
  if(value === 'Outlier I') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_OutlierI.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Increases pitchers primary pitch velocity by 3mph.'
  }
  if(value === 'Outlier II') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_OutlierI.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Increases pitchers secondary pitch velocity by 3mph.'
  }
  if(value === 'Pickoff Artist') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_PickoffArtist.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Has an extremely effective pickoff move.'
  }
  if(value === 'Pinch Hitter') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_PinchHitter.jpeg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Player will receive an attribute boost while pinch hitting.'
  }
  if(value === 'Pressure Cooker') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_PressureCooker.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Pitchers will receive an attribute boost when pitching with runners on base.'
  }
  if(value === 'Rally Monkey') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_RallyMonkey.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Players will receive an attribute boost when their team is trailing. The exact attributes that are boosted are unknown.'
  }
  if(value === 'Road Warrior') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_RoadWarrior.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Player will receive an attribute boost during away games. The exact attributes are unknown, but an increase is PCI size has been documented.'
  }
  if(value === 'Situational Hitter') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_SituationalHitter.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Player will receive a batting attribute boost when there is a runner on third and less than two outs.'
  }
  if(value === 'Stopper') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Stopper.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Performs better when team is behind.'
  }
  if(value === 'Unfazed') {
    image = <Image src="https://content.showzone.io/wp-content/uploads/2022/02/GPerk_Unfazed.jpg" style={{ maxWidth: 50 }} width={50} height={50} alt="" />
    text = 'Excels when hitting with 2 strikes.'
  }


  return { image, text }
}



const PlayerQuirks = props => (
  <Card mb={6}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Quirks
      </Typography>

      <Spacer mb={4} />
      <QuirkBoxWrapper>
      {props.player?.quirks.map(quirk => {
        return (
          <>
            <Tooltip title={grabDetails(quirk).text} placement="top">
              <QuirkBox href={`/players/quirks#${quirk}`}>
                { grabDetails(quirk).image }
                <div>{ quirk }</div>
              </QuirkBox>
            </Tooltip>
          </>
        )
      })}
      </QuirkBoxWrapper>
    </CardContent>
  </Card>
)

export default PlayerQuirks
