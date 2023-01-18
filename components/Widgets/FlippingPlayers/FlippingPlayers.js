import React, { useState, useCallback, useEffect } from "react"
import Box from "@mui/material/Box"
import MuiCardContent from "@mui/material/CardContent"
import Paper from "@mui/material/Paper"
import MuiTypography from "@mui/material/Typography"
import { spacing, styled } from "@mui/system"
import axios from "axios"
import CardTop from "@components/Typography/CardTop"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Autoplay, Pagination } from "swiper"
import WidgetFlippingPlayerItem from "./FlippingPlayerItem"

const Styles = styled("div")`
  .swiper-pagination {
    text-align: right;
    padding-right: 1rem;
  }
  .swiper-pagination-bullet {
    background: white;
  }
`

const WidgetFlippingPlayers = () => {
  const [listings, setListings] = useState([])

  const fetchData = useCallback(async () => {
    let results = await axios.get(
      `https://api.showzone.io/api/market-listings/?format=json&order_by=dsc%20profit_minute`
    )
    setListings(results.data.results.splice(0, 6))
  })

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Styles>
      <Paper elevation={0}>
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={"auto"}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
        >
          {listings.map(listing => (
            <SwiperSlide key={listing}>
              <WidgetFlippingPlayerItem
                key={listing.item}
                card_id={listing.item}
                name={listing?.name}
                image={listing?.img}
                profitPerMinute={listing?.profit_minute}
                tsnLink={listing?.tsn_link}
                rarity={listing?.rarity}
                item_type={listing?.item_type}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Paper>
    </Styles>
  )
}

export default WidgetFlippingPlayers
