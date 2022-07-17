import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import Keycloak from 'keycloak-js';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { SnackbarProvider } from 'notistack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import store from './redux/store';
import AppRouter from './router';
import theme from './styles/theme';
import { IAM_CLIENT_ID, IAM_REALM, IAM_URL } from './configs';
import NotiHandler from './errors/NotiHandler';
import { getCookie } from './utils/cookie';
import { handleReceivingTokens } from './services/auth';

const keycloak = Keycloak({
  url: `${IAM_URL}/auth`,
  realm: IAM_REALM,
  clientId: IAM_CLIENT_ID,
});

const notistackRef = React.createRef();

const App = () => {
  const refreshToken = getCookie('refreshToken');

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'login-required',
        refreshToken,
      }}
      onTokens={handleReceivingTokens}
    >
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Provider store={store()}>
            <SnackbarProvider preventDuplicate maxSnack={3} ref={notistackRef}>
              <NotiHandler>
                <AppRouter />
              </NotiHandler>
            </SnackbarProvider>
          </Provider>
        </LocalizationProvider>
      </ThemeProvider>
    </ReactKeycloakProvider>
  );
};

export default App;
