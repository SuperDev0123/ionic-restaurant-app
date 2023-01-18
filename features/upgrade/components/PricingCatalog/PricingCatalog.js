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

const CardHeader = styled(MuiCardHeader)(spacing)

const AlreadySubscribed = props => {
  const {manageAccount} = useAuth()
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

const PricingCatalog = () => {
  const { currentUser, currentUserIsSilverPlus, startCheckoutSession } =
    useAuth()

  return (
    <>
      <Grid container mb={10} spacing={3} className="features">
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Diamond</Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                Free ShowZone Shirt
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
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Diamond</Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                White Label Tools
              </Typography>
              <Typography variant="body2" component="p">
                Are you a content creator looking for a quick way to push out
                new card art, but don't want the ShowZone logo showing that you
                saved yourself hours of time? Subscribe to the Diamond plan for
                builders with ShowZone branding removed.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Gold and Up</Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                Up-to-the-Minute Pricing
              </Typography>
              <Typography variant="body2" component="p">
                Gain the extra edge and become a true market hustler. Prices on
                the flipping and exchange pages will update every minute - 5x
                faster than non-Pro members!
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                <ul>
                  <li>1-Minute Pricing Updates on Flipping Page</li>
                  <li>1-Minute Pricing Updates on Exchange Page</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Gold and Up</Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                Team Builder - Roster Generator
              </Typography>
              <Typography variant="body2" component="p">
                Autmatically generate the best team(s) possible using filters
                and constraints of your choice!
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
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
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
                  <li>Latest Tips and Tricks</li>
                  <li>Weekly Investment Channels</li>
                  <li>Tips and Advice on Flipping</li>
                </ul>
              </Typography>
              <Typography variant="body2" component="p">
                Go Diamond and get the covetted "Diamond" role tag!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Silver and Up</Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                Ad Free Experience
              </Typography>
              <Typography variant="body2" component="p">
                Sick and tired of ads? Pro subscribers aren't. Enjoy an ad-free
                experience on the website and mobile app.
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                <ul>
                  <li>Ad-Free Experience on Website</li>
                  <li>Ad-Free Experience on Mobile Apps</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Gold and Up</Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                Inventory Management Tools
              </Typography>
              <Typography variant="body2" component="p">
                Coming Soon!
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
      <Typography sx={{ margin: "3rem 0 1.5rem" }} variant="h2" align="center">
        Save Up to 50% with an Annual Plan
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={12}>
          <Grid container spacing={6} alignItems="flex-start">
            <Grid item xs={12} md={12}>
              <Card p={5}>
                <CardHeader
                  title="Diamond"
                  subheader="$10/mo or $60/yr"
                  titleTypographyProps={{
                    align: "center",
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
                    <CheckCircleIcon sx={{ fontSize: 12 }} /> Discord Diamond
                    Role
                    <br />
                    <CheckCircleIcon sx={{ fontSize: 12 }} /> Ad Free Experience
                    <br />
                    <CheckCircleIcon sx={{ fontSize: 12 }} /> 1-Minute Price
                    Updates for Flipping
                    <br />
                    <CheckCircleIcon sx={{ fontSize: 12 }} /> 1-Minute Price
                    Updates for Exchanges
                    <br />
                    <CheckCircleIcon sx={{ fontSize: 12 }} /> Team Builder -
                    Roster Generator
                    <br />
                    <CheckCircleIcon sx={{ fontSize: 12 }} /> Downloadable Data
                    <br />
                    <CheckCircleIcon sx={{ fontSize: 12 }} /> White Label Card
                    Builder
                    <br />
                    <CheckCircleIcon sx={{ fontSize: 12 }} /> Select any{" "}
                    <Link target="_blank" href="https://merch.showzone.io">
                      ShowZone
                    </Link>{" "}
                    Shirt for FREE! - Annual Only
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
            <Grid item xs={12} md={6}>
              <Card p={5}>
                <CardHeader
                  title="Gold"
                  subheader="$5/mo or $30/yr"
                  titleTypographyProps={{
                    align: "center",
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
                    <CheckCircleIcon sx={{ fontSize: 12 }} /> 1-Minute Price
                    Updates for Flipping
                    <br />
                    <CheckCircleIcon sx={{ fontSize: 12 }} /> 1-Minute Price
                    Updates for Exchanges
                    <br />
                    <CheckCircleIcon sx={{ fontSize: 12 }} /> Team Builder -
                    Roster Generator
                    <br />
                    <CheckCircleIcon sx={{ fontSize: 12 }} /> Downloadable Data
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
                          startCheckoutSession("price_1JKyzDJ9DqRcRXvvGREHTYP4")
                        }
                      >
                        Go Gold for $30/yr
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
            <Grid item xs={12} md={6}>
              <Card p={5}>
                <CardHeader
                  title="Silver"
                  subheader="$1/mo or $10/yr"
                  titleTypographyProps={{
                    align: "center",
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
                          startCheckoutSession("price_1JKtEZJ9DqRcRXvvPlE4K8Nh")
                        }
                      >
                        Go Silver for $1/mo
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
        </Grid>
      </Grid>
    </>
  )
}

export default PricingCatalog
