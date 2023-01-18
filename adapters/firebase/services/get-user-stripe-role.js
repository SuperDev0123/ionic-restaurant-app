import getFirebaseAuthClient from "../get-firebase-auth-client"

const getUserStripeRole = async () => {
  const firebaseAuth = await getFirebaseAuthClient()
  await firebaseAuth.currentUser.getIdToken(true)
  const decodedToken = await firebaseAuth.currentUser.getIdTokenResult()
  return decodedToken.claims.stripeRole
}

export default getUserStripeRole
