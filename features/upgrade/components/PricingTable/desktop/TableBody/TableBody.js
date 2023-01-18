import styles from './TableBody.module.css';
import {FlexCenterBox,} from '../../components/styled-components';
import BodyRow from "../../components/BodyRow";

function TableBody({data}) {

  const gridTemplateColumns = `minmax(160px, 1fr) repeat(${data.plans.length}, minmax(160px, 1fr))`;

  return (
    <>
      {data.features.map((feature, index) => {
        return (
          <BodyRow
            key={'pt-row-'+index}
            feature={feature}
            gridTemplateColumns={gridTemplateColumns}
          >
            {getStates(feature.states, data)}
          </BodyRow>
        )
      })}
    </>
  );
}

function getStates(states, data) {
  return states.map((state, index) => {

    const plan = data.plans[index];
    if(plan === undefined) return;
    const isRecommended = plan.recommended;

    return (
      <FlexCenterBox key={"pt-state-" + index} className={isRecommended ? styles.recommended : ''}>
        {state || ''}
      </FlexCenterBox>
    )
  });
}

export default TableBody;