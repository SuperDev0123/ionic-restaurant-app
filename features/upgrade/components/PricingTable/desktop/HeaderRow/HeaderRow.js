import {Box} from "@mui/material";
import styles from "./HeaderRow.module.css";
import {FlexBox, HeadCellTitle} from '../../components/styled-components';
import PlanBody from "../../components/PlanBody";

function HeaderRow({data, annualPricing}) {

  const gridTemplateColumns = `minmax(160px, 1fr) repeat(${data.plans.length}, minmax(160px, 1fr))`;

  const planComponents = data.plans.map((plan, index) => {
    return (
      <FlexBox key={"pt-plan-"+index} className={plan.recommended ? styles.recommended : ''}>
        {plan.recommended ? <Box className={styles.textRecommended}>Most Popular</Box> : ''}
        <PlanBody
          plan={plan}
          captionAfterPriceStyle={{marginBottom: "30px"}}
          buttonStyle={{margin: "auto 0 0"}}
          annualPricing={annualPricing}
        />
      </FlexBox>
    );
  });

  return (
    <Box display="grid" gridTemplateColumns={gridTemplateColumns}>
      <HeadCellTitle style={{padding: "20px"}}></HeadCellTitle>
      {planComponents}
    </Box>
  );
}

export default HeaderRow;