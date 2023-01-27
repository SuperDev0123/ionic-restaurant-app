import axios from "axios";
import moment from "moment";
import slugify from "slugify";
import { TierBuilderUtil } from "../utils/TierBuilderUtil";

const SAVE_TIER_URL = "https://api.showzone.io/api/user-saved-tier-list/save_user_tier_list/";

export class TierBuilderApi {
  static async save({
    name,
    description,
    isPublic,
    tiersData,
    tierId,
    userId,
    userName,
  }) {
    const slug = getSlug(name);
    if (name === "") name = "Untitled";
    if (tierId === undefined) tierId = null;
    const arraysOfIds = TierBuilderUtil.getArraysOfIds(tiersData);
    const date = new Date();

    const postData = {
      name,
      description,
      id: tierId,
      date,
      user_id: userId,
      user_name: userName,
      hyvor_id: slug,
      is_public: isPublic,
      pool: arraysOfIds[0],
      s_tier: arraysOfIds[1],
      a_tier: arraysOfIds[2],
      b_tier: arraysOfIds[3],
      c_tier: arraysOfIds[4],
      d_tier: arraysOfIds[5],
      f_tier: arraysOfIds[6],
    };

    console.log("postData: ", postData)
    
    // return;
    const result = await axios.post(SAVE_TIER_URL, postData);

    window.location.replace("/tier-builder/" + result.data.tierListId);
  }
}

function getSlug(name) {
  if(name) return slugify(name) + "-" + moment().format("YYYY-MM-DD-hh-mm-ss");
  return null;
}