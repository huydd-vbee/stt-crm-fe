import { styled } from '@mui/material/styles';

export const StyledUnauthorized = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 80%;
  margin: auto;
  padding: 50px 0;

  .vbee-studio-logo {
    margin-bottom: 15px;
  }

  .unauthorized-title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }

  img {
    width: 100%;
  }
`;
