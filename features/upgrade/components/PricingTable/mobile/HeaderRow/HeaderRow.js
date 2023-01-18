import {Box} from "@mui/material";
import styles from "./HeaderRow.module.css";
import {FlexBox} from '../../components/styled-components';
import PlanBody from "../../components/PlanBody";

function HeaderRow({activeTab, data, annualPricing}) {

  const planComponents = data.__mobileOrder.map((order, index) => {
    const plan = data.plans[order];

    return (
      <div key={"pt-plan-"+index} hidden={activeTab !== index}>
        <FlexBox className={styles.box}>
          <PlanBody
            annualPricing={annualPricing}
            plan={plan}
            buttonStyle={{marginTop: "15px"}}
          />
        </FlexBox>
      </div>
    )
  });

  return (
    <Box>
      {planComponents}
    </Box>
  );
}

export default HeaderRow;