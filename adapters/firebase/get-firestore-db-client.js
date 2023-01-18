import config from "../../config"

const getFirestoreDbClient = async () => {
  const { default: firebase } = await import("firebase/app")
  await Promise.all([import("firebase/auth"), import("firebase/firestore")])
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebase)
  }

  return firebase.firestore()
}

export default getFirestoreDbClient
