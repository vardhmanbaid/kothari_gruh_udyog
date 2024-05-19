import type { FormLabelProps, SxProps, Theme } from '@mui/material';
import { FormLabel, Typography } from '@mui/material';

import { labelStyle } from './style';

export interface LabelProps extends FormLabelProps {
  sx?: SxProps<Theme>;
  className?: string;
  children?: string;
  isRequired?: boolean;
}

export function Label(props: LabelProps): JSX.Element {
  const { className = '', children, isRequired, htmlFor, sx = {}, ...rest } = props;

  return (
    <FormLabel
      sx={[
        {
          ...labelStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      htmlFor={htmlFor}
      className={`${className}`}
      {...rest}
    >
      {children}
      {isRequired && (
        <Typography color='error' variant='caption'>
          &nbsp;*
        </Typography>
      )}
    </FormLabel>
  );
}
