import { createContext, useState, useCallback, useEffect } from "react"
// import { useRouter } from "next/router"
// import Head from "next/head"
// import LoaderBaseball from "@components/LoaderBaseball"
import CryptoJS from "crypto-js"
import Button from "@mui/material/Button"

import useAuth from "@useAuth"
import { useSnackbar } from 'notistack';
import axios from 'axios'

// import { getMessaging, getToken, onMessage } from "firebase/messaging";

import {
  getUserCardFollows,
  getUserCardNotifications,
} from "../../adapters/firebase/services"
import postUserCardFollow from "../../adapters/firebase/services/post-user-card-follow"
import deleteUserCardFollow from "../../adapters/firebase/services/delete-user-card-follow"
import postUserCardNotifications from "../../adapters/firebase/services/post-user-card-notifications"
import deleteUserCardNotifications from "../../adapters/firebase/services/delete-user-card-notifications"


import LoaderBaseball from "@components/LoaderBaseball"
const NotificationContext = createContext()

export default NotificationContext

export const NotificationProvider = ({ children, isProtected = false }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [userNotifications, setUserNotifications] = useState([])
  const [userNotificationsLoaded, setUserNotificationsLoaded] = useState(false)
  const [userFollows, setUserFollows] = useState([])
  const [userFollowsLoaded, setUserFollowsLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isTokenFound, setTokenFound] = useState(false); //
  const { currentUser, userLoaded, currentUserIsSilverPlus, currentUserIsGoldPlus, currentUserIsDiamondPlus } = useAuth()
  
  const loadDataPoints = useCallback(async () => {    
    try {
      let user_cards = await getUserCardFollows({
        userId: currentUser?.uid
      })
      setUserFollows(user_cards)
      setUserFollowsLoaded(true)
      let user_notis = await getUserCardNotifications({
        userId: currentUser?.uid
      })
      
      setUserNotifications(user_notis)
      setUserNotificationsLoaded(true)
      setLoading(false)
    } catch(err) {
      console.log('err', err)
    }
  
  }, [userLoaded])
  
  useEffect(() => {
    if(userLoaded) {
      loadDataPoints()
    }
  }, [userLoaded])

  useEffect(() => {
    if(userNotifications.length > 0 && userLoaded) {
      
      var intervalLength = 300000 // TO DO - CHANGE TO 300000
      if (currentUserIsGoldPlus) {
        intervalLength = 60000
      }

      const interval = setInterval(() => {
          triggerNotifications()
        }, intervalLength); /// TO DO - CHANGE TO 60000
        return () => clearInterval(interval);
    }
  }, [userNotifications]);

  const deleteNotificationSettings = (card_id, key) => {
    try {
        deleteUserCardNotifications({
            userId: currentUser.uid,
            cardId: card_id,
        })
        closeSnackbar(key)
    } catch(err) {
        console.log('err', err)
    }
  }

  const triggerNotifications = () => {
    console.log('userNotifications', userNotifications)
    var user_notis = userNotifications
    if(user_notis) {
      var card_array = []
      for(const notification of user_notis) {
        card_array.push(notification.card_id)
      }
    }
    if(user_notis.length > 0) {
      axios.get(`https://api.showzone.io/api/market-listings/?item=${card_array}`).then(results => {
          // need to do count more than 25

          let market_listings = results.data.results

          for(const listing of market_listings) {
            var find = userNotifications.find(notification => { 
              return notification.card_id === listing.item
            })

            if(find) {
              // console.log('find', find, listing)
              const action = key => (
                <>
                  <Button sx={{ color: '#fff' }} target="_blank" href={'/players/' + listing.item}>
                    View Card
                  </Button>
                  <Button sx={{ color: '#fff' }} onClick={() => { deleteNotificationSettings(listing.item, key) }}>
                    Stop Notification
                  </Button>
                </>
              );

              var best_sell_price = listing.best_sell_price
              var best_buy_price = listing.best_buy_price
              if(currentUserIsGoldPlus) {
                best_sell_price = listing.best_sell_price_pro
                best_buy_price = listing.best_buy_price_pro
              }

              let pastSellThreshold = false
              let pastBuyThreshold = false
              let pastSellThresholdAmount = 0
              let pastBuyThresholdAmount = 0
              console.log('find', find)

              var options = { 
                  variant: 'error', 
                  action, 
                  key: listing.item + '-' + best_sell_price, autoHideDuration: 10000,
                  iconVariant: 'none'
              }

              if(best_sell_price >= parseInt(find?.sell_notif)) {
                if(!find?.past_sell_threshold) {
                  enqueueSnackbar(`${listing.name} is at ${best_sell_price} which is above your ${find?.sell_notif} threshold.`, options);

                }
                // console.log('asdasdasd', find?.past_sell_threshold, parseInt(best_sell_price), parseInt(find?.past_sell_threshold_amount), )

                if(find?.past_sell_threshold === true && parseInt(best_sell_price) !== parseInt(find?.past_sell_threshold_amount)) {
                  enqueueSnackbar(`Price change: ${listing.name} is at ${best_sell_price} which is above your ${find?.sell_notif} threshold.`, options);
                }
                pastSellThreshold = true
                pastSellThresholdAmount = best_sell_price
              }

              if(parseInt(find?.buy_notif) >= best_buy_price) {
                if(!find?.past_buy_threshold) {
                  enqueueSnackbar(`${listing.name} is at ${best_buy_price} which is below your ${find?.buy_notif} threshold.`, options);
                }
                if(find?.past_buy_threshold === true && parseInt(best_buy_price) !== parseInt(find?.past_buy_threshold_amount)) {
                  enqueueSnackbar(`Price change: ${listing.name} is at ${best_sell_price} which is below your ${find?.sell_notif} threshold.`, options);
                }

                pastBuyThreshold = true
                pastBuyThresholdAmount = best_buy_price
              }
              
              postUserCardNotifications({
                userId: currentUser.uid,
                cardId: listing.item,
                sellPrice: find?.sell_notif,
                buyPrice: find?.buy_notif,
                pastSellThreshold: pastSellThreshold,
                pastBuyThreshold: pastBuyThreshold,
                pastSellThresholdAmount: pastSellThresholdAmount,
                pastBuyThresholdAmount: pastBuyThresholdAmount
              })
            }
            
          }
          loadDataPoints()
      })
    }
  }

  const postCardFollow = (data) => {
    postUserCardFollow(data)
    loadDataPoints()
  }
  const deleteCardFollow = (data) => {
    deleteUserCardFollow(data)
    loadDataPoints()
  }

  const postCardNotifs = (data) => {
    postUserCardNotifications(data)
    loadDataPoints()
  }

  const deleteCardNotifs = (data) => {
    deleteUserCardNotifications(data)
    loadDataPoints()
  }




  const contextValues = {
    userNotifications,
    userFollows,
    userNotificationsLoaded,
    userFollowsLoaded,
    loadDataPoints,
    postCardFollow,
    deleteCardFollow,
    postCardNotifs,
    deleteCardNotifs
  }

  if(loading) return <LoaderBaseball/>

  return (
    <NotificationContext.Provider value={contextValues}>
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
    </NotificationContext.Provider>
  )
}
