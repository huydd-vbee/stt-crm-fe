import { BORDER_RADIUS, BOX_SHADOW, SIDEBAR_WIDTH } from '@src/styles/config';
import { styled } from '@mui/material/styles';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';

export const StyledSidebar = styled('div')`
  .toolbar {
    padding: 10px 19px 10px;
    display: flex;
    justify-content: space-between;
    column-gap: 24px;

    .logo {
      width: 70%;
    }
  }

  .mobile-drawer-bg {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    transition: all 0.25s;
    transition-duration: 0.4s;
  }

  .toolbar-collapsed {
    justify-content: center;
    padding: 0px;
  }

  .drawer {
    width: ${SIDEBAR_WIDTH}px;
    flex-shrink: 0;
    height: 100vh;
    white-space: nowrap;
    box-shadow: ${BOX_SHADOW};
    border-radius: 0px 12px 12px 0px;
    transition: all 0.25s;
    transition-duration: 0.4s;
    position: fixed;
    z-index: 1;
  }

  .mobile-drawer {
    width: ${SIDEBAR_WIDTH}px;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .mobile-drawer-border {
    border-radius: 12px 0px 0px 12px !important;
  }

  .drawer-open {
    width: ${SIDEBAR_WIDTH}px;
  }

  .drawer-close {
    overflow: visible;
    width: 64px;
  }

  .header {
    height: 48px;
  }

  .nested {
    padding-left: 32px;
    &:hover {
      background-color: ${TRANSPARENT_COLOR.light};
    }
  }

  .hide {
    display: none;
  }

  .menu-button {
    padding: 12px;
    min-width: unset;
  }

  .menu-item {
    display: flex;
    align-items: center;
    text-transform: none;
    justify-content: center;
    margin: 3px 0px;

    &:hover {
      border-radius: ${BORDER_RADIUS};
    }
  }

  .menu-item-level-1 {
    padding-left: 16px;
  }

  .menu-item-level-2 {
    padding-left: 32px;
  }

  .menu-item-level-3 {
    padding-left: 48px;
  }

  .menu-icon {
    min-width: 24px;
    height: 30px;
    font-size: 24px;
    line-height: 30px;
    align-items: center;
    vertical-align: middle;
    color: ${COLOR.dark};
  }

  .menu-title {
    padding-left: 10px;
    margin: 0px;
    transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1) 0s;
    color: ${COLOR.dark};
  }

  .text-bold {
    & span {
      font-weight: 500;
    }
  }

  .text-light {
    & span {
      font-weight: 300;
    }
  }

  .primary {
    color: ${COLOR.primary};
  }

  .background-primary {
    background-color: ${TRANSPARENT_COLOR.light};
    border-radius: ${BORDER_RADIUS};
  }

  .active-submenu {
    color: ${COLOR.dark} !important;
    & span {
      font-weight: 500;
    }
  }

  .menu-submenu {
    position: relative;
    &:hover {
      & > .placement-right-top {
        display: block;
      }
    }
  }

  .placement-right-top {
    background-color: transparent;
    position: absolute;
    display: none;
    top: 0px;
    right: ${-SIDEBAR_WIDTH - 16}px;
    width: ${SIDEBAR_WIDTH}px;
    padding-left: 16px;
  }

  .placement-right-top-sub {
    right: ${-SIDEBAR_WIDTH - 8}px;
    padding-left: 8px;
  }

  .sub-menu {
    padding: 4px 0px;
    border-radius: 4px;
    background-color: ${COLOR.white};
    box-shadow: ${BOX_SHADOW};
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    & ul {
      padding: 8px;
    }
  }
`;
