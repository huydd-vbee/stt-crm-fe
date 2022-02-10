import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import ROUTE from '@src/constants/routes';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { keycloak } = useKeycloak();

  return (
    <Route
      {...rest}
      render={(props) =>
        keycloak.authenticated && restricted ? (
          <Redirect to={ROUTE.DASHBOARD} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
