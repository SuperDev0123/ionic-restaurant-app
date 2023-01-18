let battersFirstPart = [
    {position: "catcher", positionLong: "Catcher", positionShort: "C"},
    {position: "first_base", positionLong: "First Base", positionShort: "1B"},
    {position: "second_base", positionLong: "Second Base", positionShort: "2B"},
    {position: "third_base", positionLong: "Third Base", positionShort: "3B"},
    {position: "short_stop", positionLong: "Short Stop", positionShort: "SS"},
    {position: "left_field", positionLong: "Left Field", positionShort: "LF"},
    {position: "center_field", positionLong: "Center Field", positionShort: "CF"},
    {position: "right_field", positionLong: "Right Field", positionShort: "RF"},
]

export function newEmptyRoster() {
    const newRoster = {
        batters: {
            ...newBattersFirstPart(battersFirstPart),
            ...newEnumerationPlayers(5, "bench_", "Bench ", "C, 1B, 2B, 3B, SS, LF, CF, RF"),
        },
        starters: newEnumerationPlayers(5, "starter_", "Starter ", "SP"),
        bullpen: newEnumerationPlayers(8, "bullpen_", "Bullpen ", "CP,RP"),
    };

    return newRoster;
}

function newBattersFirstPart(players) {
    const obj = {};

    players.forEach((playerData) => {
        const {position, positionLong, positionShort} = playerData;

        obj[position] = {
            position,
            positionLong,
            positionShort,
            player: "",
            playerName: ""
        }
    });

    return obj;
}

function newEnumerationPlayers(num, positionPrefix, positionLongPrefix, positionShort) {
    const obj = {};
    let thePosition;

    for(let i=1; i<=num; i++) {
        thePosition = positionPrefix + i;

        obj[thePosition] = {
            player: "",
            playerName: "",
            position: thePosition,
            positionLong: positionLongPrefix + i, 
            positionShort: positionShort
        }
    }

    return obj;
}