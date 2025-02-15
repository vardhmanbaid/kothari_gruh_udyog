import type { SxProps } from '@mui/material';

interface AppLayoutStyleProps {
  [key: string]: SxProps;
}

export const appLayoutStyle: AppLayoutStyleProps = {
  rootSx: {
    width: '100vw',
  },
  childrenSx: {
    backgroundColor: 'grey.100',
  },
};
