import Grid from "@mui/material/Grid"
import { Typography } from "@mui/material"
import PlayerCard from "@components/PlayerCard"
import { styled } from "@mui/system"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Autoplay, Navigation } from "swiper"

const TrueOverallSlider = ({ players, small }) => {
  const Styles = styled("div")`
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 0.5;
      background: rgba(0, 0, 0, 1);
      top: 0;
      width: 50px;
      margin: 0;
      color: white;
      ${props => props.theme.breakpoints.up("md")} {
        height: ${small ? "" : "100%"};
      }
      &:after {
        font-size: 1rem;
        font-weight: bold;
      }
      &:hover {
        opacity: 0.75;
      }
    }
    .swiper-button-next {
      right: 0 !important;
    }
    .swiper-button-prev {
      left: 0 !important;
    }
  `
  return (
    <Styles>
      <Grid container spacing={6}>
        <Grid item xs>
          {players.length > 0 ? (
            <Swiper
              watchSlidesProgress={true}
              slidesPerView={"auto"}
              spaceBetween={30}
              className="mySwiper"
              navigation={true}
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
            >
              {players.map(player => (
                <SwiperSlide key={player} style={{ width: "210px" }}>
                  <PlayerCard
                    data={player}
                    width={210}
                    // showViewButton={false}
                    style={{ margin: "0.7rem auto" }}
                  />
                  <Typography style={{textAlign: "center", textTransform: "uppercase", color: "#ed2024", fontWeight: "bold", lineHeight: 1}} variant="p" component="p">
                    True Overall
                  </Typography>
                  <Typography style={{textAlign: "center", textTransform: "uppercase"}} variant="h1" component="p">
                    {player.playerprofileadvanced.overall_true}
                  </Typography>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Styles>
  )
}

export default TrueOverallSlider
