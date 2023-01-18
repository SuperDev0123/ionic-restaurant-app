import { useState, useEffect } from "react"
import { styled } from "@mui/system"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MuiIconButton from "@mui/material/IconButton"
import Button from "@components/Buttons/Button"
import SearchIcon from "@mui/icons-material/Search"

import Link from "@components/OurLink"
import NavLink from "@components/OurNavLink"
import useAuth from "@useAuth"
import PlayerSearchModal from "../../../navigation/PlayerSearchModal"

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`

const NavbarUserDropdown = () => {
  const { currentUserIsGoldPlus, currentUser, signOut, userLoaded } = useAuth()

  const [anchorMenu, setAnchorMenu] = useState(null)

  const toggleMenu = event => setAnchorMenu(event.currentTarget)
  const closeMenu = () => setAnchorMenu(null)

  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  let keysPressed = {}

  useEffect(() => {
    document.addEventListener("keydown", event => {
      keysPressed[event.key] = true
      if (keysPressed["Control"] && event.key == " ") {
        setOpenModal(true)
      }
    })
    document.addEventListener("keyup", event => {
      delete keysPressed[event.key]
    })
  }, [])

  // useEffect(() => {
  //   var intervalLength = 300000 // TO DO - CHANGE TO 300000
  //   if (currentUserIsGoldPlus) {
  //     intervalLength = 60000
  //   }

  //   const interval = setInterval(() => {
  //       triggerNotifications()
  //     }, intervalLength); /// TO DO - CHANGE TO 60000
  //     return () => clearInterval(interval);
  // }, [userLoaded]);

  // const deleteNotificationSettings = (card_id) => {
  //   try {
  //       deleteUserCardNotifications({
  //           userId: currentUser.uid,
  //           cardId: card_id,
  //       })
  //   } catch(err) {
  //       console.log('err', err)
  //   }
  // }

  // const triggerNotifications = () => {
  //   console.log('userNotifications', userNotifications)
  //   var user_notis = userNotifications
  //   if(user_notis) {
  //     var card_array = []
  //     for(const notification of user_notis) {
  //       card_array.push(notification.card_id)
  //     }
  //   }
  //   axios.get(`https://api.showzone.io/api/market-listings/?item=${card_array}`).then(results => {
  //       console.log('results', results)
  //       // need to do count more than 25

  //       let market_listings = results.data.results

  //       for(const listing of market_listings) {
  //         var find = userNotifications.find(notification => {
  //           return notification.card_id === listing.item
  //         })
  //         // console.log('find', find, listing)
  //         const action = key => (
  //           <>
  //             <Button sx={{ color: '#fff' }} target="_blank" href={'/players/' + listing.item}>
  //               View Card
  //             </Button>
  //             <Button sx={{ color: '#fff' }} onClick={() => { deleteNotificationSettings(listing.item) }}>
  //               Stop Notification
  //             </Button>
  //           </>
  //         );

  //         var best_sell_price = listing.best_sell_price
  //         var best_buy_price = listing.best_buy_price
  //         if(currentUserIsGoldPlus) {
  //           best_sell_price = listing.best_sell_price_pro
  //           best_buy_price = listing.best_buy_price_pro
  //         }

  //         if(best_sell_price >= parseInt(find.sell_notif)) {

  //           enqueueSnackbar(`${listing.name} is at ${best_sell_price} which is above your ${find.sell_notif} threshold.`,
  //             {
  //               variant: 'error',
  //               action,
  //               key: listing.item + '-' + listing.best_sell_price_pro, autoHideDuration: 10000,
  //               iconVariant: 'none'
  //             });
  //         }
  //         if(parseInt(find.buy_notif) >= best_buy_price) {
  //           enqueueSnackbar(`${listing.name} is at ${best_buy_price} which is below your ${find.buy_notif} threshold.`,
  //           {
  //             variant: 'error',
  //             action,
  //             key: listing.item + '-' + listing.best_sell_price_pro, autoHideDuration: 10000,
  //             iconVariant: 'none'
  //           });
  //         }
  //       }
  //   })
  // }

  if (!userLoaded) return null

  return (
    <>
      <PlayerSearchModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />

      {!currentUser ? (
        <div>
          <Button href={"/register"} size="sm">Register</Button>
          <Button href={"/login"} size="sm" style={{ marginLeft: ".5rem" }} color="white">
            Login
          </Button>
          <IconButton
            aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={() => handleOpenModal()}
            color="inherit"
            size="large"
          >
            <SearchIcon />
          </IconButton>
        </div>
      ) : (
        <div>
          <IconButton
            aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={toggleMenu}
            color="inherit"
            size="large"
          >
            <AccountCircleIcon />
          </IconButton>
          <IconButton
            aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={() => handleOpenModal()}
            color="inherit"
            size="large"
          >
            <SearchIcon />
          </IconButton>
        </div>
      )}

      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem>
          {/* <NavLink
            style={{ color: "#fff", textDecoration: "none" }}
            href={ `/profile/${currentUser?.displayName}` }
          >
            Profile
          </NavLink> */}
        </MenuItem>
        <MenuItem onClick={signOut}>Sign out</MenuItem>
      </Menu>
    </>
  )
}

export default NavbarUserDropdown
