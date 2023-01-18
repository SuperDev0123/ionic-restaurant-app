import getFirebaseAuthClient from "../get-firebase-auth-client"

const resetUserPassword = async email => {
  const firebaseAuth = await getFirebaseAuthClient()
  return firebaseAuth.sendPasswordResetEmail(email)
}

export default resetUserPassword
