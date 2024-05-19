import type { StandardTextFieldProps, SxProps, Theme } from '@mui/material';
import { TextField, Typography } from '@mui/material';

import { inputStyle } from './style';

export type InputProps = StandardTextFieldProps & {
  className?: string;
  sx?: SxProps<Theme>;
  helperText?: string;
  errorText?: string;
  errorMessage?: string;
  variant?: 'filled' | 'outlined' | 'standard';
};

export function Input(props: InputProps): JSX.Element {
  const { className = '', variant = 'outlined', helperText, errorText, errorMessage, sx = {}, ...rest } = props;

  return (
    <>
      <TextField
        sx={[
          {
            ...inputStyle.rootSx,
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        helperText={helperText}
        error={errorText && errorText?.length > 0 ? true : false}
        className={`${className}`}
        variant={variant}
        {...rest}
      />
      {errorText && errorText?.length > 0 && (
        <Typography sx={{ mt: 0.5 }} variant='caption' color='error'>
          {errorMessage}
        </Typography>
      )}
    </>
  );
}
