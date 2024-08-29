import { DefaultTheme } from 'styled-components';

const Theme: DefaultTheme = {
  colors: {
    primaryNormal: '#4A90E2', // 메인 블루 색상
    primaryDark: '#3A78B0', // 어두운 블루 색상 (primary의 dark variant)
    primaryLight: '#B3D4FC', // 밝은 블루 색상 (primary의 light variant)
    primaryReverse: '#FFFFFF', // 메인 색상의 반전 (흰색)

    secondary: '#50E3C2', // 보조 색상 (밝은 민트)
    secondaryDark: '#3CB294', // 어두운 민트 색상
    secondaryLight: '#D0FAF1', // 밝은 민트 색상

    warning: '#F5A623', // 경고 색상 (주황색)
    success: '#7ED321', // 성공 색상 (녹색)
    error: '#D0021B', // 에러 색상 (빨강)

    background: '#F7F8FA', // 배경색 (밝은 회색)
    surface: '#FFFFFF', // 서페이스 색상 (흰색)
    border: '#E1E4E8', // 테두리 색상 (연한 회색)

    textPrimary: '#333333', // 기본 텍스트 색상 (진한 검정)
    textSecondary: '#7F8C8D', // 부차적인 텍스트 색상 (중간 회색)
    textInverse: '#FFFFFF', // 반전된 텍스트 색상 (흰색)
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

export default Theme;
