import type { SxProps } from '@mui/material';

interface LoginStyleProps {
  [key: string]: SxProps;
}

export const loginStyle: LoginStyleProps = {
  rootSx: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  cardContentSx: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 8px 69px #0000001A',
    borderRadius: '12px',
    px: 4,
    py: 5,
    width: '435px',
  },
  createPasswordSx: {
    fontSize: '20px',
    color: 'text.primary',
    textAlign: 'left',
    fontWeight: 600,
    py: 1.5,
  },
  inputGroupSx: {
    pt: 1.5,
    display: 'grid',
    gap: 1,
  },
  loginButtonSx: {
    textTransform: 'capitalize',
  },
};
