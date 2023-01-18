import getFirebaseAuthClient from "../get-firebase-auth-client"

const updateUserUsername = async ({ id, username, successUrl, cancelUrl }) => {

    console.log('id', id)
    console.log('username', username)
    const firebaseAuth = await getFirebaseAuthClient()
    console.log('firebaseAuth', firebaseAuth.auth)
    await firebaseAuth.user.updateProfile({ displayName: username })

    return firebaseAuth
}

export default updateUserUsername
