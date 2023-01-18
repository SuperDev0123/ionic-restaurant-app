import config from "../../config"

const getFirebaseMessagingClient = async () => {
  const { default: firebase } = await import("firebase/app")
  await import("firebase/messaging")
  
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebase)
  }
  // Add the public key generated from the console here.
  const messaging = await firebase.messaging()
  console.log('messaging', messaging)
  return messaging
}

export default getFirebaseMessagingClient