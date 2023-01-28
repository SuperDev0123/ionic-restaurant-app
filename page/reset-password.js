import Head from "next/head"
import { styled } from "@mui/system"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import ResetPasswordForm from "../features/auth/components/ResetPasswordForm"

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)};
  max-width: 600px;
  margin: 0 auto;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)};
  }
`

function resetPasswordPage() {
  return (
    <Wrapper>
      <Typography component="h1" variant="h3" align="center" gutterBottom>
        Reset Password
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        You will be sent an email to reset your password.
      </Typography>
      <ResetPasswordForm />
    </Wrapper>
  )
}

export default resetPasswordPage
