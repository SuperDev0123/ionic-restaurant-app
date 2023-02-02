import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import SidebarGeneric from "@components/SidebarGeneric"
import SectionHeader from "@components/Typography/SectionHeader"

const googlePlayBadge = "/images/google-play-badge.png"

function MobileAppPage() {
  return (
    <>
      <SectionHeader
        smallText="ShowZone on the Go"
        title="Mobile App"
        breadcrumbsItems={[
          { name: "Homeplate", href: "/" },
          { name: "Mobile App" },
        ]}
      />
      <Grid container spacing={6}>
        <Grid item sx={{ maxWidth: "100%", width: "calc(100% - 350px)" }}>
          <Typography variant="h2" component="h2" paragraph>
            Android
          </Typography>
          <Typography component="p" paragraph>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://play.google.com/store/apps/details?id=io.showzone.twa"
            >
              <img src={googlePlayBadge} width="200" alt="Google Play badge" />
            </a>
          </Typography>
          <Typography variant="h2" component="h2" paragraph>
            iPhone and iPad
          </Typography>
          <Typography component="div" paragraph>
            <ol>
              <li>Launch “Safari” app. Note: This ONLY works in Safari. </li>
              <li>Visit the https://showzone.io website.</li>
              <li>
                In the lower menu, press the icon in the center (square box,
                arrow pointing up).
              </li>
              <li>Tap “Add to Home Screen.” </li>
            </ol>
          </Typography>
        </Grid>
        <SidebarGeneric />
      </Grid>
    </>
  )
}

export default MobileAppPage
