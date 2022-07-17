import { styled } from '@mui/material/styles';
import { COLOR } from '@src/styles/color';

export const StyledCustomDatePicker = styled('div')`
  max-width: 400px;
  .MuiTextField-root {
    width: 100%;
    background: ${COLOR.white};
  }
  .MuiOutlinedInput-root {
    width: 100%;
    padding-left: 10.5px;
    input {
      padding: 8.5px 0;
      height: fit-content;
      color: ${COLOR.dark};
    }
  }
  .MuiIconButton-root {
    color: ${COLOR.light};
  }
  .MuiIconButton-label {
    color: ${COLOR.light};
  }
  .MuiOutlinedInput-notchedOutline {
    border-style: dotted;
    border-color: ${COLOR.dark} !important;
  }
`;
export const StyledCustomDatePickerRange = styled('div')`
  .reset-button {
    color: ${COLOR.light};
  }
  .to-text {
    color: ${COLOR.light};
    margin: 0 10px;
  }
  .arrow-icon {
    width: 15px;
    padding: 5px;
    color: ${COLOR.light};
  }
`;
