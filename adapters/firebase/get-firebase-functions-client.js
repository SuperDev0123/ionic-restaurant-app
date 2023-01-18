import config from "../../config"

const getFirebaseFunctionsClient = async region => {
  const { default: firebase } = await import("firebase/app")
  await Promise.all([
    import("firebase/auth"),
    import("firebase/firestore"),
    import("firebase/functions"),
  ])

  const firebaseApp =
    firebase.apps.length === 0
      ? firebase.initializeApp(config.firebase)
      : firebase.apps[0]

  return firebaseApp.functions(region)
}

export default getFirebaseFunctionsClient
