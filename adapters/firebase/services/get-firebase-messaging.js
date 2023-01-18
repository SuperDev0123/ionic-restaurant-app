import getFirebaseMessagingClient from "../get-firebase-messaging-client"

const getFirebaseMessaging = async () => {
    const messaging = await getFirebaseMessagingClient()

   
    return messaging
}

export default getFirebaseMessaging