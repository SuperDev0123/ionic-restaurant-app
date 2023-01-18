import {useState} from "react";
import {
  Box,
  Container,
  Fade
} from '@mui/material';
import HeaderRow from "./HeaderRow";
import TableBody from "./TableBody";
import HeadTabs from './HeadTabs';
import {styled} from "@mui/system";
import {getMobileOrderArray} from "./tools";
import {StyledDivider} from "../components/styled-components";

const StyledContainer = styled(Container)`
  @media (min-width: 900px) {
    display: none;
  }
`;

function MobilePricingTable({data, annualPricing}) {

  if(!Array.isArray(data.__mobileOrder)){
    data.__mobileOrder = getMobileOrderArray(data);
  }

  const [activeTab, setActiveTab] = useState(0);
  const [fade, setFade] = useState(true);

  const handleTabChange = (event, newValue) => {
    setFade(false);
    setActiveTab(newValue);
    setTimeout(()=>{
      setFade(true);
    }, 10);
  };

  return (
    <StyledContainer maxWidth="lg">
      <HeadTabs handleChange={handleTabChange} data={data} activeTab={activeTab}/>
      <Fade in={fade} timeout={{enter: 225, exit: 0}}>
        <Box>
          <HeaderRow data={data} activeTab={activeTab} annualPricing={annualPricing} />
          <TableBody data={data} activeTab={activeTab}/>
          <StyledDivider />
        </Box>
      </Fade>
    </StyledContainer>
  );
}

export default MobilePricingTable;