import getFirestoreBackendDbClient from "../../adapters/firebase/get-firestore-backend-db-client";
const { FieldValue } = require('firebase-admin/firestore');
import axios from "axios";
import config from "../../config";

export default async function handler(req, res) {
  const { code, userId } = req.body;
  const websiteId = config.ads.playwireWebsiteId;

  const { data } = await axios.get(`https://rewarded-user.herokuapp.com/status/${websiteId}/${userId}/${code}`);

  let responseObj;

  if(data.status === "Redeemed."){
    const amount = await addTokens(userId, 1);
    responseObj = {amount: amount};
  }else{
    responseObj = {error: data.status}
  }

  res.status(200).json(responseObj);
}


async function addTokens(uid, numOfTokens) {
  const db = await getFirestoreBackendDbClient();
  const dataRef = db.collection('user_tokens').doc(uid);

  const doc = await dataRef.get();
  let amount = 0;

  if (doc.exists) {
    await dataRef.update({
      amount: FieldValue.increment(numOfTokens)
    });
    amount = doc.data().amount;
  } else {
    await dataRef.set({amount: numOfTokens}, {merge: true});
  }

  amount += numOfTokens;

  return amount;
}