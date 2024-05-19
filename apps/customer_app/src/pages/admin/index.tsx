/* eslint-disable react/jsx-key */
import { Button, Container, Grid, useTheme } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useSupabase, useUser } from '@core/store';
import { webRoutes } from '@core/routes';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppLayout } from '@core/ui/components';

export default function AdminHome() {
  const supabase = useSupabase((state) => state.supabase);
  const navigate = useNavigate();
  const session = useUser((state) => state.session);
  useEffect(() => {
    if (session?.access_token) {
      navigate(webRoutes.editableProducts);
    }
  }, [session]);

  const theme = useTheme();

  return (
    <AppLayout>
      <Container sx={{ minHeight: '100vh', overflow: 'hidden', backgroundColor: theme.palette.background.default }}>
        <Grid
          container
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ minHeight: '100vh' }}
        >
          <Button
            variant='outlined'
            startIcon={<GoogleIcon />}
            onClick={() => {
              supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                  redirectTo: `${window.location.origin}${webRoutes.admin}`,
                },
              });
            }}
            size='large'
          >
            Signin
          </Button>
        </Grid>
      </Container>
    </AppLayout>
  );
}
