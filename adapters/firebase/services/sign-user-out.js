import getFirebaseAuthClient from "../get-firebase-auth-client"

const signUserOut = async () => {
  const firebaseAuth = await getFirebaseAuthClient()
  return firebaseAuth.signOut()
}

export default signUserOut
