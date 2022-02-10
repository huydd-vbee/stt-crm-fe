import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useHistory, matchPath } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Hidden,
  Button,
  Box,
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import vbeeLogo from '@src/assets/logo/logoHr512.png';
import menuIcon from '@src/assets/icons/menu-icon.svg';
import collapsedMenuIcon from '@src/assets/icons/collapsed-menu-icon.svg';
import { sidebarMenu } from './config';
import { StyledSidebar } from './index.style';

const hasChildren = (item) => {
  const { subMenu } = item;
  if (!subMenu || subMenu.constructor !== Array || !subMenu.length) {
    return false;
  }
  return true;
};

const PlaceRightBottom = ({ isSubGroup, item, onItemClick, selectedKeys }) => {
  const { t } = useTranslation();

  const handleClick = (route, isGroupMenu) => {
    if (isGroupMenu) return;
    onItemClick(route);
  };

  return (
    <div
      className={`placement-right-top ${
        isSubGroup && 'placement-right-top-sub'
      }`}
    >
      <List component="div" disablePadding className="sub-menu">
        {item.subMenu.map((menuItem, index) => {
          const isSubmenuActive = selectedKeys.at(-1) === menuItem.key;
          const isGroupMenu = hasChildren(menuItem);

          return (
            <ListItem
              key={index.toString()}
              button={!isGroupMenu}
              className={`nested menu-item ${
                ((isGroupMenu && selectedKeys.includes(menuItem.key)) ||
                  isSubmenuActive) &&
                menuItem.icon &&
                'background-primary'
              } ${isGroupMenu && 'menu-submenu'}`}
              onClick={() => handleClick(menuItem.route, isGroupMenu)}
            >
              <ListItemIcon
                className={`menu-icon ${isSubmenuActive && 'active-submenu'}`}
              >
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText
                className={`menu-title text-light ${
                  isSubmenuActive && 'active-submenu'
                }`}
                primary={t(menuItem.key)}
              />
              {isGroupMenu && <ChevronRight className="menu-icon" />}
              {isGroupMenu && (
                <PlaceRightBottom
                  item={menuItem}
                  isSubGroup
                  onItemClick={onItemClick}
                  selectedKeys={selectedKeys}
                />
              )}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

const SingleLevel = ({
  item,
  mobile,
  collapsed,
  onItemClick,
  selectedKeys,
  level,
}) => {
  const { t } = useTranslation();

  const isMenuActive = useMemo(
    () => selectedKeys.at(-1) === item.key,
    [item, selectedKeys],
  );

  return (
    <ListItem
      button
      onClick={() => onItemClick(item.route)}
      className={`menu-item ${
        isMenuActive && item.icon && 'background-primary'
      } menu-item-level-${level}`}
    >
      <ListItemIcon className={`menu-icon ${isMenuActive && 'primary'}`}>
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={t(item.key)}
        className={`menu-title ${item.icon ? 'text-bold' : 'text-light'}
         ${isMenuActive && (item.icon ? 'primary' : 'active-submenu')}
         ${!mobile && collapsed && 'hide'}`}
      />
    </ListItem>
  );
};

const MultiLevel = ({
  item,
  mobile,
  collapsed,
  onItemClick,
  selectedKeys,
  level,
}) => {
  const { subMenu: children } = item;

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (collapsed) {
      setOpen(false);
    }
  }, [collapsed]);

  useEffect(() => {
    if (collapsed) return;
    if (selectedKeys.includes(item.key)) setOpen(true);
  }, [collapsed, selectedKeys]);

  const handleClick = () => {
    if (!mobile && collapsed) return;
    setOpen((prev) => !prev);
  };

  return (
    <div className="menu-submenu">
      <ListItem
        button
        onClick={handleClick}
        className={`menu-item ${
          open && level === 0 && 'background-primary'
        } menu-item-level-${level}`}
      >
        <ListItemIcon
          className={`menu-icon ${
            selectedKeys.includes(item.key) && 'primary'
          }`}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={t(item.key)}
          className={`menu-title text-bold ${!mobile && collapsed && 'hide'} ${
            selectedKeys.includes(item.key) && 'primary'
          } `}
        />
      </ListItem>
      {!mobile && collapsed && (
        <PlaceRightBottom
          item={item}
          onItemClick={onItemClick}
          selectedKeys={selectedKeys}
        />
      )}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, key) => (
            <MenuItem
              key={key.toString()}
              item={child}
              mobile={mobile}
              collapsed={collapsed}
              onItemClick={onItemClick}
              selectedKeys={selectedKeys}
              level={level + 1}
            />
          ))}
        </List>
      </Collapse>
    </div>
  );
};

const MenuItem = ({
  item,
  mobile,
  collapsed,
  onItemClick,
  selectedKeys,
  level = 0,
}) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;

  return (
    <Component
      level={level}
      item={item}
      mobile={mobile}
      collapsed={collapsed}
      onItemClick={onItemClick}
      selectedKeys={selectedKeys}
    />
  );
};

