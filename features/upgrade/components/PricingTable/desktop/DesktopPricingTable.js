import {useEffect, useRef, useState} from "react";
import {
  Box,
  Container
} from '@mui/material';
import FixedBar from "./FixedBar";
import HeaderRow from "./HeaderRow";
import TableBody from "./TableBody";
import { StyledDivider } from "../components/styled-components";
import {styled} from "@mui/system";

const StyledContainer = styled(Container)`
  display: none;
  @media (min-width: 900px) {
    display: block;
  }
`;

function DesktopPricingTable({data, annualPricing}) {
  const headRef = useRef();
  const footRef = useRef();
  const [inView, setInView] = useState({head: true, foot: true});

  useEffect(() => {
    const getPosition = () => {
      const boundingHead = headRef.current?.getBoundingClientRect();
      const boundingFoot = footRef.current?.getBoundingClientRect();

      if(boundingHead !== undefined && boundingFoot !== undefined){
        setInView({
          head: boundingHead.top > 0,
          foot: boundingFoot.top > 128
        });
      }
    }

    window.addEventListener("scroll", getPosition);

    return () => {
      window.removeEventListener("scroll", getPosition);
    }
  }, []);

  return (
    <StyledContainer maxWidth="xl">
      <Box ref={headRef}>
        <FixedBar data={data} show={!inView.head && inView.foot}/>
        <HeaderRow data={data} annualPricing={annualPricing} />
        <TableBody data={data} />
        <StyledDivider ref={footRef}/>
      </Box>
    </StyledContainer>
  )
}

export default DesktopPricingTable;