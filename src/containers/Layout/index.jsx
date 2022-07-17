import React, { useState, useEffect, createRef } from 'react';
import Sidebar from './Sidebar';
import { StyledLayout } from './index.style';
import NavBar from './Navbar';

const Layout = ({ children }) => {
  const mainPanel = createRef();

  useEffect(() => {
    document.body.style.overflow = 'unset';
    return function cleanup() {};
  });

  const [collapsed, setCollapsed] = useState(false);
  const [openSidebarMobile, setOpenSidebarMobile] = useState(false);

  const toggle = () => setCollapsed((prevValue) => !prevValue);

  const toggleSidebarOnMobile = () => setOpenSidebarMobile((prev) => !prev);

  return (
    <StyledLayout collapsed={collapsed ? 1 : undefined}>
      <Sidebar
        collapsed={collapsed}
        toggle={toggle}
        openSidebarMobile={openSidebarMobile}
        onToggleSidebarMobile={toggleSidebarOnMobile}
      />
      <div className="main" ref={mainPanel}>
        <div className="navbar">
          <NavBar toggleSidebarOnMobile={toggleSidebarOnMobile} />
        </div>
        {children}
      </div>
    </StyledLayout>
  );
};

export default Layout;
