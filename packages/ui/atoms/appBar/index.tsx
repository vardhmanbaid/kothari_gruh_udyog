import KGULogo from '@assets/just_logo.png';
import { useCart, useSupabase, useUser } from '@core/store';
import { Avatar, Badge, IconButton, Menu, MenuItem, SxProps, Theme, Typography } from '@mui/material';
import MUIAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import { appBarStyle } from './style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webRoutes } from '@core/routes';

export interface AppBarProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export function AppBar(props: AppBarProps): JSX.Element {
  const { className = '', sx = {}, ...rest } = props;

  const session = useUser((state) => state.session);
  const cart = useCart((state) => state.cart);
  const supabase = useSupabase((state) => state.supabase);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={[
        {
          ...appBarStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <MUIAppBar position='static'>
        <Toolbar>
          <Avatar src={KGULogo} sx={{ mr: 0 }} />
          <Typography variant='h6' component='div' sx={{ mt: 2, flexGrow: 1 }}>
            {'Kothari Gruh Udyog'}
          </Typography>
          <div
            onClick={() => {
              navigate(webRoutes.cart);
            }}
          >
            <Badge badgeContent={Object.keys(cart ?? {})?.length} color='secondary'>
              <ShoppingCartSharpIcon />
            </Badge>
          </div>
          {session && (
            <Box sx={{ display: 'flex', gap: 3, placeItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 1, placeItems: 'center' }}>
                <IconButton
                  onClick={handleClick}
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar src={session?.user?.user_metadata?.avatar_url} />
                </IconButton>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      'overflow': 'visible',
                      'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      'mt': 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem
                    onClick={() => {
                      supabase.auth.signOut().then(() => {
                        handleClose();
                        navigate(webRoutes.admin);
                      });
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          )}
        </Toolbar>
      </MUIAppBar>
    </Box>
  );
}
