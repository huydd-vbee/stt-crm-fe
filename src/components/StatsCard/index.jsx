import React from 'react';
import { Typography } from '@mui/material';
import { delimitNumber } from '@src/utils/number';
import ChartIcon from '@src/assets/icons/chart.png';
import { StyledStatsCard } from './index.style';

const StatsCard = ({
  title,
  number,
  total,
  totalTitle,
  icon,
  suffixes = '',
  ...rest
}) => (
  <StyledStatsCard {...rest}>
    <div className="main-stats">
      <div className="stats-text">
        <Typography className="stats-title">{title}</Typography>
        <Typography className="stats-number">
          {delimitNumber(number)} {suffixes}
        </Typography>
      </div>
      <div className="stats-icon">
        <img src={icon} alt="stats-icon" />
      </div>
    </div>
    {!!total && (
      <div className="percent-wrapper">
        <div className="percent">
          <img src={ChartIcon} alt="chart-icon" className="chart-icon" />
          <Typography className="percent-text">
            {Math.round((number * 100) / total)} {` %`}
          </Typography>
        </div>
        <Typography className="total-title">{totalTitle}</Typography>
      </div>
    )}
  </StyledStatsCard>
);

export default StatsCard;
