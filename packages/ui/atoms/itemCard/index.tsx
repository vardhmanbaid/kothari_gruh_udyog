import {
  SxProps,
  Theme,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Stack,
  Box,
} from '@mui/material';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import { CartStateProps, itemProps } from '@core/store/customer_app';

export interface ItemCardProps extends itemProps {
  className?: string;
  sx?: SxProps<Theme>;
  cart: CartStateProps;
  setItemQuantity?: (params: itemProps) => void;
  addCartItem?: (params: itemProps) => void;
  removeCartItem?: (params: itemProps) => void;
}

export function ItemCard(props: ItemCardProps): JSX.Element {
  const { className = '', sx = {}, cart, setItemQuantity, addCartItem, removeCartItem, ...rest } = props;
  const isOutOfStock = rest.is_out_of_stock;

  return (
    <Card
      className={`${className}`}
      sx={[
        {
          display: 'flex',
          borderRadius: 2,
          opacity: isOutOfStock ? 0.7 : 1,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      elevation={1}
    >
      <Box sx={{ position: 'relative', width: '35%' }}>
        <CardMedia
          component='img'
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = 'https://www.feed-image-editor.com/sites/default/files/perm/wysiwyg/image_not_available.png';
          }}
          image={
            rest?.image_src ??
            'https://www.feed-image-editor.com/sites/default/files/perm/wysiwyg/image_not_available.png'
          }
          alt={rest?.name}
          sx={{ width: '100%', opacity: isOutOfStock ? 0.7 : 1 }}
        />
        {isOutOfStock && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: 1,
            }}
          >
            <Typography variant='caption' noWrap>Out of Stock</Typography>
          </Box>
        )}
      </Box>
      <Stack direction='column' sx={{ flex: '1 0 auto' }}>
        <CardContent sx={{ flex: '1 0 auto', pt: 1, pb: 0, pl: 1, pr: 0 }}>
          <Typography variant='body2' component={'div'} sx={{ fontSize: '1.10em', fontWeight: 500 }}>
            {rest?.name}
          </Typography>
          <Typography variant='caption' color='text.secondary' component='div'>
            {rest?.categories?.name}
          </Typography>
          <Typography variant='subtitle1' component='div'>
            &#x20b9;{rest?.price}/{rest.base_uom}
          </Typography>
        </CardContent>
        {cart && (
          <Stack direction='row' alignItems={'center'} justifyContent={'flex-end'} sx={{ pl: 1, pb: 1 }}>
            <IconButton
              color='primary'
              onClick={() => {
                removeCartItem && removeCartItem({ ...rest, quantity: rest?.increment_by ?? 1 });
              }}
              disabled={isOutOfStock}
              disableRipple
              disableTouchRipple
              disableFocusRipple
            >
              <RemoveCircleSharpIcon />
            </IconButton>
            <TextField
              variant='outlined'
              sx={{ width: '5ch' }}
              value={cart[rest?.id!]?.quantity ?? 0}
              onChange={(event) => {
                let { value } = event.target;
                setItemQuantity && setItemQuantity({ ...rest, quantity: Number(value) });
              }}
              disabled={isOutOfStock}
              inputProps={{ sx: { textAlign: 'center' } }}
              type='number'
              size='small'
            />
            <IconButton
              color='primary'
              onClick={() => {
                addCartItem && addCartItem({ ...rest, quantity: rest?.increment_by ?? 1 });
              }}
              disabled={isOutOfStock}
              disableRipple
              disableTouchRipple
              disableFocusRipple
            >
              <AddCircleSharpIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
