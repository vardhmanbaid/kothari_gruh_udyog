import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
  createFilterOptions,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { Dispatch, SetStateAction, forwardRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ItemCard } from '@core/ui/atoms';
import { itemProps, useSupabase } from '@core/store';
import { ItemCardProps } from '@core/ui/atoms/itemCard';
import { enqueueSnackbar } from 'notistack';

const filter = createFilterOptions<any>();

interface upsertProps {
  handleClose: () => void;
  categories: Array<any>;
  item: itemProps;
  setItem: Dispatch<SetStateAction<itemProps>>;
}

export const UpsertProduct = (props: upsertProps) => {
  let { item, setItem, categories, handleClose } = props;
  const supabase = useSupabase((state) => state.supabase);

  const modifyItem = (event: React.ChangeEvent | SelectChangeEvent<typeof item.category_id>) => {
    let { id, name, value } = event.target as any;
    if (id == 'is_active') {
      value = !item.is_active;
    }
    if (!id) id = name;
    setItem({
      ...item,
      [id]: value,
    });
  };

  const saveData = async () => {
    try {
      let { categories, ...rest } = item;
      if (categories.inputValue) {
        let { data, error } = await supabase.from('categories').insert({ name: categories.inputValue }).select();
        if (error) throw error;
        if (data && data.length) {
          rest.category_id = data[0].id;
        }
      } else {
        rest.category_id = categories.id;
      }
      if (rest.id) {
        await supabase
          .from('items')
          .update([{ ...rest }])
          .eq('id', rest.id)
          .select();
      } else {
        await supabase
          .from('items')
          .insert([{ ...rest }])
          .select();
      }
      enqueueSnackbar(`${item.name} is ${item.id ? 'edited' : 'added'} successfully!`, { variant: 'success' });
      handleClose();
    } catch (err) {
      console.log(err);
      enqueueSnackbar(`Something went wrong!`, { variant: 'error' });
    }
  };

  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }}>{item.id ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <Switch
        sx={{
          position: 'absolute',
          right: 50,
          top: 12,
        }}
        checked={item?.is_active}
        id={'is_active'}
        onChange={modifyItem}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <IconButton
        aria-label='close'
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Stack spacing={2} p={1}>
          <TextField id='name' label='Name' required fullWidth value={item?.name} onChange={modifyItem} />
          <Autocomplete
            value={item?.categories?.name ?? ''}
            onChange={(_, newValue) => {
              setItem({
                ...item,
                categories: newValue,
              });
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some((option) => inputValue === option.name);
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  name: `Add "${inputValue}"`,
                });
              }
              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id='category_id'
            options={categories ?? []}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.name;
            }}
            renderOption={({ key, ...rest }: any, option) => (
              <li key={key} {...rest}>
                {option.name}
              </li>
            )}
            fullWidth
            freeSolo
            renderInput={(params) => <TextField {...params} label='Category' />}
          />
          <TextField id='price' label='Price' required fullWidth value={item?.price} onChange={modifyItem} />
          <TextField id='base_uom' label='UOM' required fullWidth value={item?.base_uom} onChange={modifyItem} />
          <TextField
            id='image_src'
            label='ImageLink'
            required
            fullWidth
            value={item?.image_src ?? ''}
            onChange={modifyItem}
          />
          <Divider />
          <Typography>Preview</Typography>
          <ItemCard {...(item as ItemCardProps)} />
          <Divider />
        </Stack>
      </DialogContent>
      <DialogActions>
        {/* {isLoading && <CircularProgress />} */}
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant='contained' type='submit' onClick={saveData}>
          Submit
        </Button>
      </DialogActions>
    </>
  );
};
