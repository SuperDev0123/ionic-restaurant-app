import getFirestoreDbClient from "../get-firestore-db-client"

const getCheckoutUrl = async ({ priceId, userId, successUrl, cancelUrl, metadata = null }) => {
  const db = await getFirestoreDbClient()

  const data = {
    price: priceId,
    allow_promotion_codes: true,
    success_url: successUrl,
    cancel_url: cancelUrl,
  };
  
  if(metadata !== null) data.metadata = metadata;

  const docRef = await db
    .collection("users")
    .doc(userId)
    .collection("checkout_sessions")
    .add(data)

  return new Promise((resolve, reject) => {
    docRef.onSnapshot(snap => {
      const { error, url } = snap.data()
      if (error) {
        reject(err)
      }
      if (url) {
        resolve(url)
      }
    })
  })
}

export default getCheckoutUrl
