import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primaryNormal: '#4A90E2',
    primaryDark: '#3A78B0',
    primaryLight: '#B3D4FC',
    primaryReverse: '#FFFFFF',

    secondary: '#FFA500',

    warning: '#F5A623',
    success: '#7ED321',
    error: '#D0021B',

    background: '#F7F8FA',
    backgroundLight: '#F0F4F8',
    surface: '#FFFFFF',
    border: '#E1E4E8',

    textPrimary: '#333333',
    textSecondary: '#7F8C8D',
    textInverse: '#FFFFFF',

    kakao: '#FEE500',

    hoverBackground: '#E69500',
    hoverText: '#FFF5E0',
    disabledBackground: '#FFD580',
    disabledText: '#999999',
  },
  size: {
    extraSmall: '0.5rem',
    small: '1rem',
    medium: '1.5rem',
    large: '2rem',
    extraLarge: '2.5rem',
    doubleLarge: '3rem',
    full: '100%',
    half: '50%',
    none: '0%',
  },
  device: {
    mobile: '(max-width: 480px)',
    tablet: '(max-width: 768px)',
    laptop: '(max-width: 1024px)',
  },
};

export default theme;
