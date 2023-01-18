import slugify from "slugify";
import moment from "moment";

const playerPositions = ["catcher", "first_base", "second_base", "third_base", "short_stop", "left_field", "center_field", "right_field"];

export function generateSaveRequestData(params) {
    const {id, name, description, rosterPrivate, currentUser, slug, teamOveralls, playersForRoster} = params;

    let requestDataObj = {
        id,
        name: name,
        description: description,
        is_public: rosterPrivate,
        user_id: currentUser.uid,
        user_name: currentUser.displayName,
        hyvor_id: slug,
        date: new Date(),
        team_overall: teamOveralls["Team Overall Rating"] || null,
        team_true_overall: teamOveralls["Team True Overall Rating"] || null,
        team_power: teamOveralls["Team Power Rating"] || null,
        team_contact: teamOveralls["Team Contact Rating"] || null,
        team_pitching: teamOveralls["Team Pitching Rating"] || null,
        team_speed: teamOveralls["Team Speed Rating"] || null,
        team_defense: teamOveralls["Team Defense Rating"] || null,
    }

    playerPositions.forEach((position) => {
        requestDataObj[position] = playersForRoster.batters[position].player || null;
    });

    extendTheObj({
        requestDataObj,
        playersForRoster,
        type: "batters",
        prefix: "bench_",
        num: 5
    });

    extendTheObj({
        requestDataObj,
        playersForRoster,
        type: "starters",
        prefix: "starter_",
        num: 5
    });

    extendTheObj({
        requestDataObj,
        playersForRoster,
        type: "bullpen",
        prefix: "bullpen_",
        num: 8
    });

    return requestDataObj;
}

export function getSlug(name) {
    if(name) return slugify(name) + "-" + moment().format("YYYY-MM-DD-hh-mm-ss");
    return null;
}

function extendTheObj(params) {
    const {requestDataObj, playersForRoster, type, prefix, num} = params;
    let playerSlug;

    for(let i = 1; i <= num; i++){
        playerSlug = prefix + i;
        requestDataObj[playerSlug] = playersForRoster[type][playerSlug].player || null;
    }
}