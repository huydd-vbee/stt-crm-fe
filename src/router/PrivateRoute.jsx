import React from 'react';
import { Route } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import UnauthorizedPage from '@src/pages/Unauthorized';
import { IAM_CLIENT_ID } from '@src/configs';
import { ROLES } from '@src/constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { keycloak } = useKeycloak();

  return (
    <Route
      {...rest}
      render={(props) =>
        keycloak.authenticated &&
        keycloak.hasResourceRole(ROLES.VIEW_BACK_OFFICE, IAM_CLIENT_ID) ? (
          <Component {...props} />
        ) : (
          <UnauthorizedPage />
        )
      }
    />
  );
};

export default PrivateRoute;