const Sidebar = (props) => {
  const { collapsed, toggle, openSidebarMobile, onToggleSidebarMobile } = props;
  const [selectedKeys, setSelectedKeys] = useState([]);

  const { pathname } = useLocation();
  const history = useHistory();

  const isActiveRoute = (route) =>
    matchPath(pathname, { path: route, exact: true });

  useEffect(() => {
    const getFirstRouteMounted = (menu, listKeys) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const menuItem of menu) {
        const { key, route, subMenu } = menuItem;
        if (!subMenu) {
          if (isActiveRoute(route)) {
            return { ...menuItem, listKeys: [...listKeys, key] };
          }
        } else {
          const result = getFirstRouteMounted(subMenu, [...listKeys, key]);
          if (result) return result;
        }
      }
      return null;
    };

    const { listKeys } = getFirstRouteMounted(sidebarMenu, []) || {};
    if (listKeys) {
      setSelectedKeys(listKeys);
    }
  }, [pathname]);

  const handleClickMenu = (route) => {
    history.push(route);
  };

  const renderSidebarWindow = () => (
    <Hidden mdDown implementation="css">
      <Drawer
        open={!collapsed}
        className={`drawer ${!collapsed && 'drawer-open'} ${
          collapsed && 'drawer-close'
        }`}
        variant="permanent"
        classes={{
          paper: `drawer ${!collapsed && 'drawer-open'} ${
            collapsed && 'drawer-close'
          }`,
        }}
      >
        <Toolbar className={`toolbar ${collapsed && 'toolbar-collapsed'}`}>
          <img
            className={`logo ${collapsed && 'hide'}`}
            src={vbeeLogo}
            alt="logo"
          />
          <Button className="menu-button" onClick={toggle}>
            <img
              src={collapsed ? collapsedMenuIcon : menuIcon}
              alt="menu-icon"
            />
          </Button>
        </Toolbar>
        <div className="content">
          <List>
            {sidebarMenu.map((item, index) => (
              <MenuItem
                key={index.toString()}
                item={item}
                collapsed={collapsed}
                onItemClick={handleClickMenu}
                selectedKeys={selectedKeys}
              />
            ))}
          </List>
        </div>
      </Drawer>
    </Hidden>
  );

  const renderSidebarMobile = () => {
    const mobileDrawerRef = useRef(null);

    useEffect(() => {
      function handleClickOutside(event) {
        if (
          mobileDrawerRef.current &&
          !mobileDrawerRef.current.contains(event.target) &&
          openSidebarMobile
        ) {
          onToggleSidebarMobile();
        }
      }
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [mobileDrawerRef, openSidebarMobile]);

    return (
      <Hidden mdUp implementation="css">
        {openSidebarMobile && <Box className="mobile-drawer-bg" />}
        <Drawer
          variant="persistent" // mui render css error with temporary variant
          anchor="right"
          open={openSidebarMobile}
          onClose={() => onToggleSidebarMobile()}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{ display: { md: 'none' } }}
          classes={{ paper: 'drawer mobile-drawer-border' }}
          ref={mobileDrawerRef}
        >
          <Toolbar className="toolbar">
            <img className="logo" src={vbeeLogo} alt="logo" />
          </Toolbar>
          <div className="mobile-drawer">
            <List>
              {sidebarMenu.map((item, index) => (
                <MenuItem
                  key={index.toString()}
                  item={item}
                  onItemClick={handleClickMenu}
                  selectedKeys={selectedKeys}
                  mobile
                />
              ))}
            </List>
          </div>
        </Drawer>
      </Hidden>
    );
  };

  return (
    <div>
      <StyledSidebar>
        {renderSidebarWindow()}
        {renderSidebarMobile()}
      </StyledSidebar>
    </div>
  );
};

export default Sidebar;
