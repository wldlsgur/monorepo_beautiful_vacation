import { GlobalStyle, Router, ThemeProvider } from '@/app';

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;
