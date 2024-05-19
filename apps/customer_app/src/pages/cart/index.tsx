/* eslint-disable react/jsx-key */
import { ItemCard } from '@core/ui/atoms';
import {
  Container,
  Stack,
  Card,
  IconButton,
  CardContent,
  Typography,
  Button,
  TextField,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '@core/store';
import { useNavigate } from 'react-router-dom';
import { webRoutes } from '@core/routes';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { AppLayout } from '@core/ui/components';

export default function Cart() {
  const navigate = useNavigate();

  const [address, setAddress] = useState<string | null>();

  const { cart, setItemQuantity, addCartItem, removeCartItem, clearCart } = useCart((state) => ({
    cart: state.cart,
    addCartItem: state.addCartItem,
    removeCartItem: state.removeCartItem,
    setItemQuantity: state.setItemQuantity,
    clearCart: state.clearCart,
  }));

  let totalPrice = Object.entries(cart)
    .map(([_, item]: any) => item?.price * (item?.quantity ?? 0))
    .reduce((p, c) => {
      return (p += c);
    }, 0);

  const placeOrder = () => {
    if (totalPrice <= 0) {
      enqueueSnackbar('Cart is empty,Please add!', { variant: 'warning' });
      return;
    }
    if (!address) {
      enqueueSnackbar('Address is required', { variant: 'error' });
      return;
    }
    const whatsappApiUrl = 'https://api.whatsapp.com/send';
    let orderMessage = Object.entries(cart)
      .map(
        ([_, value]: any) =>
          `----------------------------\n*${value?.name}* @ *₹${value.price}/${value.base_uom}*\nQuantity : *${value.quantity}*\nTotal: *₹${value.price * value.quantity}/-*\n`
      )
      .join('');
    let orderParams = new URLSearchParams({
      phone: address.toLowerCase().includes('erode')
        ? import.meta.env.VITE_SUNITA_NUMBER
        : import.meta.env.VITE_NAGARMAL_NUMBER,
      text: `${orderMessage}\nTotal Price: *₹${totalPrice}/-*\n\nDeliver @ \n ${address}`,
    });
    // Construct the complete WhatsApp URL
    const whatsappUrl = `${whatsappApiUrl}?${orderParams.toString()}`;
    // Clear cart
    clearCart();
    // Open the WhatsApp URL in a new tab
    window.open(whatsappUrl, '_blank');
    // Return to home page
    window.location.href = webRoutes.home;
  };

  const theme = useTheme();

  return (
    <AppLayout>
      <Container sx={{ minHeight: '100vh', overflow: 'hidden', backgroundColor: theme.palette.background.default }}>
        <Stack direction={'column'} justifyContent={'space-between'} spacing={1}>
          <Stack direction={'row'} justifyContent={'flex-start'}>
            <IconButton
              aria-label='delete'
              disableFocusRipple
              disableRipple
              onClick={() => {
                navigate(webRoutes.itemList);
              }}
            >
              <ArrowBackIcon />
              Back
            </IconButton>
          </Stack>
          <div
            style={{
              overflow: 'auto',
              height: '45vh',
              padding: 5,
            }}
          >
            <Stack direction={'column'} justifyContent={'flex-start'} spacing={1}>
              {Object.entries(cart).map(([key, cartItem]: any) => (
                <ItemCard
                  key={key}
                  {...cartItem}
                  cart={cart}
                  addCartItem={addCartItem}
                  removeCartItem={removeCartItem}
                  setItemQuantity={setItemQuantity}
                />
              ))}
            </Stack>
          </div>
          <Stack spacing={1}>
            <Card>
              <CardContent>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Typography variant='h6'>Total</Typography>
                  <Typography variant='h6'>&#x20b9;{totalPrice}/-</Typography>
                </Stack>
              </CardContent>
            </Card>
            <TextField
              label='Address'
              fullWidth
              required
              multiline
              minRows={2}
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
            <Button variant='contained' fullWidth onClick={placeOrder} size='large'>
              Place Order
            </Button>
          </Stack>
        </Stack>
      </Container>
    </AppLayout>
  );
}
