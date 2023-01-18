import { newEmptyRoster } from "./generate-empty-roster"

export function updateOnePlayer(roster, playerType, playerPosition, card_id, playerImage, playerName, overall) {
  return {
    ...roster,
    [playerType]: {
      ...roster[playerType],
      [playerPosition]: {
        ...roster[playerType][playerPosition],
        player: card_id,
        playerImage,
        playerName,
        overall,
      },
    },
  }
}

export function newContextRoster(data) {
  const newRoster = newEmptyRoster();

  Object.keys(data).forEach(playerType => {
    const playerTypeData = data[playerType];

    Object.keys(playerTypeData).forEach(playerPosition => {
      const correctPlayerType = getCorrectPlayerType(newRoster, playerType)
      const playerData = playerTypeData[playerPosition]
      const newRosterPlayer = newRoster[correctPlayerType][playerPosition]

      if (newRosterPlayer !== undefined) {
        Object.keys(playerData).forEach(key => {
          newRosterPlayer[key] = playerData[key]
        })
      } else {
        newRoster[correctPlayerType][playerPosition] = playerData
      }
    })
  })

  return newRoster
}

export function newContextRosterFromSaved(data) {
  const newRoster = newEmptyRoster();

  Object.keys(newRoster).forEach(playerType => {
    const playerTypeRoster = newRoster[playerType];

    Object.keys(playerTypeRoster).forEach(playerPosition => {
      const playerData = data[playerPosition];
      const rosterPlayerData = playerTypeRoster[playerPosition];
      if(playerData){
        rosterPlayerData.player = playerData.card_id || "";
        rosterPlayerData.playerName = playerData.name || "";
        rosterPlayerData.image = playerData.img || "";
        rosterPlayerData.position = playerPosition || "";
        rosterPlayerData.series = playerData.series || "";
        rosterPlayerData.teams = playerData.team || "";
        rosterPlayerData.overall = playerData.overall || null;
      }
    });
  });

  return newRoster;
}

function getCorrectPlayerType(newRoster, playerType) {
  if (newRoster.hasOwnProperty(playerType)) return playerType
  return "batters"
}
