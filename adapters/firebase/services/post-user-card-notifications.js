import getFirestoreDbClient from "../get-firestore-db-client"
import getUserCardNotifications from "./get-user-card-notifications"
const postUserCardNotifications = async ({ userId, cardId, buyPrice, sellPrice, pastSellThreshold = false, pastBuyThreshold = false, pastSellThresholdAmount = 0, pastBuyThresholdAmount = 0 }) => {
  const db = await getFirestoreDbClient()


  var dataCheck = await db.collection("users-card-notifications").where('user_id', '==', userId)
  .where('card_id', '==', cardId).get()

  if(dataCheck.docs.length > 0) {
    const docRef = db
      .collection("users-card-notifications")
      .where('user_id', '==', userId)
      .where('card_id', '==', cardId)
      .get()
      .then(async (querySnapshot) => {
        const data = querySnapshot.docs.map(async (doc) => {
          await doc.ref.update({
            buy_notif: buyPrice,
            sell_notif: sellPrice,
            past_sell_threshold: pastSellThreshold,
            past_buy_threshold: pastBuyThreshold,
            past_sell_threshold_amount: pastSellThresholdAmount,
            past_buy_threshold_amount: pastBuyThresholdAmount
          })
        })
        return querySnapshot
      }).catch(err => {
        console.log('err', err)
      })
  } else {
    const docRef = db
      .collection("users-card-notifications")
      .add({
          user_id: userId,
          card_id: cardId,
          buy_notif: buyPrice,
          sell_notif: sellPrice,
          past_sell_threshold: pastSellThreshold,
          past_buy_threshold: pastBuyThreshold,
          past_sell_threshold_amount: pastSellThresholdAmount,
          past_buy_threshold_amount: pastBuyThresholdAmount
      })
      .then((querySnapshot) => {
      
        return querySnapshot
      }).catch(err => {
        console.log('err', err)
      })
  }
  }
  

export default postUserCardNotifications
