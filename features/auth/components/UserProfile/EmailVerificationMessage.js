import { styled, spacing } from "@mui/system"
import Alert from "@mui/material/Alert"
import MuiButton from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
import MuiCard from "@mui/material/Card"
import MuiGrid from "@mui/material/Grid"
import MuiTypography from "@mui/material/Typography"

import useAuth from "@useAuth"
import NavLink from "@components/OurNavLink"

export const Button = styled(MuiButton)(spacing)
export const Card = styled(MuiCard)(spacing)
export const Grid = styled(MuiGrid)(spacing)
export const Spacer = styled("div")(spacing)
export const Typography = styled(MuiTypography)(spacing)

const EmailVerificationMessage = () => {
  const { sendVerificationEmail, emailHasBeenSent } = useAuth()

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h4" mb={6}>
          Please verify your email to finish your ShowZone registration.
        </Typography>
        <NavLink href="/change-email">
          <Button variant="contained" color="primary">
            Change Email Address
          </Button>
        </NavLink>
        <Button
          variant="contained"
          color="secondary"
          onClick={sendVerificationEmail}
        >
          Resend Verification Email
        </Button>
        {emailHasBeenSent ? (
          <Alert severity="success">
            Your verification email has been resent.
          </Alert>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  )
}
export default EmailVerificationMessage
