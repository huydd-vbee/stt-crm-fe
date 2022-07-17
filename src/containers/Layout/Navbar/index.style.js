import { AppBar, Menu } from '@mui/material';
import { styled } from '@mui/material/styles';
import { COLOR } from '@src/styles/color';
import { BOX_SHADOW, BORDER_RADIUS } from '@src/styles/config';

const StyledAppBar = styled(AppBar)`
  background: transparent;
  box-shadow: none;
  position: absolute;
  width: 100%;
  z-index: 1029;
  min-height: 64px;
  display: block;
  position: sticky;
  top: 16px;

  .container {
    min-height: 64px;
    padding-left: 16px;
    padding-right: 16px;

    border-radius: ${BORDER_RADIUS};
    color: ${COLOR.text};
    box-shadow: ${BOX_SHADOW};
    background-color: ${COLOR.white};

    &:before,
    &:after {
      display: table;
      content: '';
    }

    &:after {
      clear: both;
    }
  }
`;

const StyledNavBar = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  .navbar-item {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .btn-order {
    display: flex;
  }
  .pending-button {
    color: ${COLOR.dark};
  }
  .error-button {
    color: ${COLOR.danger};
  }

  .language-icon {
    width: 16px;
  }
  .language-text {
    font-weight: normal;
    text-transform: none;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 8px;
    .menu-item {
      gap: 10px;
    }
    .style-text {
      text-decoration: none;
      color: ${COLOR.text};
    }
  }
  .profile-content {
    text-align: right;
  }

  .light-text {
    color: ${COLOR.light};
  }
  .text {
    font-size: 14px;
    white-space: nowrap;
  }
  .bold {
    font-weight: bold;
  }
  .error-text {
    color: ${COLOR.danger};
  }

  .profile-icon {
    margin-right: 10px;
  }

  .package-info-icon {
    width: 18px;
    height: 18px;
  }

  .package-info-item {
    margin-right: 10px;
  }

  @media only screen and (min-width: 1440px) {
    .large-package-info-item {
      display: flex;
      gap: 8px;
    }

    .medium-package-info-item,
    .small-package-info-item,
    .medium-language-button {
      display: none;
    }

    .large-language-button {
      display: flex;
    }
  }

  @media only screen and (max-width: 1440px) and (min-width: 1200px) {
    .large-package-info-item,
    .small-package-info-item,
    .large-language-button {
      display: none;
    }

    .medium-package-info-item {
      display: flex;
      gap: 8px;
    }

    .medium-language-button {
      display: flex;
    }
  }

  @media only screen and (max-width: 1199px) {
    .large-package-info-item,
    .medium-package-info-item,
    .large-language-button {
      display: none;
    }

    .small-package-info-item {
      display: flex;
      gap: 8px;
    }

    .medium-language-button {
      display: flex;
    }
  }
`;

const StyledMenu = styled(Menu)`
  .menu-item {
    grid-gap: 10px;
  }

  .text-link {
    color: ${COLOR.text};
    text-decoration: none;
  }

  .logout-style {
    color: ${COLOR.danger};
  }
  .style-version {
    margin-left: 20px;
    color: ${COLOR.light};
  }

  .icon-download-container {
    margin: 0px 0px 12px -14px;
  }
`;

export { StyledAppBar, StyledNavBar, StyledMenu };
