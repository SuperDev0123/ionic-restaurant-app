import _ from "lodash"

const REVALIDATION_MINS = 3 * 60 //update (revalidate) this page every 3 hours

const getPlayerAffinityProps = async () => {
  const teamsRes = await fetch(
    "https://api.showzone.io/api/team-affinity/?format=json&order_by=asc%20player_profile__team"
  )
  const { results } = await teamsRes.json()
  const teamsAffinityData = _.groupBy(
    _.sortBy(results, "season"),
    "player_profile.team"
  )
  const teamsAffinityInfo = Object.keys(teamsAffinityData).map(key => ({
    team: key,
    players: teamsAffinityData[key].map(pi => ({
      season: pi.season,
      playerName: pi.player_profile.name,
      playerImg: pi.player_profile.img,
      playerId: pi.player_profile.card_id,
    })),
  }))

  return {
    props: { teamsAffinityInfo },
    revalidate: REVALIDATION_MINS * 60,
  }
}

export default getPlayerAffinityProps
