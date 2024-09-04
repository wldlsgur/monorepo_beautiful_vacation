import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import { Theme } from '@/shared/Style';

const AppThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
