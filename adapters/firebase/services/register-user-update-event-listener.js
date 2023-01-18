import getFirebaseAuthClient from "../get-firebase-auth-client"

const registerUserUpdateEventListener = async cb => {
  try {
    const firebaseAuth = await getFirebaseAuthClient()
    firebaseAuth.onAuthStateChanged(cb)
  } catch (err) {
    console.error(err)
  }
}

export default registerUserUpdateEventListener
