import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/shared/style';

const AppThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
