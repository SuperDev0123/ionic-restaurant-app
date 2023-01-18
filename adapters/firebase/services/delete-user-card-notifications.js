import getFirestoreDbClient from "../get-firestore-db-client"

const deleteUserCardNotifications = async ({ userId, cardId }) => {
  const db = await getFirestoreDbClient()

  const docRef = db
    .collection("users-card-notifications")
    .where('user_id', '==', userId)
    .where('card_id', '==', cardId)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(function(doc) {
            doc.ref.delete()
        })
    
      return querySnapshot
    }).catch(err => {
      console.log('err', err)
    })
}

export default deleteUserCardNotifications
