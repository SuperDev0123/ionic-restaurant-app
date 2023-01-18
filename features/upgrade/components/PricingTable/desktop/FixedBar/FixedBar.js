import {Box, Container} from "@mui/material";
import styles from './FixedBar.module.css';
import {FlexCenterBox, HeadCellTitle} from '../../components/styled-components';
import {styled} from "@mui/system";

const NoMarginTitle = styled(HeadCellTitle)`
  margin: 0;
`;

function FixedBar({show, data}) {

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: `minmax(160px, 1fr) repeat(${data.plans.length}, minmax(160px, 1fr))`
  }

  return (
    <Box className={styles.stickyBox + ' ' + (show ? styles.show : '')}>
      <Container maxWidth="lg" style={containerStyle}>
        <NoMarginTitle style={{padding: "20px"}}></NoMarginTitle>
        {data.plans.map((plan, index) => {
          return (
            <FlexCenterBox key={"st-plan-"+index}>
              <NoMarginTitle className={plan.title}>{plan.title || ''}</NoMarginTitle>
            </FlexCenterBox>);
        })}
      </Container>
    </Box>
  );
}

export default FixedBar;