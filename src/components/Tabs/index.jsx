import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { StyledTabPanel, StyledTabsWrapper } from './index.style';

/**
 *
 * @param {*} tabs: [ {id: id of tab label: `title of tab`, panel: component of tab } ]
 * @param {*} actionComponents: React Component
 * @param {*} onChangeTab: Callback function triggers the active tab change (optional)
 */
const SuperTabs = ({ tabs = [], actionComponents, onChangeTab }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
    onChangeTab(tabs[newValue].id);
  };

  return (
    <StyledTabsWrapper>
      <Box sx={{ borderBottom: 1 }} className="tabs">
        <Tabs
          value={tabValue}
          onChange={handleChangeTabValue}
          aria-label="super tabs"
        >
          {tabs &&
            tabs.map((tab) => (
              <Tab id={tab.id} key={tab.id} label={tab.label} />
            ))}
        </Tabs>

        {actionComponents}
      </Box>
      {tabs &&
        tabs.map(
          (tab, index) =>
            tab.panel && (
              <StyledTabPanel
                key={`super-tabpanel-${tab.label}`}
                hidden={tabValue !== index}
                value={tabValue}
                index={index}
              >
                {tab.panel}
              </StyledTabPanel>
            ),
        )}
    </StyledTabsWrapper>
  );
};

export default SuperTabs;
