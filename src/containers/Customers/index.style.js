import { MenuItem } from '@mui/material';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { styled } from '@mui/material/styles';

export const StyledCustomers = styled('div')``;

export const StyledStatsCardList = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, 23.5%);
  grid-gap: 20px;
  margin: 25px 0px;
`;

export const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    font-weight: 500;
    &:focus {
      color: ${COLOR.white};
      background-color: ${COLOR.light};
      &:hover {
        background-color: ${COLOR.light};
        color: ${COLOR.white};
      }
    }
    &:hover {
      background-color: ${TRANSPARENT_COLOR.light};
      &.MuiListItemIcon-root,
      &.MuiListItemText-primary {
        color: ${COLOR.white};
      }
    }
  }
`;

export const StyleButtonsAction = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 12px;
`;
