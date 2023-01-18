import axios from "axios";
import config from "../../config";

export default async function handler(req, res) {
  const { uid } = req.body;
  const websiteId = config.ads.playwireWebsiteId;

  const { data } = await axios.get(`https://rewarded-user.herokuapp.com/code/${websiteId}/${uid}`);

  let responseObj;

  if(data.error){
    responseObj = {error: data.error};
  }else{
    responseObj = {code: data.code};
  }

  res.status(200).json(responseObj);
}

