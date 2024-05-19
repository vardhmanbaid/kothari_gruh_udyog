import { useRouting } from '@core/store';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function RootLayout(): JSX.Element {
  const navigate = useNavigate();
  const route = useRouting((state) => state.route);

  useEffect(() => {
    if (route !== null) {
      navigate(route);
      setTimeout(() => {
        useRouting.setState({ route: null });
      }, 1000);
    }
  }, [route]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ height: '100vh', width: 'calc(100vh - 25%)' }}>
        <Outlet />
      </div>
    </Box>
  );
}

export { RootLayout };
