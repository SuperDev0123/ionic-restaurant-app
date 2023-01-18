import getFirestoreDbClient from "../get-firestore-db-client"

const getUserByUsername = async ({ username, successUrl, cancelUrl }) => {
//   const db = await getFirestoreDbClient()
//   return db
//     .collection("users")
//     .get()
//     .then((querySnapshot) => {
//       console.log('querySnapshot', querySnapshot)
//       const data = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       return data
//     }).catch(err => {
//       console.log('err', err)
//     })
}

export default getUserByUsername
