import MuiDateRangePickerDay from '@mui/lab/DateRangePickerDay';
import { MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { BORDER_RADIUS } from '@src/styles/config';

export const StyledCustomDatePickerRange = styled('div')`
  .date-picker-range {
    display: flex;
  }

  .date-range {
    display: flex;
    background-color: ${COLOR.white};
    border-width: 1px;
    border-style: dotted;
    border-color: ${(props) => (props.error ? COLOR.error : COLOR.light)};
    border-radius: ${BORDER_RADIUS};
  }

  .input-wrapper {
    display: flex;
    gap: 12px;
    align-items: center;
    margin: ${(props) => props.margin || '0 16px'};
  }

  .icon {
    cursor: pointer;
  }

  .light-color {
    color: ${COLOR.light};
  }

  .MuiOutlinedInput-root {
    width: ${(props) => props.width || '140px'};

    input {
      padding: 8.5px 0;
      height: fit-content;
      color: ${COLOR.dark};
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .helper-text {
    margin-left: 10px;
    font-size: 12px;
    color: ${(props) => (props.error ? COLOR.error : COLOR.light)};
  }
  .refresh {
    margin-bottom: ${(props) => props.error && '10px'};
  }
`;

export const CustomDateRangePickerDay = styled(MuiDateRangePickerDay)(
  ({ isHighlighting, isStartOfHighlighting, isEndOfHighlighting }) => ({
    ...(isHighlighting && {
      borderRadius: 0,
      backgroundColor: TRANSPARENT_COLOR.primary,
      color: COLOR.primary,
      '&:hover, &:focus': {
        backgroundColor: COLOR.primary,
        color: COLOR.white,
      },
    }),
    ...(isStartOfHighlighting && {
      backgroundColor: COLOR.primary,
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
      '.Mui-selected': {
        color: `${COLOR.white} !important`,
      },
    }),
    ...(isEndOfHighlighting && {
      backgroundColor: COLOR.primary,
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
      '.Mui-selected': {
        color: `${COLOR.white} !important`,
      },
    }),
  }),
);

export const StyledMenuItem = styled(MenuItem)`
  color: ${(props) => (props.active ? COLOR.white : COLOR.text)};
  background-color: ${(props) => (props.active ? COLOR.primary : COLOR.white)};

  &:hover {
    color: ${(props) => (props.active ? COLOR.white : COLOR.text)};
    background-color: ${(props) =>
      props.active ? COLOR.primary : TRANSPARENT_COLOR.primary};
  }
`;
