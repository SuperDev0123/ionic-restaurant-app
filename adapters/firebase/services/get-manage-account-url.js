import getFirebaseFunctionsClient from "../get-firebase-functions-client"

const getManageAccountUrl = async reqBody => {
  try {
    const fbFunctions = await getFirebaseFunctionsClient("us-west4")

    const createPortalLink = fbFunctions.httpsCallable(
      "ext-firestore-stripe-subscriptions-createPortalLink"
    )
    const {
      data: { url },
    } = await createPortalLink(reqBody)
    return url
  } catch (err) {
    console.error(err)
  }
}

export default getManageAccountUrl
