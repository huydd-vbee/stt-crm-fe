import { MenuItem } from '@mui/material';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import styled from 'styled-components';

export const StyleButtonsAction = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 12px;
`;

export const StyledCreateOrder = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 5px;

  .input-control {
    margin-bottom: 15px;

    .input-label {
      margin-bottom: 5px;
      font-weight: 600;
      color: ${COLOR.dark};
    }
  }

  .action-group {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }
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
