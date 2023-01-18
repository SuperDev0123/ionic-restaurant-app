import axios from "axios";

export async function getPlayerFromAPI(data, setState) {
  try {
    const result = await axios.get(`https://api.showzone.io/api/player-profiles/${data}/?format=json`);
    setState(result.data);
  } catch (err) {
    console.log(err);
  }
}

export function getPropsClassName(className) {
  if(className === undefined) return "";

  return className + " ";
}

export function getRarityIconUrl(overallScore) {
  if (overallScore > 84) return "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-diamond.png";
  if (overallScore > 79) return "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-gold.png";
  if (overallScore > 74) return "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-silver.png";
  if (overallScore > 64) return "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-bronze.png";
 
  return "https://storage.googleapis.com/showzone-cloud/assets/icons/shield-common.png"
}