import { LogoutOutlined, PersonOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Menu as MenuIcon,
} from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';
import BadgeAvatar from '@src/components/BadgeAvatar';
import camelcaseKeys from 'camelcase-keys';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledAppBar, StyledMenu, StyledNavBar } from './index.style';

const languages = [
  {
    value: 'vi',
    label: 'vietnamese',
    icon: 'https://vbee.s3.ap-southeast-1.amazonaws.com/images/nations/VietNam.png',
  },
  {
    value: 'en',
    label: 'english',
    icon: 'https://vbee.s3.ap-southeast-1.amazonaws.com/images/nations/UnitedKingdom.png',
  },
];

const Language = () => {
  const [anchorLanguage, setAnchorLanguage] = useState(null);
  const [language, setLanguage] = useState({});

  const { t, i18n } = useTranslation();

  const handleClickLanguage = (event) => setAnchorLanguage(event.currentTarget);

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng.value);
    setLanguage(lng);
    localStorage.setItem('lng', lng.value);
    setAnchorLanguage(null);
  };

  useEffect(() => {
    const defaultLanguageValue = localStorage.getItem('i18nextLng');
    const defaultLanguage = languages.find(
      (lng) => lng.value === defaultLanguageValue,
    );

    const currentLanguageValue = localStorage.getItem('lng');
    const currentLanguage = languages.find(
      (lng) => lng.value === currentLanguageValue,
    );

    if (currentLanguage) {
      handleChangeLanguage(currentLanguage);
      return;
    }
    if (defaultLanguage) {
      setLanguage(defaultLanguage);
      return;
    }
    handleChangeLanguage(languages[0]);
  }, []);

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Button
        color="secondary"
        className="language-text large-language-button"
        startIcon={
          <img className="language-icon" src={language.icon} alt="language" />
        }
        onClick={handleClickLanguage}
      >
        {t(language.label)}
      </Button>
      <IconButton
        onClick={handleClickLanguage}
        className="medium-language-button"
        color="secondary"
      >
        <img className="language-icon" src={language.icon} alt="language" />
      </IconButton>
      <Menu
        anchorEl={anchorLanguage}
        open={Boolean(anchorLanguage)}
        onClose={() => setAnchorLanguage(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {languages.map((lng) => (
          <MenuItem key={lng.label} onClick={() => handleChangeLanguage(lng)}>
            <img
              style={{ width: 16, marginRight: 8 }}
              src={lng.icon}
              alt="language"
            />
            {t(lng.label)}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const Profile = () => {
  const [anchorProfile, setAnchorProfile] = useState(null);

  const { t } = useTranslation();
  const { keycloak } = useKeycloak();

  const userInfo = camelcaseKeys(keycloak.idTokenParsed, { deep: true });

  const handleGoToProfile = () => keycloak.accountManagement();
  const handleLogout = () => keycloak.logout();
  const handleClickProfile = (event) => setAnchorProfile(event.currentTarget);

  return (
    <div className="profile">
      <div className="profile-content">
        <Typography className="text bold">
          {`${userInfo.familyName} ${userInfo.givenName}`}
        </Typography>
      </div>
      <IconButton onClick={handleClickProfile}>
        <BadgeAvatar
          img={userInfo.avatar}
          active={keycloak && keycloak.authenticated}
          name={userInfo.givenName || userInfo.familyName}
          number={new Date(userInfo.createdAt)}
        />
      </IconButton>
      <StyledMenu
        anchorEl={anchorProfile}
        open={Boolean(anchorProfile)}
        onClose={() => setAnchorProfile(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem classes={{ root: 'menu-item' }} onClick={handleGoToProfile}>
          <PersonOutline /> {t('profile')}
        </MenuItem>
        <MenuItem
          classes={{ root: 'menu-item logout-style' }}
          onClick={handleLogout}
        >
          <LogoutOutlined />
          {t('logout')}
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

const Navbar = ({ openSidebar, handleOpenSidebar }) => (
  <StyledAppBar>
    {/*// openSidebar={openSidebar}*/}
    <Toolbar className="container">
      {!openSidebar && (
        <IconButton color="secondary" onClick={handleOpenSidebar}>
          <MenuIcon open={Boolean(openSidebar)}/>
        </IconButton>
      )}
      <StyledNavBar>
        <Box
          sx={{ gap: { xs: '24px', lg: '4px', xl: '24px' } }}
          className="navbar-item"
        >
          <Language />
          <Profile />
        </Box>
      </StyledNavBar>
    </Toolbar>
  </StyledAppBar>
);

export default Navbar;
