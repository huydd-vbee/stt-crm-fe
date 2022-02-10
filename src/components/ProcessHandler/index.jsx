import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const ProcessHandler = ({
  children,
  loading,
  mt,
  ml,
  mr,
  mb,
  size = 40,
  align,
}) => {
  if (loading)
    return (
      <Box sx={{ mt, ml, mr, mb, display: 'flex', justifyContent: align }}>
        <CircularProgress size={size} />
      </Box>
    );
  return children || <></>;
};

export default ProcessHandler;
