import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import Layout from '@src/containers/Layout';
import ROUTES from '@src/constants/routes';
import api from '@src/apis/api';

import { Box, CircularProgress } from '@mui/material';

import appRoutes from './appRoutes';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const PrivateApp = () => {
  const { keycloak } = useKeycloak();
  const privateRoutes = appRoutes.filter((route) => route.isPrivate);

  (() => {
    api.defaults.headers.common.Authorization = `Bearer ${keycloak.token}`;
  })();

  return (
    <Layout>
      <Switch>
        {privateRoutes.map((privateRoute) => (
          <PrivateRoute
            path={privateRoute.path}
            component={privateRoute.component}
            exact
            key={privateRoute.path}
          />
        ))}
        <Route render={() => <Redirect to={ROUTES.DASHBOARD} />} />
      </Switch>
    </Layout>
  );
};

const AppRouter = () => {
  const { initialized } = useKeycloak();

  if (!nprogress.isStarted()) nprogress.start();

  useEffect(() => {
    nprogress.done();
  });

  if (!initialized) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const publicRoutes = appRoutes.filter((route) => !route.isPrivate);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to={ROUTES.DASHBOARD} />}
        />
        {publicRoutes.map((publicRoute) => (
          <PublicRoute
            exact
            path={publicRoute.path}
            component={publicRoute.component}
            restricted={publicRoute.restricted}
            key={publicRoute.path}
          />
        ))}

        <PrivateRoute component={PrivateApp} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
