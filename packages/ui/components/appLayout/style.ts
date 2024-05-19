import type { SxProps } from '@mui/material';

interface AppLayoutStyleProps {
  [key: string]: SxProps;
}

export const appLayoutStyle: AppLayoutStyleProps = {
  rootSx: {},
  childrenSx: {
    backgroundColor: 'grey.100',
  },
};
