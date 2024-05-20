/* eslint-disable react/jsx-key */
import { itemProps } from '@core/store';
import {
  Grid,
  Card,
  Stack,
  Box,
  Typography,
  IconButton,
  LinearProgress,
  TextField,
  Dialog,
  Slide,
  useTheme,
  Chip,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useEffect, useRef, useState, forwardRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { UpsertProduct } from './upsert';
import { fetchCategories, fetchProducts } from '@requests';
import { AppLayout } from '@core/ui/components';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function Products() {
  const [open, setOpen] = useState<boolean>(false);
  const [item, setItem] = useState<itemProps>({} as itemProps);
  const [search, setSearch] = useState('');
  const divRef = useRef(null);

  const handleOpen = (item: itemProps) => {
    setItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    refetch();
    setOpen(false);
  };

  const { data: categories } = useQuery(['categories'], fetchCategories);

  const { isLoading, data, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['itemsCollection', { search, is_admin: true }],
    fetchProducts,
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.itemsCollection.pageInfo.endCursor ?? false,
    }
  );

  const handleScroll = () => {
    if (divRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = divRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 200 && hasNextPage) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    refetch();
  }, [search]);

  const theme = useTheme();

  return (
    <AppLayout
      sx={{
        height: '100%',
      }}
      childrenWrapperProps={{
        sx: {
          p: 2,
          height: '90%',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <>
        <Stack direction='row' spacing={1} sx={{ mb: 1 }}>
          <TextField
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '50px', // Elliptical border radius
                height: '2.5em',
              },
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
          <IconButton
            color='primary'
            disableFocusRipple
            disableRipple
            onClick={() => {
              handleOpen({} as itemProps);
            }}
          >
            <AddCircleOutlineSharpIcon />
          </IconButton>
        </Stack>
        <Box sx={{ mb: 2 }}>{(isLoading || isFetchingNextPage) && <LinearProgress />}</Box>
        <Grid
          container
          spacing={1}
          sx={{
            height: 'calc(var(--vh, 1vh) * 82)',
            overflow: 'auto',
          }}
          ref={divRef}
          onScroll={handleScroll}
        >
          {data?.pages
            ?.map((i) => i.itemsCollection.edges)
            .flat()
            .map(({ node: product }: any) => (
              <Grid item key={product.id} xs={6} sm={3} md={2}>
                <Card
                  onClick={() => {
                    handleOpen(product as itemProps);
                  }}
                >
                  <Box sx={{ pt: '100%', position: 'relative' }}>
                    <Box
                      component='img'
                      alt={product.name}
                      src={
                        product.image_src ??
                        'https://www.feed-image-editor.com/sites/default/files/perm/wysiwyg/image_not_available.png'
                      }
                      sx={{
                        top: 0,
                        width: 1,
                        height: 1,
                        objectFit: 'cover',
                        position: 'absolute',
                      }}
                    />
                    <Chip
                      label={product?.is_active ? 'Active' : 'Disabled'}
                      sx={{ position: 'absolute', top: 15, right: 10 }}
                      variant='filled'
                      color={product?.is_active ? 'primary' : 'error'}
                    />
                  </Box>
                  <Stack spacing={0} sx={{ p: 1 }}>
                    <Typography variant='body1' component={'div'} sx={{ fontWeight: 500 }}>
                      {product.name}
                    </Typography>
                    <Typography variant='caption' component={'div'}>
                      {product.categories.name}
                    </Typography>
                    <Stack spacing={0} direction='row' alignItems='center' justifyContent='flex-end'>
                      <Typography variant='subtitle2'>
                        &#x20b9;{product?.price}/{product.base_uom}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
          <UpsertProduct item={item} setItem={setItem} categories={categories} handleClose={handleClose} />
        </Dialog>
      </>
    </AppLayout>
  );
}
