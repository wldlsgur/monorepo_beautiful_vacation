import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import '@/shared/style/PretendardVariable.css';

const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    font-size: 62.5%;
  }
  body {
    height: 100dvh;
    font-family: "Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }
  #root {
    height: 100%;
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
