import { createContext, useState, useCallback, useEffect } from "react"
import { useRouter } from "next/router"
import axios from 'axios'
// import Head from "next/head"
import LoaderBaseball from "@components/LoaderBaseball"
import CryptoJS from "crypto-js"
import {
  registerUserUpdateEventListener,
  getUserStripeRole,
  getCheckoutUrl,
  getUserCardFollows,
  getUserCardNotifications,
  getManageAccountUrl,
  registerUser,
  resetUserPassword,
  sendVerificationEmailToUser,
  signUserOut,
  signUserIn,
} from "../../../adapters/firebase/services"


const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children, isProtected = false }) => {
  const [loading, setLoading] = useState(false)
  const [userLoaded, setUserLoaded] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [currentUserRole, setCurrentUserRule] = useState("Free - Bronze")
  const [currentUserIsSilverPlus, setCurrentUserIsSilverPlus] = useState(false)
  const [currentUserIsGoldPlus, setCurrentUserIsGoldPlus] = useState(false)
  const [currentUserIsDiamondPlus, setCurrentUserIsDiamondPlus] =
    useState(false)
  const [currentUserIsCreatorPlus, setCurrentUserIsCreatorPlus] =
    useState(false)
  const [hyvorSSO, setHyvorSSO] = useState({})
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false)
  const router = useRouter()

  const signUp = useCallback(
    async (email, password, displayName) => {
      await registerUser({ email, password, displayName })
      router.push("/profile?successful_signup")
    },
    [router]
  )

  const signIn = useCallback(async (email, password, redirect) => {
    console.log(redirect)
    if(redirect) {
        await signUserIn({ email, password })
        window.location.replace(redirect)
    } else {
        await signUserIn({ email, password })
        window.location.replace("/profile")
    }
  }, [])

  const signOut = useCallback(async () => {
    setLoading(true)
    await signUserOut()
    // currentUserIsSilverPlus should be `false` when the user is logged out
    setCurrentUserIsSilverPlus(false)
    setLoading(false)
    router.push("/login")
  }, [router])

  const updateUserInfo = useCallback(async user => {
    let HYVOR_TALK_CONFIG = {
        url: false,
        id: false
    };
    var HYVOR_TALK_PRIVATE_KEY = "f420cad5d78d9ce10e777b21e3d1f01d"
    // convert firebase user object to hyvor talk-friendly object
    var userData = user
      ? {
          id: user.uid,
          name: user.displayName || user.email.replace(/@.+/, ""),
          email: user.email,
          picture: user.photoURL,
        }
      : {}
    userData = btoa(JSON.stringify(userData))
    var hash = CryptoJS.HmacSHA1(userData, HYVOR_TALK_PRIVATE_KEY).toString()
    HYVOR_TALK_CONFIG.sso = {
      hash: hash,
      userData: userData,
    }
    setHyvorSSO(HYVOR_TALK_CONFIG.sso)

    setCurrentUser(user)
  
    // pull from 40-40 here
    if(user) {
      axios.get(`https://showzone-user-api.onrender.com/users/by-username/${user?.displayName}`).then(results => {
        console.log('user_results', results)
        user.userData = results.data
        setCurrentUser(user)
      })
    }
    

    
    if (user) {
      const stripeRole = await getUserStripeRole(user)
      if (stripeRole) {
        setCurrentUserRule(stripeRole)
        setCurrentUserIsSilverPlus(true)
      }
      if (stripeRole === "PRO-Gold") {
        setCurrentUserIsSilverPlus(true)
        setCurrentUserIsGoldPlus(true)
      }
      if (stripeRole === "PRO-Diamond") {
        setCurrentUserIsSilverPlus(true)
        setCurrentUserIsGoldPlus(true)
        setCurrentUserIsDiamondPlus(true)
      }
      if(stripeRole === "PRO-Creator") {
        setCurrentUserIsSilverPlus(true)
        setCurrentUserIsGoldPlus(true)
        setCurrentUserIsDiamondPlus(true)
        setCurrentUserIsCreatorPlus(true)
      }
    }
    setUserLoaded(true)
  }, [])

  const manageAccount = useCallback(async () => {
    setLoading(true)
    {
      const portalUrl = await getManageAccountUrl({
        returnUrl: window.location.origin,
      })
      window.location.assign(portalUrl)
    }
  }, [])

  const startCheckoutSession = useCallback(
    async (priceId, metadata = null) => {
      setLoading(true)
      try {
        const checkoutUrl = await getCheckoutUrl({
          priceId,
          metadata,
          userId: currentUser.uid,
          // successUrl: window.location.origin + "/thank-you?successful_payment",
          successUrl: window.location.origin + "/thank-you?successful_payment&session_id={CHECKOUT_SESSION_ID}",
          cancelUrl: window.location.origin + "/pro",
        })
        window.location.assign(checkoutUrl)
      } catch (error) {
        alert(`An error occured: ${error.message}`)
      }
    },
    [currentUser]
  )

  const sendVerificationEmail = useCallback(async () => {
    await sendVerificationEmailToUser()
    setEmailHasBeenSent(true)
    setTimeout(() => {
      setEmailHasBeenSent(false)
    }, 3000)
  }, [])

  const changeEmail = useCallback(
    async email => {
      await currentUser.updateEmail(email)
      await sendVerificationEmailToUser()
    },
    [currentUser]
  )



  useEffect(() => {
    registerUserUpdateEventListener(updateUserInfo)
  }, [updateUserInfo])

  useEffect(() => {
    if (isProtected && userLoaded && !currentUser) router.push("/login")
  }, [isProtected, userLoaded, currentUser, router])

  const contextValues = {
    currentUser,
    currentUserRole,
    currentUserIsSilverPlus,
    currentUserIsGoldPlus,
    currentUserIsDiamondPlus,
    hyvorSSO,
    emailHasBeenSent,
    userLoaded,
    isNotLoggedIn: userLoaded && !currentUser,
    signUp,
    signIn,
    signOut,
    manageAccount,
    resetPassword: resetUserPassword,
    sendVerificationEmail,
    changeEmail,
    startCheckoutSession,
    updateUserInfo
  }

  if (loading || (isProtected && !userLoaded)) return <LoaderBaseball />

  return (
    <AuthContext.Provider value={contextValues}>
      {/* {!currentUserIsSilverPlus ? (
        <Head>
          <script
            type="text/javascript"
            src="//monu.delivery/site/a/9/598bde-eb57-4f38-a35e-8d84df26769e.js"
            data-cfasync="false"
          />
        </Head>
      ) : (
        ""
      )} */}
      {children}
    </AuthContext.Provider>
  )
}
