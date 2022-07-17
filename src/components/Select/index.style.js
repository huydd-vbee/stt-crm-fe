import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSelectWrapper = styled('div')`
  .choose-provider {
    width: ${(props) => (props.width ? props.width : '170px')};
  }
`;

const StyledTypography = styled(Typography)`
  text-transform: capitalize;
`;

export { StyledSelectWrapper, StyledTypography };
