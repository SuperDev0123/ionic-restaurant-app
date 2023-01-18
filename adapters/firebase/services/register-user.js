import getFirebaseAuthClient from "../get-firebase-auth-client"

const registerUser = async ({ email, password, displayName }) => {
  const firebaseAuth = await getFirebaseAuthClient()

  const userCredentials = await firebaseAuth.createUserWithEmailAndPassword(
    email,
    password
  )
  await userCredentials.user.updateProfile({ displayName: displayName })
  await firebaseAuth.currentUser.sendEmailVerification()
  return userCredentials.user
}

export default registerUser
