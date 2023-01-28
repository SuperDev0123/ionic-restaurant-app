import Head from "next/head"
import { styled, spacing } from "@mui/system"
import Typography from "@mui/material/Typography"
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import MuiDivider from "@mui/material/Divider"
import MuiPaper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import Image from "next/image";
// import NavLink from "../components/OurNavLink"
// import PricingCatalog from "../features/upgrade/components/PricingCatalog/PricingCatalog"
// import NewPricingCatalog from "../features/upgrade/components/PricingCatalog/NewPricingCatalog"
import PricingTable from "../features/upgrade/components/PricingTable"
import tableData from "../features/upgrade/components/PricingTable/tableData"

const Header = styled("div")`
  padding: ${props => props.theme.spacing(6)} 0;
`
const Centered = styled("div")`
  text-align: center;
`

const FeatureBox = styled(MuiPaper)`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 2rem;
  ${props => props.theme.breakpoints.up("md")} {
    flex-direction: row;
  }
  .featureBoxImage {
    min-width: 400px;
    height: 300px;
    ${props => props.theme.breakpoints.up("md")} {
        height: auto;
    }
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
  .featureBoxContent {
    padding: 2rem;
  }
  &.reverse {
    .featureBoxImage {
      order: 1;
      ${props => props.theme.breakpoints.up("md")} {
        order: 2;
      }
    }
    .featureBoxContent {
      order: 2;
      ${props => props.theme.breakpoints.up("md")} {
        order: 1;
      }
    }
  }
`

const ProText = styled("div")`
  text-align: center;
  font-family: "Road Rage", sans-serif;
  font-size: 40px;
  margin-top: -20px;
  padding-bottom: 20px;
`

function ProPage() {
  return (
    <>
      <Head>
        <title>ShowZone Pro Membership - MLB The Show</title>
      </Head>
      <Header>
        <Typography variant="h1" gutterBottom align="center">
          <Image
            src="/images/logo.svg"
            width={420}
            height={48}
            alt="showzone logo"
          />
        </Typography>
        <ProText>Pro</ProText>

        <Typography
          sx={{ maxWidth: "750px", margin: "0 auto", fontSize: "20px" }}
          gutterBottom
          align="center"
        >
          Give yourself the insiders edge with a ShowZone Pro Membership.
          Instantly unlock additional features, access to our Discord server and
          an ad-free experience across the website and mobile app.
        </Typography>
        {/* <div style={{ maxWidth: 600, margin: "20px auto" }}>
          <Image src="/images/quote.png" width={1006} height={126} alt="" />
        </div> */}
      </Header>
      <PricingTable
        tableData={tableData}
        style={{ marginTop: "10px", marginBottom: "40px" }}
      />
      <Container maxWidth="md">
        <Centered>
          <Typography variant="h1" component="h2" gutterBottom>
            Still Not Convinced?
          </Typography>
          <Typography variant="h5" component="h3">
            Let&apos;s Take a Deeper Look at Some of The Features You Get with
            ShowZone Pro
          </Typography>
        </Centered>
        <FeatureBox>
          <div className="featureBoxImage">
            <img src="/images/pro-inventory.jpg" />
          </div>
          <div className="featureBoxContent">
            <Typography variant="h3" component="h2" gutterBottom>
              Use Your Inventory
            </Typography>
            <Typography paragraph>
              Want to generate the best possible roster using players you
              actually have? That is now completely possible using our Inventory
              tool.
            </Typography>
            <Typography paragraph>
              Using the ShowZone Chrome extension, you are able to download your
              card inventory from TheShow.com and then use your inventory on
              different parts of the ShowZone website.
            </Typography>
          </div>
        </FeatureBox>
        <FeatureBox className="reverse">
          <div className="featureBoxImage">
            <img src="/images/pro-collections.jpg" />
          </div>
          <div className="featureBoxContent">
            <Typography variant="h3" component="h2" gutterBottom>
              Collection Progress Tracking
            </Typography>
            <Typography paragraph>
             Trying to add Randy Johnson and George Brett to your squad?
            </Typography>
            <Typography paragraph>
             Let our Collection Progress Tracking tool tell you
             exactly how many cards and stubs you need to complete collections.
            </Typography>
            <Typography paragraph>
             Just use the ShowZone Chrome extension to download your card inventory form
             TheShow.com and we&apos;ll handle the rest.
            </Typography>
          </div>
        </FeatureBox>
        <FeatureBox>
          <div className="featureBoxImage">
            <img src="/images/pro-generator.jpg" />
          </div>
          <div className="featureBoxContent">
            <Typography variant="h3" component="h2" gutterBottom>
              Roster Generator
            </Typography>
            <Typography paragraph>
              Want to know the best possible team you can build with 25,000 stubs? 
              Want the best team possible from your home state? 
            </Typography>
            <Typography paragraph>
              Using the Roster Generator feature of the Team Builder, you can now easily generate
              the best teams that meant constraints you set.
            </Typography>
          </div>
        </FeatureBox>
        <FeatureBox className="reverse">
          <div className="featureBoxImage">
            <img src="/images/pro-discord.jpg" />
          </div>
          <div className="featureBoxContent">
            <Typography variant="h3" component="h2" gutterBottom>
              ShowZone Pro Discord
            </Typography>
            <Typography paragraph>
              What happens in the ShowZone Discord, stays in the ShowZone Discord.
            </Typography>
            <Typography paragraph>
              Get the latest investment advice, flipping tips and so much more in the
              Discord server exclusively for ShowZone Pro members.
            </Typography>
          </div>
        </FeatureBox>
      </Container>
    </>
  )
}

export default ProPage
