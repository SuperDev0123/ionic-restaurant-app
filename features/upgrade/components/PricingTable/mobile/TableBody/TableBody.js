import {Box} from "@mui/material";
import {FlexCenterBox} from '../../components/styled-components';
import BodyRow from "../../components/BodyRow";

function TableBody({data, activeTab}) {

  const gridTemplateColumns = `minmax(160px, 2fr) minmax(100px, 1fr)`;

  return (
    <Box style={{paddingTop: "20px"}}>
      {data.features.map((feature, index) => {
        return (
          <BodyRow
            key={'pt-row-'+index}
            feature={feature}
            gridTemplateColumns={gridTemplateColumns}
          >
            {getStates(feature.states, data, activeTab)}
          </BodyRow>
        )
      })}
    </Box>
  );
}

function getStates(states, data, activeTab) {
  return data.__mobileOrder.map((order, index) => {
    let state = states[order];

    return (
      <div key={"pt-state-" + index} hidden={activeTab !== index}>
        <FlexCenterBox>
          {state || ''}
        </FlexCenterBox>
      </div>
    )
  });
}

export default TableBody;