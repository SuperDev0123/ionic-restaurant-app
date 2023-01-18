import React, { useEffect, useState } from "react"
import useAuth from "@useAuth"
import UserProfileInfo from "./UserProfileInfo"
import EmailVerificationMessage from "./EmailVerificationMessage"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled, spacing } from "@mui/system"
import PlayersFollowed from "./UserProfileInfo/PlayersFollowed";
import RostersGenerated from "./UserProfileInfo/RostersGenerated";
import { TextField, FormControl } from '@mui/material'
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Styles = styled("div")`
  tr {
    white-space: nowrap;
  }
`


const UserProfile = () => {
  const { currentUser } = useAuth()
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  if (!currentUser) return null

  return currentUser && currentUser["emailVerified"] ? (
    <>
    <Styles>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Favorited Players" {...a11yProps(1)} />
          <Tab label="Saved Rosters" {...a11yProps(2)} />
          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserProfileInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PlayersFollowed />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RostersGenerated />
      </TabPanel>
      </Styles>
      
    </>

  ) : (
    <EmailVerificationMessage />
  )
}
export default UserProfile
