// import CrayondLogo from '@assets/crayondLogo.png';
import { Button } from '@atoms/button';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import type { SxProps, Theme } from '@mui/material';
import { Avatar, Box, Typography } from '@mui/material';
import isEqual from 'react-fast-compare';

import { loginStyle } from './style';

export interface LoginProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export function Login(props: LoginProps): JSX.Element {
  const { className = '', sx = {}, ...rest } = props;

  // const { user, signIn, loading, handleLoginChange } = useOnboarding(
  //   (state) => ({
  //     signIn: state.signIn,
  //     user: state.userState,
  //     handleLoginChange: state.handleLoginChange,
  //     loading: state.loading,
  //   }),
  //   (prev, curr) => isEqual(prev, curr)
  // );

  return (
    <Box
      sx={[
        {
          ...loginStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={loginStyle.cardContentSx}>
        {/* <Avatar src={CrayondLogo} sx={{ width: 44, height: 44, ml: -1 }} /> */}
        <Typography sx={loginStyle.createPasswordSx}>Welcome</Typography>
        <Box sx={loginStyle.inputGroupSx}>
          <Label htmlFor='username'>Username</Label>
          <Input
            size='small'
            // value={user?.username ?? ''}
            // id='username'
            // errorText={user?.error.username ?? false}
            // helperText={user?.error.username}
            // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            //   handleLoginChange('username', e.target.value)
            // }
          />
        </Box>
        <Box sx={loginStyle.inputGroupSx}>
          <Label htmlFor='password' isRequired>
            password
          </Label>
          <Input
            id='password'
            type={'password'}
            // errorText={user?.error.password ?? ''}
            // errorMessage={user?.error.password}
            // value={user?.password ?? ''}
            size='small'
          />
        </Box>
        <Box sx={{ mt: 3, display: 'grid', gap: 3 }}>
          {/* <Button fullWidth sx={loginStyle.loginButtonSx} onClick={() => signIn()} loading={loading}>
            login
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
}
