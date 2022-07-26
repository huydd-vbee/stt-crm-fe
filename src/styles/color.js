const COLOR = {
  black: '#000000',
  white: '#ffffff',
  background: '#f8f8f8',
  divider: '#e9ecef',
  text: '#242424',
  blue: '#0d6efd',
  danger: '#ea5455',

  primary: '#fc6634',
  secondary: '#242424',
  success: '#28c76f',
  error: '#fc6634',
  warning: '#ffe143',
  info: '#00cfe8',
  dark: '#4b4b4b',
  light: '#babfc7',

  havelockBlue: '#4991e2',
  backgroundMenu: '#eee',

  gray: {
    100: '#F7FAFC',
    200: '#EDF2F7',
    300: '#E2E8F0',
    400: '#CBD5E0',
    500: '#A0AEC0',
    600: '#718096',
    700: '#4A5568',
    800: '#2D3748',
    900: '#1A202C',
  },
  red: {
    100: '#FFF5F5',
    200: '#FED7D7',
    300: '#FEB2B2',
    400: '#FC8181',
    500: '#F56565',
    600: '#E53E3E',
    700: '#C53030',
    800: '#9B2C2C',
    900: '#742A2A',
  },
  orange: {
    100: '#FFFAF0',
    200: '#FEEBC8',
    300: '#FBD38D',
    400: '#F6AD55',
    500: '#ED8936',
    600: '#DD6B20',
    700: '#C05621',
    800: '#9C4221',
    900: '#7B341E',
  },
  yellow: {
    100: '#FFFFF0',
    200: '#FEFCBF',
    300: '#FAF089',
    400: '#F6E05E',
    500: '#ECC94B',
    600: '#D69E2E',
    700: '#B7791F',
    800: '#975A16',
    900: '#744210',
  },
  green: {
    100: '#F0FFF4',
    200: '#C6F6D5',
    300: '#9AE6B4',
    400: '#68D391',
    500: '#48BB78',
    600: '#38A169',
    700: '#2F855A',
    800: '#276749',
    900: '#22543D',
  },
  teal: {
    100: '#E6FFFA',
    200: '#B2F5EA',
    300: '#81E6D9',
    400: '#4FD1C5',
    500: '#38B2AC',
    600: '#319795',
    700: '#2C7A7B',
    800: '#285E61',
    900: '#234E52',
  },
  blue_alt: {
    100: '#EBF8FF',
    200: '#BEE3F8',
    300: '#90CDF4',
    400: '#63B3ED',
    500: '#4299E1',
    600: '#3182CE',
    700: '#2B6CB0',
    800: '#2C5282',
    900: '#2A4365',
  },
  indigo: {
    100: '#EBF4FF',
    200: '#C3DAFE',
    300: '#A3BFFA',
    400: '#7F9CF5',
    500: '#667EEA',
    600: '#5A67D8',
    700: '#4C51BF',
    800: '#434190',
    900: '#3C366B',
  },
  purple: {
    100: '#FAF5FF',
    200: '#E9D8FD',
    300: '#D6BCFA',
    400: '#B794F4',
    500: '#9F7AEA',
    600: '#805AD5',
    700: '#6B46C1',
    800: '#553C9A',
    900: '#44337A',
  },
  pink: {
    100: '#FFF5F7',
    200: '#FED7E2',
    300: '#FBB6CE',
    400: '#F687B3',
    500: '#ED64A6',
    600: '#D53F8C',
    700: '#B83280',
    800: '#97266D',
    900: '#702459',
  },
};

const TRANSPARENT_COLOR = {
  primary: 'rgba(252, 102, 52, 0.12)',
  secondary: 'rgba(108, 117, 125, 0.12)',
  success: 'rgba(40, 199, 111, 0.12)',
  error: 'rgba(234, 84, 85, 0.12)',
  warning: 'rgba(255, 225, 67, 0.12)',
  info: 'rgba(0, 207, 232, 0.12)',
  dark: 'rgba(30, 30, 30, 0.12)',
  light: 'rgba(186, 191, 199, 0.12)',
  transparent: 'rgba(0, 0, 0, 0)',
};

const GRADIENT_COLOR = {
  primary: 'linear-gradient(45deg, #fc6634 0%, #fe506a 100%)',
  secondary: 'linear-gradient(45deg, #82868b 0%, #9ca0a4 100%)',
  success:
    'linear-gradient(45.79deg, #28c76f 0%, #48da89 94.75%, #48da89 94.75%)',
  error: 'linear-gradient(43.96deg, #ea5455 2.91%, #f08182 94.71%)',
  warning: 'linear-gradient(41.83deg, #ffe143 2.18%, #ffbc0e 97.5%)',
  info: 'linear-gradient(45deg, #00cfe8 0%, #1ce7ff 100%)',
  dark: 'linear-gradient(48.35deg, #4b4b4b 0%, #787878 94.43%)',
  light: '#babfc7',
};

const CONTAINED_BUTTON_COLOR = {
  primary: {
    hover: '#ff906b',
    active: '#fc6634',
    focus: '#ff4000',
  },
  secondary: {
    hover: '#4a4a4a',
    active: '#242424',
    focus: '#75797e',
  },
  success: {
    hover: '#28c76f',
    active: '#24b263',
    focus: '#24b263',
  },
  error: {
    hover: '#ea5455',
    active: '#e73d3e',
    focus: '#e73d3e',
  },
  warning: {
    hover: '#ffe86d',
    active: '#ffe143',
    focus: '#ffd600',
  },
  info: {
    hover: '#00cfe8',
    active: '#00b8cf',
    focus: '#00b8cf',
  },
  dark: {
    hover: '#4b4b4b',
    active: '#343434',
    focus: '#343434',
  },
};

