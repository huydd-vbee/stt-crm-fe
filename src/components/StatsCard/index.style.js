import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { COLOR } from '@src/styles/color';
import { BORDER_RADIUS, BOX_SHADOW } from '@src/styles/config';

export const StyledStatsCard = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: ${COLOR.white};
  border-radius: ${BORDER_RADIUS};
  box-shadow: ${BOX_SHADOW};

  .main-stats {
    height: 65px;
    display: flex;
    justify-content: space-between;

    .stats-text {
      margin-top: 4px;
      margin-left: 12px;
      flex: 1;
      opacity: 0.7;

      .stats-title {
        font-weight: 600;
        color: ${COLOR.dark};
        margin-bottom: 3px;
        font-size: 14px;
      }

      .stats-number {
        font-weight: 600;
        color: ${COLOR.black};
        font-size: 20px;
      }
    }
  }

  .percent-wrapper {
    margin: 0 0 10px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .percent {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .percent-text {
    margin-left: 5px;
    font-weight: 300;
    font-size: 14px;
    color: ${COLOR.success};
  }

  .chart-icon {
    width: 14px;
    height: 14px;
  }

  .total-title {
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
    color: ${COLOR.lightText};
  }
`;
