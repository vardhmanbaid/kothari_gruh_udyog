/* eslint-disable react/jsx-key */
import { ItemCard } from '@core/ui/atoms';
import { Container, Stack, LinearProgress, useTheme, TextField, IconButton, Fab } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useCart } from '@core/store';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@requests';
import { AppLayout } from '@core/ui/components';
import { useNavigate } from 'react-router-dom';
import { webRoutes } from '@core/routes';

export default function ItemList() {
  const [search, setSearch] = useState('');
  const divRef = useRef(null);
  const navigate = useNavigate();

  const { cart, setItemQuantity, addCartItem, removeCartItem } = useCart((state) => ({
    cart: state.cart,
    addCartItem: state.addCartItem,
    removeCartItem: state.removeCartItem,
    setItemQuantity: state.setItemQuantity,
  }));

  const theme = useTheme();

  const { isLoading, data, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['itemsCollection', { search }],
    fetchProducts,
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.itemsCollection.pageInfo.endCursor ?? false,
    }
  );

  const handleScroll = () => {
    if (divRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = divRef.current;
      if (scrollTop + clientHeight >= scrollHeight && hasNextPage) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    refetch();
  }, [search]);

  return (
    <AppLayout>
      <Container sx={{ height: '100vh', overflow: 'hidden', backgroundColor: theme.palette.background.default }}>
        <TextField
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px', // Elliptical border radius
              height: '2.5em',
            },
            'mt': 1,
            'mb': 1,
          }}
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder='search'
          InputProps={{
            startAdornment: <SearchIcon />,
            endAdornment: (
              <IconButton onClick={() => setSearch('')}>
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
        {(isLoading || isFetchingNextPage) && (
          <div style={{ paddingBottom: 5 }}>
            <LinearProgress />
          </div>
        )}
        <div
          style={{
            overflow: 'auto',
            height: '76vh',
          }}
          ref={divRef}
          onScroll={handleScroll}
        >
          <Stack direction={'column'} justifyContent={'flex-start'} spacing={1}>
            {data?.pages
              ?.map((i) => i.itemsCollection.edges)
              .flat()
              .map(({ node: item }: any) => (
                <ItemCard
                  key={item.id}
                  {...item}
                  cart={cart}
                  addCartItem={addCartItem}
                  removeCartItem={removeCartItem}
                  setItemQuantity={setItemQuantity}
                />
              ))}
          </Stack>
        </div>
        {Object.entries(cart).length > 0 && (
          <div
            style={{ position: 'relative' }}
            onClick={() => {
              navigate(webRoutes.cart);
            }}
          >
            <Fab
              variant='extended'
              color='primary'
              sx={{ position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)' }}
            >
              <ShoppingCartCheckoutIcon sx={{ mr: 1 }} />
              Checkout
            </Fab>
          </div>
        )}
      </Container>
    </AppLayout>
  );
}
