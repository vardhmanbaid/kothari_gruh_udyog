/* eslint-disable react/jsx-key */
import { Avatar, Button, Paper, Stack, Typography, useTheme, Box } from '@mui/material';
import KGULogo from '@assets/just_logo.png';
import AamPappad from '@assets/Delicious.png';
import Bhujiya from '@assets/items/parsumal_bhujiya.jpg';
import Papad from '@assets/items/suman-papad.png';
import Loya from '@assets/items/loya.png';
import Fini from '@assets/fini.png';
import Nagarmal from '@assets/nagarmal.png';
import Carousel from 'react-material-ui-carousel';
import { FiPhoneCall } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { FaRupeeSign } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { webRoutes } from '@core/routes';
import { useNavigate } from 'react-router-dom';

const ProfileContact: Array<{ node: IconType; href: string }> = [
  {
    node: FiPhoneCall,
    href: `tel:+${import.meta.env.VITE_NAGARMAL_NUMBER}`,
  },
  { node: FaWhatsapp, href: `https://api.whatsapp.com/send?phone=${import.meta.env.VITE_NAGARMAL_NUMBER}` },
  { node: FaLocationDot, href: 'https://maps.app.goo.gl/6tpVpz4xqpmY883X6' },
  { node: FaRupeeSign, href: 'upi://pay?pa=vyapar.169688010748@hdfcbank&pn=Kothari%20Gruh%20Udyog&cu=INR' },
];

const carouselItems = [
  // AamPappad,
  Fini,
  Bhujiya,
  Papad,
  Loya,
];

export default function Home() {
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100vw' }}>
      <Stack spacing={0} justifyContent={'flex-start'}>
        <Stack direction={'row'} sx={{ backgroundColor: theme.palette.primary.main }} spacing={0}>
          <img src={KGULogo} style={{ height: 60 }} />
          <Typography sx={{ fontSize: '1.95em', mt: 2, color: '#fff' }} variant='h4'>
            {'Kothari Gruh Udyog'}
          </Typography>
        </Stack>
        <div>
          <Carousel
            animation='slide'
            interval={5500}
            duration={5000}
            swipe={false}
            indicators={false}
            fullHeightHover
            navButtonsAlwaysInvisible
          >
            {carouselItems.map((item: any, index: number) => (
              <Paper
                elevation={0}
                key={index + 1}
                sx={{ height: '45vh' }}
                onClick={() => {
                  navigate(webRoutes.itemList);
                }}
              >
                <img src={item} style={{ height: 'inherit', width: '100%', objectFit: 'fill' }} />
              </Paper>
            ))}
          </Carousel>
        </div>
        <Button
          fullWidth
          variant='contained'
          size='large'
          sx={{ borderRadius: 0 }}
          component='a'
          href={webRoutes.itemList}
        >
          Click to Place Order!
        </Button>
        <Paper elevation={0} sx={{ padding: 1, backgroundColor: 'transparent' }}>
          <Avatar
            alt='Nagarmal Kothari'
            src={Nagarmal}
            sx={{ width: 156, height: 156, mx: 'auto', mt: '-30', boxShadow: '0 0 10px 0 rgba(33, 150, 243, 0.7)' }}
          />
          <Typography sx={{ textAlign: 'center' }} variant='h5'>
            Nagarmal Kothari
          </Typography>
          <Stack direction={'row'} justifyContent={'center'} alignContent={'center'} sx={{ padding: 0.5 }}>
            {ProfileContact.map(({ node: Node, href }, index) => (
              <Button key={index + 1} component={'a'} href={href} target='_blank' disableFocusRipple disableRipple>
                <Node style={{ fontSize: 70 }} />
              </Button>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
