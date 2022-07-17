import { Box, Skeleton } from '@mui/material';
import React from 'react';

const TextSkeleton = ({
  children,
  loading,
  mt = 2,
  ml,
  mr,
  mb,
  width = '100%',
  gap = 2,
  number = 4,
  flexDirection = 'column',
}) => {
  if (loading) {
    return (
      <Box
        sx={{
          mt,
          ml,
          mr,
          mb,
          width,
          display: 'flex',
          flexDirection,
          gap,
        }}
      >
        {Array.from(Array(number < 0 ? 0 : number).keys()).map((index) => (
          <Skeleton key={index} animation={index % 2} />
        ))}
      </Box>
    );
  }
  return children || <></>;
};

export default TextSkeleton;
