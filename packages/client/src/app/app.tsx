import {
  GlobalStyle,
  Router,
  ThemeProvider,
  TanstackQueryProvider,
} from '@/app';

const App = () => {
  return (
    <ThemeProvider>
      <TanstackQueryProvider>
        <GlobalStyle />
        <Router />
      </TanstackQueryProvider>
    </ThemeProvider>
  );
};

export default App;
