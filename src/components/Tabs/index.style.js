import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { COLOR } from '@src/styles/color';

export const StyledTabsWrapper = styled('div')`
  width: 100%;
  margin: 16px 0px;

  .tabs {
    width: 100%;
    display: flex;
    border-color: ${COLOR.divider};
    justify-content: space-between;
  }
`;

export const StyledTabPanel = styled(Box)`
  padding: 12px 0px;
`;
