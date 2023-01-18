import styles from './HeadTabs.module.css';
import {Tab, Tabs} from "@mui/material";

function a11yProps(index) {
  return {
    id: `pt-tab-${index}`,
    'aria-controls': `pt-tabpanel-${index}`,
  };
}

function HeadTabs({activeTab, handleChange, data}) {
  let components = data.__mobileOrder.map((order, index) => {
    const plan = data.plans[order];

    return (
      <Tab
        key={"tab-"+index}
        label={plan.title || ''}
        classes={{
          root: styles.tab,
          selected: styles.selected
        }}
        {...a11yProps(index)}
      />
    )
  });

  return (
    <Tabs
      value={activeTab}
      onChange={handleChange}
      variant="scrollable"
      allowScrollButtonsMobile={true}
      TabIndicatorProps={{style: {background:'rgb(236,32,36)'}}}
      className={styles.tabs}
    >
      {components}
    </Tabs>
  );
}

export default HeadTabs;