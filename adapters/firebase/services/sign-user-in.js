import getFirebaseAuthClient from "../get-firebase-auth-client"

const signUserIn = async ({ email, password }) => {
  const firebaseAuth = await getFirebaseAuthClient()
  return firebaseAuth.signInWithEmailAndPassword(email, password)
}

export default signUserIn
