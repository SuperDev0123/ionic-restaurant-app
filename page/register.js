import Head from "next/head"
import { styled } from "@mui/system"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Link from "@components/OurLink"
import SignUpForm from "../features/auth/components/SignUpForm"

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)};
  max-width: 600px;
  margin: 0 auto;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)};
  }
`

function RegisterPage() {
  return (
    <Wrapper>
      <Typography component="h1" variant="h3" align="center" gutterBottom>
        Register for <span style={{ fontFamily: 'Road Rage', fontWeight: 400 }}>ShowZone</span>
      </Typography>
      <Typography component="h2" variant="h6" align="center">
        Already registered? <Link href="/login"><span style={{ fontFamily: 'Road Rage', fontWeight: 400 }}>LOGIN HERE</span></Link>
      </Typography>
      <SignUpForm />
       <Typography sx={{marginTop: "1rem"}} variant="body2" align="center">
        You can upgrade to a Pro Membership after registering.
      </Typography>
    </Wrapper>
  )
}

export default RegisterPage
