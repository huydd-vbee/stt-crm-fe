import { styled } from '@mui/material/styles';
import { TableContainer } from '@mui/material';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { BOX_SHADOW } from '@src/styles/config';

const StyledTable = styled(TableContainer)`
  background: ${COLOR.white};
  box-shadow: ${BOX_SHADOW};
  .header-cell {
    background-color: #f6f9fc;
    color: ${COLOR.dark};
    padding: 6px 12px;
  }

  .header-item {
    display: flex;
    align-items: center;
  }

  .header-left {
    justify-content: left;
  }

  .header-right {
    justify-content: right;
  }

  .header-center {
    justify-content: center;
  }

  .header-title {
    text-transform: uppercase;
    font-weight: 500;
    font-size: 12px;
    color: #8898aa;
  }

  .header-icon,
  .header-checkbox {
    color: ${COLOR.white} !important;
  }

  .body-row {
    &:last-child td,
    &:last-child th {
      border: 0;
    }
    &:hover {
      background: ${TRANSPARENT_COLOR.info};
    }
  }

  .body-cell {
    border-bottom: 1px solid ${COLOR.divider};
    padding: 16px 12px;
  }
`;

export const StyledTableFooter = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  padding: 20px;

  .Mui-selected {
    color: ${COLOR.white} !important;
  }
  .footer-label {
    font-size: 12px;
    font-weight: 600;
  }
`;

export { StyledTable };
