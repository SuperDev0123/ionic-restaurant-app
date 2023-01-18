import getFirebaseAuthClient from "../get-firebase-auth-client"

const sendVerificationEmailToUser = async () => {
  const firebaseAuth = await getFirebaseAuthClient()
  return firebaseAuth.currentUser.sendEmailVerification()
}

export default sendVerificationEmailToUser
