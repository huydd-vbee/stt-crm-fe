import { COLOR } from '@src/styles/color';
import {BORDER_RADIUS} from "@src/styles/config";

const { styled } = require('@mui/material');

export const StyledCustomerDetail = styled('div')`
  .input-search {
    padding: 12px 7px;
  }
  .search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    .filter-box {
      display: flex;
      gap: 20px;
    }
  }

  .input-search-user {
    width: 360px;
  }

  .text-field {
    width: 100%;
    border-radius: ${BORDER_RADIUS};
    max-width: 360px;
    font-size: 14px;
  }

  .date-filter {
    display: flex;
    justify-content: flex-end;
    margin: 16px 0;
  }
`;

const StyledHeaderDetail = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const StyledStatsCardList = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, 45%);
  grid-gap: 20px;
  margin: 0px 0px;
`;

export const StyledCallBotDetailContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin: 24px 0px;
  gap: 16px;
`;

const StyledDetailOrderContainer = styled('div')`
  display: flex;
  justify-content: start;

  .user {
    margin-bottom: 24px;
    margin-top: 24px;
  }

  .input-order-code {
    margin-top: 28px;
    width: 360px;
    .MuiOutlinedInput-input {
      padding: 7px 12px;
      font-size: 16px;
    }
  }

  .layout {
    display: flex;
    justify-content: space-between;
  }

  .style-link {
    color: ${COLOR.dark};
  }

  .icon-background-style {
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${COLOR.blue};
    .icon-style {
      color: ${COLOR.white};
    }
  }

  .icon-style {
    color: ${COLOR.white};
  }

  .title-style {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600px !important;
    color: ${COLOR.dark};
    margin-top: 14px;
    margin-bottom: 10px;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }
`;



export {
  StyledHeaderDetail,
  StyledDetailOrderContainer,
};
