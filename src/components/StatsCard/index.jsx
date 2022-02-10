import React from 'react';
import { Typography } from '@mui/material';
import { delimitNumber } from '@src/utils/number';
import { StyledStatsCard } from './index.style';

const StatsCard = ({ title, number, icon, ...rest }) => (
  <StyledStatsCard {...rest}>
    <div className="main-stats">
      <div className="stats-text">
        <Typography className="stats-title">{title}</Typography>
        <Typography className="stats-number">
          {delimitNumber(number)}
        </Typography>
      </div>
      <div className="stats-icon">
        <img src={icon} alt="stats-icon" />
      </div>
    </div>
  </StyledStatsCard>
);

export default StatsCard;
