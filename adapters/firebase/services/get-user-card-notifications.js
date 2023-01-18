import getFirestoreDbClient from "../get-firestore-db-client"

const getUserCardNotifications = async ({ userId, successUrl, cancelUrl }) => {
  const db = await getFirestoreDbClient()
  return db
    .collection("users-card-notifications")
    .where('user_id', '==', userId)
    .get()
    .then((querySnapshot) => {
      
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return data
    }).catch(err => {
      console.log('err', err)
    })
}

export default getUserCardNotifications