const OUTLINED_BUTTON_COLOR = {
  primary: {
    hover: 'rgba(252, 102, 52, 0.04)',
    active: 'rgba(252, 102, 52, 0.2)',
    focus: 'rgba(252, 102, 52, 0.2)',
  },
  secondary: {
    hover: 'rgba(108, 117, 125, 0.04)',
    active: 'rgba(108, 117, 125, 0.2)',
    focus: 'rgba(108, 117, 125, 0.2)',
  },
  success: {
    hover: 'rgba(40, 199, 111, 0.04)',
    active: 'rgba(40, 199, 111, 0.2)',
    focus: 'rgba(40, 199, 111, 0.2)',
  },
  error: {
    hover: 'rgba(234, 84, 85, 0.04)',
    active: 'rgba(234, 84, 85, 0.2)',
    focus: 'rgba(234, 84, 85, 0.2)',
  },
  warning: {
    hover: 'rgba(255, 225, 67, 0.04)',
    active: 'rgba(255, 225, 67, 0.2)',
    focus: 'rgba(255, 225, 67, 0.2)',
  },
  info: {
    hover: 'rgba(0, 207, 232, 0.04)',
    active: 'rgba(0, 207, 232, 0.2)',
    focus: 'rgba(0, 207, 232, 0.2)',
  },
  dark: {
    hover: 'rgba(30, 30, 30, 0.04)',
    active: 'rgba(30, 30, 30, 0.2)',
    focus: 'rgba(30, 30, 30, 0.2)',
  },
};

const TEXT_BUTTON_COLOR = {
  primary: {
    hover: 'rgba(252, 102, 52, 0.12)',
    active: 'rgba(252, 102, 52, 0.2)',
    focus: 'rgba(252, 102, 52, 0.2)',
  },
  secondary: {
    hover: 'rgba(108, 117, 125, 0.12)',
    active: 'rgba(108, 117, 125, 0.2)',
    focus: 'rgba(108, 117, 125, 0.2)',
  },
  success: {
    hover: 'rgba(40, 199, 111, 0.12)',
    active: 'rgba(40, 199, 111, 0.2)',
    focus: 'rgba(40, 199, 111, 0.2)',
  },
  error: {
    hover: 'rgba(234, 84, 85, 0.12)',
    active: 'rgba(234, 84, 85, 0.2)',
    focus: 'rgba(234, 84, 85, 0.2)',
  },
  warning: {
    hover: 'rgba(255, 225, 67, 0.12)',
    active: 'rgba(255, 225, 67, 0.2)',
    focus: 'rgba(255, 225, 67, 0.2)',
  },
  info: {
    hover: 'rgba(0, 207, 232, 0.12)',
    active: 'rgba(0, 207, 232, 0.2)',
    focus: 'rgba(0, 207, 232, 0.2)',
  },
  dark: {
    hover: 'rgba(75, 75, 75, 0.12)',
    active: 'rgba(75, 75, 75, 0.2)',
    focus: 'rgba(75, 75, 75, 0.2)',
  },
};

const GRADIENT_BUTTON_COLOR = {
  primary: {
    hover: 'linear-gradient(46.62deg,#ff4000 0%, #ff2647; 93.64%)',
    active: 'linear-gradient(45deg, #fc6634 0%, #fe506a 100%)',
    focus: 'linear-gradient(45deg, #ff3d06 0%, #ff0026 100%)',
  },
  secondary: {
    hover: 'linear-gradient(45deg, #82868b 0%, #9ca0a4 100%)',
    active: 'linear-gradient(47.52deg, #696d71 0%, #82868b 95.97%)',
    focus: 'linear-gradient(47.52deg, #696d71 0%, #82868b 95.97%)',
  },
  success: {
    hover:
      'linear-gradient(46.82deg, #28c76f 0%, #48da89 93.46%, #48da89 93.46%)',
    active: 'linear-gradient(45deg, #1f9d57 0%, #28c76f 100%)',
    focus: 'linear-gradient(45deg, #1f9d57 0%, #28c76f 100%)',
  },
  error: {
    hover: 'linear-gradient(49.38deg, #ea5455 0.32%, #f08182 93.45%)',
    active: 'linear-gradient(45deg, #e42728 0.32%, #ea5455 100%)',
    focus: 'linear-gradient(45deg, #e42728 0.32%, #ea5455 100%)',
  },
  warning: {
    hover: 'linear-gradient(48.12deg, #ffe143 1.18%, #ffbc0e 95.16%)',
    active: 'linear-gradient(45deg, #ffe143 0.32%, #ffbc0e 100%)',
    focus: 'linear-gradient(45deg, #ffe143 0.32%, #ffbc0e 100%)',
  },
  info: {
    hover: 'linear-gradient(47.47deg, #00cfe8 1.18%, #03e4ff 96.09%)',
    active: 'linear-gradient(45deg, #00b8cf 0.32%, #00cfe8 100%)',
    focus: 'linear-gradient(45deg, #00b8cf 0.32%, #00cfe8 100%)',
  },
  dark: {
    hover: 'linear-gradient(48.13deg, #4b4b4b 1.18%, #787878 94.3%)',
    active: 'linear-gradient(44.76deg, #1e1e1e 1.18%, #4b4b4b 164.14%)',
    focus: 'linear-gradient(44.76deg, #1e1e1e 1.18%, #4b4b4b 164.14%)',
  },
};

export {
  COLOR,
  TRANSPARENT_COLOR,
  GRADIENT_COLOR,
  CONTAINED_BUTTON_COLOR,
  OUTLINED_BUTTON_COLOR,
  TEXT_BUTTON_COLOR,
  GRADIENT_BUTTON_COLOR,

};
