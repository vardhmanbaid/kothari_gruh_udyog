import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import type { SxProps, Theme } from '@mui/material';

import { buttonStyle } from './style';

export interface ButtonProps extends LoadingButtonProps {
  children?: string;
  sx?: SxProps<Theme>;
  className?: string;
}

function Button(props: ButtonProps): JSX.Element {
  const { className = '', sx = {}, children = '', variant = 'contained', loading = false, ...rest } = props;

  return (
    <LoadingButton
      loading={loading}
      variant={variant}
      sx={[
        {
          ...buttonStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      {children}
    </LoadingButton>
  );
}

export { Button };
