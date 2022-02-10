import React from 'react';
import { Close } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { StyledDrawer } from './index.style';

const CustomDrawer = ({
  title,
  children,
  anchor = 'right',
  width,
  onClose,
  ...rest
}) => (
  <StyledDrawer anchor={anchor} width={width} onClose={onClose} {...rest}>
    <div className="drawer-title">
      <Typography>{title}</Typography>
      <Close onClick={onClose} />
    </div>
    <div className="drawer-content">{children}</div>
  </StyledDrawer>
);

export default CustomDrawer;
