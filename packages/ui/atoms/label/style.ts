import type { SxProps } from '@mui/material';

interface LabelStyleProps {
  [key: string]: SxProps;
}

export const labelStyle: LabelStyleProps = {
  rootSx: {
    fontSize: 12,
    textAlign: 'left',
    letterSpacing: 0,
    textTransform: 'capitalize',
    color: 'text.label',
  },
};
