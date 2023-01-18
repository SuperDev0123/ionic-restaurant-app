import { styled, spacing } from "@mui/system"
import {
  Button,
  CardActions,
  CardContent,
  Grid,
  Link,
  // Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardHeader as MuiCardHeader,
  // Divider as MuiDivider,
  Typography,
} from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

import NavLink from "@components/OurNavLink"
import useAuth from "@useAuth"

const Card = styled(MuiCard)(spacing)

const CardHeader = styled(MuiCardHeader)`
  .MuiCardHeader-title {
    font-family: "Road Rage", sans-serif;
    text-transform: uppercase;
  }
`

const AlreadySubscribed = props => {
  const { manageAccount } = useAuth()
  return (
    <div>
      <Button variant="contained" onClick={manageAccount}>
        Manage Your Subscription
      </Button>
      <Typography mt={2} component="p" variant="body2">
        You are already subscribed. Manage your subscription using the button
        above.
      </Typography>
    </div>
  )
}

const GetStarted = () => (
  <NavLink href="/register">
    <Button fullWidth variant="contained">
      Get Started
    </Button>
  </NavLink>
)

const VerifyEmail = () => (
  <Button variant="contained" disabled>
    Verify Email Before Upgrading
  </Button>
)

const NewPricingCatalog = () => {
  const { currentUser, currentUserIsSilverPlus, startCheckoutSession } =
    useAuth()

  return (
    <>
      <Grid container mb={10} spacing={3} className="features">
        <Grid item xs={12} md={4} lg={4} order={{ xs: 3, md: 1, lg: 1 }}>
          <Card p={5} style={{ marginTop: 20 }}>
            <CardHeader
              title="Silver"
              subheader="$2/mo or $10/yr"
              titleTypographyProps={{
                align: "center",
                color: "#ccc",
                fontSize: "32px",
              }}
              subheaderTypographyProps={{
                align: "center",
              }}
              pb={0}
              pt={2}
            />
            <CardContent>
              <Typography variant="subtitle1" align="center">
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Support ShowZone
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Discord Access
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Ad Free Experience
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Hide Sidebars on Important Pages
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Only .83 cents a month
                for the yearly subscription
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }} 
            >
              {currentUserIsSilverPlus ? (
                <AlreadySubscribed />
              ) : currentUser?.emailVerified ? (
                <div>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() =>
                      startCheckoutSession("price_1JKtFWJ9DqRcRXvvcWnSlH2p")
                    }
                  >
                    Go Silver for $10/yr
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "10px" }}
                    onClick={() =>
                      startCheckoutSession("price_1L7BljJ9DqRcRXvvEHeU02Y9")
                    }
                  >
                    Go Silver for $2/mo
                  </Button>
                </div>
              ) : currentUser ? (
                <VerifyEmail />
              ) : (
                <GetStarted />
              )}
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={4} order={{ xs: 1, md: 2, lg: 2 }}>
          <Card p={5}>
            <CardHeader
              title="Diamond"
              subheader="$10/mo or $60/yr"
              titleTypographyProps={{
                align: "center",
                fontSize: "32px",
                color: "#61E2FF",
              }}
              subheaderTypographyProps={{
                align: "center",
              }}
              pb={0}
              pt={2}
            />
            <CardContent>
              <Typography variant="subtitle1" align="center">
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Support ShowZone
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Discord Access
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Discord Diamond Role
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Ad Free Experience
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> 1-Minute Price Updates
                for Flipping
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> 1-Minute Price Updates
                for Exchanges
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Team Builder - Roster
                Generator
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Downloadable Data
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> White Label Card
                Builder
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Help Guide Our Roadmap
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Select any{" "}
                <Link target="_blank" href="https://merch.showzone.io">
                  ShowZone
                </Link>{" "}
                Shirt for FREE! - Annual Only
              </Typography>
              <br />
              <Typography
                sx={{ textTransform: "uppercase" }}
                variant="h6"
                align="center"
              >
                6 Months Free With an Annual Plan!
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {currentUserIsSilverPlus ? (
                <AlreadySubscribed />
              ) : currentUser?.emailVerified ? (
                <div>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() =>
                      startCheckoutSession("price_1JjbdgJ9DqRcRXvvDFUJaNkq")
                    }
                  >
                    Go Diamond for $60/yr
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      startCheckoutSession("price_1JKtJlJ9DqRcRXvvhbuo1d7q")
                    }
                    sx={{ marginTop: "10px" }}
                  >
                    Go Diamond for $10/mo
                  </Button>
                </div>
              ) : currentUser ? (
                <VerifyEmail />
              ) : (
                <GetStarted />
              )}
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={4} order={{ xs: 2, md: 3, lg: 3 }}>
          <Card p={5} style={{ marginTop: 20 }}>
            <CardHeader
              title="Gold"
              subheader="$5/mo or $45/yr"
              titleTypographyProps={{
                align: "center",
                fontSize: "32px",
                color: "#FFD700",
              }}
              subheaderTypographyProps={{
                align: "center",
              }}
              pb={0}
              pt={2}
            />
            <CardContent>
              <Typography variant="subtitle1" align="center">
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Support ShowZone
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Discord Access
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Ad Free Experience
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> 1-Minute Price Updates
                for Flipping
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> 1-Minute Price Updates
                for Exchanges
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Team Builder - Roster
                Generator
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> Downloadable Data
                <br />
                <CheckCircleIcon sx={{ fontSize: 12 }} /> 3 Months Free With an
                Annual Plan
              </Typography>
              <br />
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {currentUserIsSilverPlus ? (
                <AlreadySubscribed />
              ) : currentUser?.emailVerified ? (
                <div>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() =>
                      startCheckoutSession("price_1L4CfcJ9DqRcRXvvpHtVgI92")
                    }
                  >
                    Go Gold for $45/yr
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: "10px" }}
                    onClick={() =>
                      startCheckoutSession("price_1JKtHHJ9DqRcRXvvwE3s1wow")
                    }
                  >
                    Go Gold for $5/mo
                  </Button>
                </div>
              ) : currentUser ? (
                <VerifyEmail />
              ) : (
                <GetStarted />
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={12}>
          <Grid container spacing={6} alignItems="flex-start">
            <Grid item xs={12} lg={4} md={4} order={{ xs: 3, md: 1, lg: 1 }}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary">Silver and Up</Typography>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Ad Free Experience
                  </Typography>
                  <Typography variant="body2" component="p">
                    Sick and tired of ads? Pro subscribers aren't. Enjoy an
                    ad-free experience on the website and mobile app.
                  </Typography>
                </CardContent>
              </Card>
              <br />
              <Card>
                <CardContent>
                  <Typography color="textSecondary">Silver and Up</Typography>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Discord Access
                  </Typography>
                  <Typography variant="body2" component="p" gutterBottom>
                    What happens in Discord, stays in the Discord!
                  </Typography>
                  <Typography variant="body2" component="p" gutterBottom>
                    <ul>
                      <li>Learn the latest tricks from the community</li>
                      <li>Channels for investing, flipping and more</li>
                    </ul>
                  </Typography>
                  <Typography variant="body2" component="p">
                    Go{" "}
                    <span
                      style={{
                        fontFamily: "Road Rage",
                        color: "#61E2FF",
                        textTransform: "uppercase",
                      }}
                    >
                      Diamond
                    </span>{" "}
                    and get the coveted "Diamond" role tag!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={4} md={4} order={{ xs: 1, md: 2, lg: 2 }}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary">Diamond</Typography>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Free{" "}
                    <span
                      style={{ fontFamily: "Boss", textTransform: "uppercase" }}
                    >
                      Show<span style={{ color: "red" }}>Zone</span>
                    </span>{" "}
                    Shirt
                  </Typography>
                  <Typography variant="body2" component="p" gutterBottom>
                    Select ANY{" "}
                    <Link href="https://merch.showzone.io" target="_blank">
                      ShowZone
                    </Link>{" "}
                    shirt - for free!.
                  </Typography>
                  <Typography variant="body2" component="p">
                    Free shirt offer for annual subscriptions only.
                  </Typography>
                </CardContent>
              </Card>
              <br />
              <Card>
                <CardContent>
                  <Typography color="textSecondary">Diamond</Typography>
                  <Typography variant="h5" component="h2" gutterBottom>
                    White Label Tools
                  </Typography>
                  <Typography variant="body2" component="p">
                    Are you a content creator looking for a quick way to push
                    out new card art, but don't want the ShowZone logo showing
                    that you saved yourself hours of time?
                    <br />
                    <br />
                    Subscribe to the{" "}
                    <span
                      style={{
                        fontFamily: "Road Rage",
                        color: "#61E2FF",
                        textTransform: "uppercase",
                      }}
                    >
                      Diamond
                    </span>{" "}
                    plan for builders with ShowZone branding removed.
                  </Typography>
                </CardContent>
              </Card>
              <br />
              <Card>
                <CardContent>
                  <Typography color="textSecondary">Diamond</Typography>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Help Guide Our Roadmap
                  </Typography>
                  <Typography variant="body2" component="p">
                    Every ship needs a captain (that's us) - but we're always
                    open to new feature ideas and requests from our{" "}
                    <span
                      style={{
                        fontFamily: "Road Rage",
                        color: "#61E2FF",
                        textTransform: "uppercase",
                      }}
                    >
                      Diamond
                    </span>{" "}
                    members. Become a crew mate and help us steer our ship in
                    the right direction! Arr-matey!
                  </Typography>
                </CardContent>
              </Card>
              <br />
              <Card>
                <CardContent>
                  <Typography color="textSecondary">Diamond</Typography>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Everything in the other two tiers!
                  </Typography>
                  <Typography variant="body2" component="p">
                    As a{" "}
                    <span
                      style={{
                        fontFamily: "Road Rage",
                        color: "#61E2FF",
                        textTransform: "uppercase",
                      }}
                    >
                      Diamond
                    </span>{" "}
                    member - you're basically family to us. Get everything in
                    the other two tiers PLUS early access to anything new and
                    shiny we have in the works!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} order={{ xs: 2, md: 3, lg: 3 }}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary">Gold and Up</Typography>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Team Builder - Roster Generator
                  </Typography>
                  <Typography variant="body2" component="p">
                    Autmatically generate the best team(s) possible using
                    filters and constraints of your choice!
                  </Typography>
                  <Typography variant="body2" component="p" gutterBottom>
                    <ul>
                      <li>Generate Theme Teams</li>
                      <li>Generate Teams With a Max Stub Cost</li>
                      <li>Generate Event Squads</li>
                    </ul>
                  </Typography>
                </CardContent>
              </Card>
              <br />
              <Card>
                <CardContent>
                  <Typography color="textSecondary">Gold and Up</Typography>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Up-to-the-Minute Pricing
                  </Typography>
                  <Typography variant="body2" component="p">
                    Gain the extra edge and become a true market hustler. Prices
                    on the flipping and exchange pages will update every minute
                    - 5x faster than non-Pro members!
                  </Typography>
                  <Typography variant="body2" component="p" gutterBottom>
                    <ul>
                      <li>
                        1-Minute Pricing Updates on Flipping & Exchange Pages
                      </li>
                    </ul>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default NewPricingCatalog
