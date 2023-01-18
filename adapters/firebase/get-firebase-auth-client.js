import config from "../../config"

const getFirebaseAuthClient = async () => {
  const { default: firebase } = await import("firebase/app")
  await import("firebase/auth")
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebase)
  }

  return firebase.auth()
}

export default getFirebaseAuthClient
