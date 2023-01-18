import Grid from "@mui/material/Grid"
import Post from "./Post"
import { styled } from "@mui/system"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Autoplay, Navigation } from "swiper"

const Posts = ({ posts, small }) => {
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
    .swiper-slide {
      max-width: 100%;
    }
  `
  return (
    <Styles>
      <Grid container spacing={6}>
        <Grid item xs justify="space-between">
          {posts.length > 0 ? (
            <Swiper
              watchSlidesProgress={true}
              slidesPerView={"auto"}
              spaceBetween={30}
              navigation={true}
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
            >
              {posts.map(post => (
                <SwiperSlide key={post} style={{ width: "400px" }}>
                  <Post
                    title={
                      <span
                        dangerouslySetInnerHTML={{
                          __html: post?.title?.rendered ?? "",
                        }}
                      />
                    }
                    date={
                      new String(
                        new Date(post?.date).toLocaleDateString("en-us", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      ) ?? ""
                    }
                    image={post?.better_featured_image?.source_url ?? ""}
                    slug={post?.slug ?? ""}
                    external_url={post?.acf?.external_url}
                  />
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

export default Posts
