import Head from "next/head"
import { styled, spacing } from "@mui/system"
import { Button as MuiButton, Typography } from "@mui/material"

import Link from "@components/OurLink"

const Button = styled(MuiButton)(spacing)

const Wrapper = styled("div")`
  padding: ${props => props.theme.spacing(6)};
  text-align: center;
  background: transparent;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)};
  }
`

function Page404() {
  return (
    <Wrapper>
      <Head>
        <title>404 Error</title>
      </Head>
      <Typography component="h1" variant="h1" align="center" gutterBottom>
        404
      </Typography>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        Page not found.
      </Typography>
      <Typography component="h2" variant="body1" align="center" gutterBottom>
        The page you are looking for might have been removed.
      </Typography>

      <Button
        component={Link}
        href="/"
        variant="contained"
        color="secondary"
        mt={2}
      >
        Return to website
      </Button>
    </Wrapper>
  )
}

Page404.hideDashboardLayout = true

export default Page404
