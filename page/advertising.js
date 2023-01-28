import Head from "next/head"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import SectionHeader from "@components/Typography/SectionHeader"
import Link from "@components/OurLink"
import MuiPaper from "@mui/material/Paper"
import { styled } from "@mui/system"

const Paper = styled(MuiPaper)`
  padding: 2rem;
`

function AdvertisingPage() {
  return (
    <>
      <Head>
        <title>Advertising & Partnerships - ShowZone</title>
      </Head>
      <SectionHeader
        smallText="Let's Work Together"
        title="Advertising & Partnerships"
        breadcrumbsItems={[
          { name: "Homeplate", href: "/" },
          { name: "Advertising & Partnerships" },
        ]}
      />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={7}>
          <Typography component="p" paragraph>
            ShowZone is a leading website for MLB The Show gamers, providing a
            variety of tools and resources to help players improve their
            gameplay and strategy. One way we continue to grow and improve our
            offerings is through partnerships and advertising.
          </Typography>
          <Typography variant="h2" component="h2" paragraph>
            Partnerships
          </Typography>
          <Typography component="p" paragraph>
            At ShowZone, we&apos;re always on the lookout for new partnerships that
            can benefit our community. Whether it&apos;s working with other MLB The
            Show gaming communities or partnering with other companies in the
            gaming industry, we&apos;re open to all opportunities.
          </Typography>
          <ul>
            <li>
              <strong>Partnerships:</strong> partnerships@showzone.io
            </li>
          </ul>
          <Typography variant="h2" component="h2" paragraph>
            Content Creator Partnerships
          </Typography>
          <Typography component="p" paragraph>
            In addition to our traditional partnerships, ShowZone also partners
            with popular content creators in the MLB The Show community. These
            partnerships allow us to work closely with some of the most
            influential and knowledgeable players in the game, and to provide
            our users with expert tips, tricks, and strategies for improving
            their gameplay. We also work with select creators to create
            additional revenue streams through personalized merchandise.
          </Typography>
          <ul>
            <li>
              <strong>Interested in Being a Creator Partner:</strong> partnerships@showzone.io
            </li>
          </ul>
          <Typography variant="h2" component="h2" paragraph>
            Advertising
          </Typography>
          <Typography component="p" paragraph>
            In addition to our partnerships, ShowZone also offers advertising
            opportunities to companies looking to reach the MLB The Show gaming
            community. We have a variety of options available, including banner
            ads, sponsored content, product placement and Social Media
            Advertising. We can help you to advertise on our website, as well as
            on our social media platforms such as Twitter, Facebook, Instagram
            and many more. This way you can reach a larger audience, and ensure
            that your message will be seen by the right people at the right
            time. Advertising with ShowZone is an effective way to reach a
            highly engaged and passionate audience, and to showcase your
            products and services to a community of dedicated gamers.
          </Typography>
          <ul>
            <li>
              <strong>Advertise on ShowZone.io:</strong> sales@playwire.com
            </li>
            <li>
              <strong>Social Media & Other Advertising:</strong> sales@showzone.io
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Paper>
            <iframe
              src="https://tally.so/r/nPRW0e?transparentBackground=1"
              width="100%"
              height="700px"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Start Your Custom IRL Jersey"
            ></iframe>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default AdvertisingPage
