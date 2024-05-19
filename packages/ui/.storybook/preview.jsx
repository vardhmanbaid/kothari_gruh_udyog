import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import { lightTheme, theme } from '@core/theme';
import { queryClient } from '@core/utils/api';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import React, { useMemo } from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';

export const decorators = [
  (Story) => {
    const muiTheme = useMemo(() =>
      createTheme({
        ...theme,
        palette: {
          mode: 'light',
          ...(theme?.palette ?? {}),
          ...(lightTheme?.palette ?? {}),
        },
      })
    );

    return (
      <ThemeProvider theme={muiTheme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        />
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </ThemeProvider>
    );
  },
  withRouter,
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
