import { COLOR } from '@src/styles/color';

const { styled } = require('@mui/material');

const StyledHeaderDetail = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const StyledDetailOrderContainer = styled('div')`
  display: flex;
  justify-content: center;

  .user {
    margin-bottom: 24px;
    margin-top: 78px;
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

export { StyledHeaderDetail, StyledDetailOrderContainer };
