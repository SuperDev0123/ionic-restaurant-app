import { styled, spacing } from "@mui/system"
import MuiButton from "@mui/material/Button"
import CardContent from "@mui/material/CardContent"
import MuiCard from "@mui/material/Card"
import MuiGrid from "@mui/material/Grid"
import MuiTypography from "@mui/material/Typography"

import NavLink from "@components/OurNavLink"
import Link from "@components/OurLink"
import useAuth from "@useAuth"

export const Button = styled(MuiButton)(spacing)
export const Card = styled(MuiCard)(spacing)
export const Grid = styled(MuiGrid)(spacing)
export const Spacer = styled("div")(spacing)
export const Typography = styled(MuiTypography)(spacing)

const AccountDetails = () => {
  const {
    currentUser,
    currentUserRole,
    currentUserIsSilverPlus,
    manageAccount,
  } = useAuth()
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Account Details
        </Typography>

        <Spacer mb={4} />
        <Typography>
          <strong>Email</strong>
        </Typography>
        <Typography paragraph>
          {currentUser["email"]} <NavLink href="/change-email">(Edit)</NavLink>
        </Typography>
        <Typography>
          <strong>Membership ID</strong>
        </Typography>
        <Typography paragraph>
          {currentUser["uid"]}<br/>
          {currentUser["displayName"]}
        </Typography>
        <Typography> 
          <strong>Membership Level</strong>
        </Typography>
        <Typography paragraph>
          {currentUserRole}
          {currentUserIsSilverPlus ? (
            <Link sx={{ marginLeft: ".5rem" }} href="#" onClick={manageAccount}>
              (Manage)
            </Link>
          ) : (
            <NavLink href="/pro">(Upgrade)</NavLink>
          )}
        </Typography>

        <Button component={NavLink} href="/reset-password" variant="contained">
          Reset Password
        </Button>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
