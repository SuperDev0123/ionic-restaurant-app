import React, { useEffect, useState } from "react"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { styled, spacing } from "@mui/system"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import useAuth from "@useAuth"

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';

import useNotifs from "../../features/notifications/contexts/useNotifs";
import axios from 'axios'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const FollowButton = ({
    player,
    large = true
}) => {
    const { currentUser, userLoaded, currentUserIsSilverPlus, currentUserIsGoldPlus, currentUserIsDiamondPlus } = useAuth()
    const { userNotifications, userNotificationsLoaded, userFollows, userFollowsLoaded, postCardFollow, deleteCardFollow, postCardNotifs, deleteCardNotifs } = useNotifs()
    const [isFollowed, setIsFollowed] = useState(false)
    const [isNotified, setIsNotified] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [sellPrice, setSellPrice] = useState(0)
    const [buyPrice, setBuyPrice] = useState(0)
    const [notisAllowed, setNotisAllowed] = useState(0)
    const Spacer = styled("div")(spacing)
    const changeSellPrice = ($ev) => {setSellPrice($ev.target.value)}
    const changeBuyPrice = ($ev) => {setBuyPrice($ev.target.value)}
    useEffect(() => {
        if(userFollowsLoaded) {
            var find = userFollows.find(card => {
                return card.card_id === player.card_id
            })
            if(find) {      
                setIsFollowed(true)
            }
        }
    }, [userFollowsLoaded])


    useEffect(() => {
        
        if(userNotificationsLoaded) {
            var find = userNotifications.find(card => {
                return card.card_id === player.card_id
            })
            

            if(find) {      
                setIsNotified(true)
                setSellPrice(find.sell_notif)
                setBuyPrice(find.buy_notif)
            }
        }
    }, [userNotificationsLoaded])

    useEffect(() => {
        let notis_allowed = 0
        let notis = userNotifications.length
        if(currentUserIsSilverPlus) {
            notis_allowed = 5
        }
        if(currentUserIsGoldPlus) {
            notis_allowed = 25
        }
        if(currentUserIsDiamondPlus) {
            notis_allowed = 10000000
        }
        var result = notis_allowed > notis
        setNotisAllowed(result)
    },[userLoaded,openModal])

    

    const notificationModalOpen = () => {setOpenModal(true)}
    const notificationModalClose = () => {setOpenModal(false)}

    const followThisCard = () => {
        if(!currentUser) {
            // redirect
            window.location.replace('/login')
        }
        if(isFollowed === false) {
          try { 
            postCardFollow({
              userId: currentUser.uid,
              cardId: player.card_id
            })
            setIsFollowed(true)
          } catch (err) {
            console.log(err)
          }
        }
        if(isFollowed === true) {
          try { 
            deleteCardFollow({
              userId: currentUser.uid,
              cardId: player.card_id
            })
            setIsFollowed(false)
          } catch (err) {
            console.log(err)
          }
        }
    }

    const saveNotificationSettings = () => {
        // if(!currentUser) {
        //     // redirect
        //     window.location.replace('/login')
        // }
        try {
            
            postCardNotifs({
                userId: currentUser.uid,
                cardId: player.card_id,
                sellPrice: sellPrice,
                buyPrice: buyPrice
            })

            setIsNotified(true)

            notificationModalClose()
            
        } catch(err) {
            console.log('err', err)
        }
    }

    const deleteNotificationSettings = () => {
        try {
            deleteCardNotifs({
                userId: currentUser.uid,
                cardId: player.card_id,
            })

            setIsNotified(false)

            notificationModalClose()
        } catch(err) {
            console.log('err', err)
        }
    }

    let FollowButton = styled(Button)`
        .MuiSvgIcon-root {
            margin-right: 5px;
        }
    `
    let FavouriteButton = styled(Button)`
        margin-left: 10px;
        .MuiSvgIcon-root {
            margin-right: 5px;
        }
    `
    if(large !== true) {
        FollowButton = styled(IconButton)`
        
        `
        FavouriteButton = styled(IconButton)`
        
        `
    }

    
    const textDecider = () => {
        let text = 'Unfavorite This Card'

        if(isFollowed === false) {
            text = 'Favorite This Card'
        }

        if(large === false) {
            text = null
        }
        if(isFollowed === true) {
            return (
                <><FavoriteIcon/>{ text }</>
            )
        }
        if(isFollowed === false) {
            return (
                <><FavoriteBorderIcon/>{ text }</>
            )
        }
    }

    const favouriteTextDecider = () => {
        let text = 'Notifications'
        if(large === false) {
            text = null
        }
        if(isNotified === true) {
            return (
                <><NotificationsIcon/>{ text }</>
            )
        }
        if(isNotified === false) {
            return (
                <><NotificationsNoneIcon/>{ text }</>
            )
        }
    }

    if(userFollowsLoaded === false) return (<></>)
    // to dos in here:
    // 3. Get notifications
    return (
        <>
            <Modal
                open={openModal}
                onClose={notificationModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Set Card Notifications
                    </Typography>
                    { notisAllowed ? <>
                        <Spacer mb={3}></Spacer>
                        {/* sell price threshold */}
                        <TextField id="outlined-basic" onChange={changeSellPrice} value={sellPrice} label="Sell Price Threshold" variant="outlined" />
                        <Typography  variant="caption" display="block" gutterBottom id="modal-modal-description"  sx={{ mt: 2 }}>
                            You will get notified every time the card&apos;s Sell Price is HIGHER than this threshold. <b>Example: if you set the threshold to 1600, you will be notified if the card&apos;s Sell Price is 1602.</b>
                        </Typography>
                        <Spacer mb={3}></Spacer>
                        {/* buy price threshold */}
                        <TextField id="outlined-basic" onChange={changeBuyPrice} value={buyPrice} label="Buy Price Threshold" variant="outlined" />
                        <Typography  variant="caption" display="block" gutterBottom id="modal-modal-description" sx={{ mt: 2 }}>
                            You will get notified every time the card&apos;s Buy Price is LOWER than this threshold. <b>Example: if you set the threshold to 80, you will be notified if the card&apos;s Buy Price is 78.</b>
                        </Typography>
                        <Spacer mb={3}></Spacer>
                        {/* set notifications button */}
                        <Button variant="contained" onClick={saveNotificationSettings}>Save Notification Setting</Button> 
                        { isNotified === true ? (
                            <>
                                <Spacer mb={3}></Spacer>
                                <hr/>
                                <Spacer mb={3}></Spacer>
                                <Button variant="contained" onClick={deleteNotificationSettings}>Remove Notification</Button> 
                            </>
                        ) : <></> } 
                    </>  : 
                    <>
                        <Spacer mb={3}></Spacer>
                        You are over the alloted number of notifications for your plan. You will need to remove other player notifications to continue.
                        <Spacer mb={3}></Spacer>
                        <Button href="/profile" variant="contained">View Your Notifications</Button>
                    </> }               
                    {/* create the post, delete and update notifcation thing, plus the table changes in firestore */}
                </Box>
            </Modal>
            <FollowButton onClick={ () => followThisCard() } variant={(isFollowed === false ? 'contained' : 'text')}>
                { textDecider() }
            </FollowButton>
            { isFollowed === true ?
            (
                <>
                    {/* <FavouriteButton color="success"  onClick={ () => notificationModalOpen() } variant={(isNotified === true ? 'contained' : 'text')}>
                        { favouriteTextDecider() }
                    </FavouriteButton> */}
                </>
            ) 
            : (<></>)
            }

         
        </>
    )
}


export default FollowButton