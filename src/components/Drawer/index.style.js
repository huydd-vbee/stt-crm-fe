import { Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import { COLOR } from '@src/styles/color';

export const StyledDrawer = styled(Drawer)`
  .MuiPaper-root {
    min-width: 400px;
    width: ${({ width }) => width || ''};
    border-radius: 5px 0px 0px 5px;
  }

  .drawer-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px 5px 20px;
    background-color: ${COLOR.divider};

    svg:hover {
      cursor: pointer;
    }
  }

  .drawer-content {
    padding: 20px;
    max-width: 360px;
  }
`;
