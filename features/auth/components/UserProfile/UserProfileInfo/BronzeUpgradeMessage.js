import CardContent from "@mui/material/CardContent"

import { Card, Spacer, Typography, Button } from "./AccountDetails"
import Link from "@components/OurLink"
import useAuth from "@useAuth"

const BronzeUpgradeMessage = () => {
  const {
    currentUserIsSilverPlus,
    currentUserIsGoldPlus,
    currentUserIsDiamondPlus,
  } = useAuth()
  if(!currentUserIsSilverPlus) {
    return (
        <Card mb={6}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Upgrade To Unlock More Features
            </Typography>
    
            <Spacer mb={3} />
              <div>
                <Typography component="p" gutterBottom paragraph>
                    Upgrade your plan to access features such as our member-only Discord, 
                    the ability to generate rosters, faster pricing updates and much, much more!
                </Typography>
                <Button component={Link} variant="contained" href="/pro">View Plans</Button>
              </div>
          </CardContent>
        </Card>
      )
  } else {
    return ""
  }
}

export default BronzeUpgradeMessage