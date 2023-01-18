import CardContent from "@mui/material/CardContent"

import { Card, Spacer, Typography } from "./AccountDetails"
import Link from "@components/OurLink"

import useAuth from "@useAuth"

const DiscordAccess = () => {
  const {
    currentUserIsSilverPlus,
    currentUserIsGoldPlus,
    currentUserIsDiamondPlus,
  } = useAuth()
  if(currentUserIsSilverPlus) {
    return (
        <Card mb={6}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Discord Access
            </Typography>
    
            <Spacer mb={3} />
              <div>
                <Typography component="p" gutterBottom paragraph>
                  <Link href="https://discord.gg/CqPYSW6pVn" target="_blank">
                    ShowZone Pro Discord Server
                  </Link>{" "}
                  - this is the official ShowZone Discord for ShowZone Pro members
                  only. When you enter the server, you will need to verify your account using your
                  ShowZone ID to get full access.
                </Typography>
              </div>
          </CardContent>
        </Card>
      )
  } else {
    return ""
  }
}

export default DiscordAccess
