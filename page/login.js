import { styled } from "@mui/system"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Link from "@components/OurLink"
import SignInForm from "../features/auth/components/SignInForm"

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)};
  max-width: 600px;
  margin: 0 auto;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)};
  }
`

function LoginPage() {
  return (
    <Wrapper>
      <Typography component="h1" variant="h3" align="center" gutterBottom>
        Login to <span style={{ fontFamily: 'Road Rage', fontWeight: 400 }}>ShowZone Pro</span>
      </Typography>
      <Typography component="h2" variant="h6" align="center">
        Need to register a free account? <Link href="/register"><span style={{ fontFamily: 'Road Rage', fontWeight: 400 }}>SIGN UP HERE.</span></Link>
      </Typography>
      <SignInForm />
    </Wrapper>
  )
}
export default LoginPage
