import { Card, styled } from '@mui/material';
import { COLOR } from '@src/styles/color';
import { BOX_SHADOW } from '@src/styles/config';

const StyledOrderDetailCard = styled(Card)`
  min-width: 550px;
  max-width: 600px;
  box-shadow: ${BOX_SHADOW};

  .header-card-style {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }

  .style-border-table {
    border-top: 2px solid ${COLOR.divider};
  }

  .style-title-table {
    width: 156x;
    padding-right: 20px;
    font-size: 16px;
  }

  .style-data-table {
    color: ${COLOR.dark};
    font-weight: 400;
    font-size: 16px;
  }
`;
export { StyledOrderDetailCard };
