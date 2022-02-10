import React from 'react';
import { Button, Hidden } from '@mui/material';

const NavBar = ({ toggleSidebarOnMobile }) => (
  <div>
    <Hidden mdUp implementation="css">
      <Button onClick={toggleSidebarOnMobile}>toggle mobile sidebar</Button>
    </Hidden>
  </div>
);

export default NavBar;
