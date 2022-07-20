import { Box, Button, MenuItem } from '@mui/material';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { styled } from '@mui/material/styles';
import {BORDER_RADIUS} from "@src/styles/config";

export const StyledCustomers = styled(Box)`
  .styled-action-row {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-bottom: 16px;
  }
`;

export const StyledAddCharacterDrawler = styled('div')`
  .add-character-drawer {
    border-radius: ${BORDER_RADIUS};
    font-size: 14px;
  }

  .customer-information {
    margin-bottom: 30px;
  }

  .info-customer {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 10px;
  }

  .info-provider {
    text-transform: capitalize;
  }

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

export const ExcelButton = styled(Button)`
  padding: 8px 16px;
`;
