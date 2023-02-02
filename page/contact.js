import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import SectionHeader from "@components/Typography/SectionHeader"
import Link from "@components/OurLink"
import MuiPaper from "@mui/material/Paper"
import { styled } from "@mui/system"

const Paper = styled(MuiPaper)`
  padding: 2rem;
`

function ContactPage() {
  return (
    <>
      <SectionHeader
        smallText="Get In Touch"
        title="Contact ShowZone"
        breadcrumbsItems={[
          { name: "Homeplate", href: "/" },
          { name: "Contact" },
        ]}
      />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={7}>
          <Typography component="p" paragraph>
            Thank you for visiting ShowZone! We value your feedback and are
            always happy to hear from our community. If you have any questions
            or comments about our products or services, please don&apos;t
            hesitate to contact us.
          </Typography>
          <Typography component="p" paragraph>
            If you&apos;re interested in partnering or advertising with
            ShowZone, please visit our Advertising & Partnership page.{" "}
          </Typography>

          <Typography variant="h2" component="h2" paragraph>
            Contact Information
          </Typography>
          <ul>
            <li>
              <strong>General Contact & Support:</strong> team@showzone.io
            </li>
            <li>
              <strong>Partnerships</strong> partnerships@showzone.io
            </li>
            <li>
              <strong>Jobs / Write for Us</strong> jobs@showzone.io
            </li>
            <li>
              <strong>Advertising:</strong> sales@playwire.com
            </li>
          </ul>
          <Typography component="p" paragraph>
            Alternatively, you can also fill out the contact form on this page
            and we will get back to you as soon as possible.
          </Typography>
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

export default ContactPage
