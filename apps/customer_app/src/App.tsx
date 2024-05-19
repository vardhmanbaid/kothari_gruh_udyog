import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@styles/globle.css';
import { lightTheme, theme } from '@core/theme';
import { queryClient } from '@core/utils/api';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import RouterApp from '@router';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { useEffect, useMemo } from 'react';
import { useSupabase, useUser } from '@core/store';
// Import the functions you need from the SDKs you need

function App() {
  const muiTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        palette: {
          mode: 'light',
          ...(lightTheme?.palette ?? {}),
        },
      }),
    []
  );

  const supabase = useSupabase((state) => state.supabase);
  const setSession = useUser((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <SnackbarProvider        
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          maxSnack={1}
        />
        <CssBaseline />
        <RouterApp />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
