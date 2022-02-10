import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';
import unauthorizedImg from '@src/assets/images/unauthorized.png';
import vbeeStudioLogo from '@src/assets/logo/vbee-studio-logo.png';
import { ROLES } from '@src/constants';
import { IAM_CLIENT_ID } from '@src/configs';
import { StyledUnauthorized } from './index.style';

const Unauthorized = () => {
  const { t } = useTranslation();
  const { keycloak } = useKeycloak();
  const history = useHistory();

  const handleBackToPreviousPage = () => history.goBack();

  return (
    <StyledUnauthorized>
      {!keycloak?.hasResourceRole(ROLES.VIEW_BACK_OFFICE, IAM_CLIENT_ID) && (
        <Box className="vbee-studio-logo">
          <img src={vbeeStudioLogo} alt="vbee-logo" />
        </Box>
      )}
      <Typography className="unauthorized-title">
        {t('unauthorizedTitle')}
      </Typography>
      <Typography>{t('unauthorizedDescription')}</Typography>
      {keycloak?.hasResourceRole(ROLES.VIEW_BACK_OFFICE, IAM_CLIENT_ID) && (
        <Button onClick={handleBackToPreviousPage} variant="contained">
          {t('goHome')}
        </Button>
      )}
      <Box sx={{ mt: '50px', width: { sm: '85%', md: '50%' } }}>
        <img src={unauthorizedImg} alt="unauthorized" />
      </Box>
    </StyledUnauthorized>
  );
};

export default Unauthorized;
