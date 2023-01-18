import { styled, spacing } from "@mui/system"
import Typography from "@mui/material/Typography"
import MuiCard from "@mui/material/Card"
import MuiDivider from "@mui/material/Divider"
import CardContent from "@mui/material/CardContent"
import EmbedContainer from "react-oembed-container"
import useAuth from "@useAuth"
import { useRouter } from "next/router"
import HyvorTalkEmbed from "@components/HyvorTalkEmbed"
import Link from "@components/OurLink"
import SectionHeader from "@components/Typography/SectionHeader"
import Posts from "@features/home-page/components/PostsSlider"

const Card = styled(MuiCard)(spacing)
const Divider = styled(MuiDivider)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`

const Post = styled("div")`
  img {
    max-width: 100%;
    height: auto;
  }
`

const Styles = styled("div")`
  padding: 1rem 2rem;
  ${props => props.theme.breakpoints.up("md")} {
    padding: 1rem 3rem;
  }
  p {
    font-size: 20px;
  }
  a {
    color: ${props => props.theme.palette.primary.main};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
  }
  iframe[src*="youtube.com"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  h2 {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.25;
  }
  h3 {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.25;
  }
`

const SingleNewsContent = ({ post, relatedPosts }) => {
  const { hyvorSSO } = useAuth()
  const router = useRouter()

  return (
    <>
      <Styles>
        <EmbedContainer markup={post.content.rendered}>
          <Post
            dangerouslySetInnerHTML={{
              __html: post?.content?.rendered ?? "",
            }}
          />
        </EmbedContainer>
        {post?.acf?.guest_author ? (
          <Card>
            <CardContent>
              <Typography variant="overline">
                This post was submitted by a guest author.
              </Typography>
              <Typography variant="h4" gutterBottom>
                <Link target="_blank" href={post?._embedded?.author[0]?.url}>
                  {post?._embedded?.author[0]?.name}
                </Link>
              </Typography>
              <Typography gutterBottom>
                <span
                  dangerouslySetInnerHTML={{
                    __html: post?._embedded?.author[0]?.description ?? "",
                  }}
                />
              </Typography>
              <Typography>
                If you would like to be featured as a guest author on ShowZone,
                reach out to us at team@showzone.io with your ideas.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          ""
        )}
      </Styles>
      <Divider />
      <SectionHeader
        smallText="MLB The Show News & Tips"
        title="Related Content"
        h2
      />
      <Posts posts={relatedPosts} />
      <Divider />
      <SectionHeader smallText="Join the Discussion" title="Comments" h2 />
      <HyvorTalkEmbed />
    </>
  )
}

export default SingleNewsContent
