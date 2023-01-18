import getFirestoreDbClient from "../get-firestore-db-client"

const postUserCardFollow = async ({ userId, cardId }) => {
  const db = await getFirestoreDbClient()
  const docRef = db
    .collection("users-card-follows")
    .add({
        user_id: userId,
        card_id: cardId
    })
    .then((querySnapshot) => {
    
      return querySnapshot
    }).catch(err => {
      console.log('err', err)
    })
}

export default postUserCardFollow
