import { Box, Button } from '@mui/material';
import { COLOR } from '@src/styles/color';
import styled from 'styled-components';

export const StyledRequestStatsContainer = styled(Box)`
  .styled-action-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin: 24px 0px 36px 0px;

    @media (max-width: 1345px) {
      flex-direction: column;
      align-items: flex-start;
    }

    .search-field {
      width: 340px;
    }
  }

  .styled-action-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;

    @media (max-width: 987px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export const ExcelButton = styled(Button)`
  padding: 8px 16px;
`;

export const StyledAppStatsChartContainer = styled('div')`
  display: grid;
  //grid-template-columns: 25% 50% 20%;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin: 24px 0px;
  gap: 16px;
`;

export const StyledAppCard = styled(Box)`
  background-color: ${COLOR.white};
  padding: 10px 16px;
  border-radius: 4px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
  }

  .card-header > :first-child {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .card-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    align-items: center;
  }

  .card-row > :first-child {
    color: ${COLOR.text};
  }

  .card-row > :last-child {
    font-weight: bold;
  }
`;

export const StyledAppStatsCard = styled(Box)`
  background-color: ${COLOR.white};
  padding: 10px 16px;
  border-radius: 4px;

  .chart-wrapper {
    margin-top: 15px;
    height: 300px;
  }

  .title {
    color: ${COLOR.lightText};
    font-size: 0.75rem;
    font-weight: bold;
  }

  .title-detail {
    color: ${COLOR.black};
    font-size: 1.25rem;
    font-weight: bold;
  }
`;
