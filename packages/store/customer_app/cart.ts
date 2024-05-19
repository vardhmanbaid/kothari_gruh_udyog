import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface categoryProps {
  id: string | number;
  name: string;
  inputValue?: string;
}

export interface itemProps {
  id: string | number;
  name: string;
  image_src: string;
  price: number;
  quantity?: number;
  base_uom: string;
  increment_by?: number;
  is_active?: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
  category_id?: any;
  categories: categoryProps;
}

export interface CartStateProps {
  [key: string | number]: itemProps;
}

export interface CartProps {
  cart: CartStateProps;
  lastUpdatedOn: Date;
  setItemQuantity: (params: itemProps) => void;
  addCartItem: (params: itemProps) => void;
  removeCartItem: (params: itemProps) => void;
  clearCart: () => void;
}

export const useCart = create<CartProps>()(
  persist(
    (set, get) => ({
      cart: {},
      lastUpdatedOn: new Date(),
      setItemQuantity: ({ id, quantity, ...rest }: itemProps) => {
        let { cart } = get();
        cart[id] = {
          ...rest,
          id,
          quantity,
        };
        set({
          cart,
          lastUpdatedOn: new Date(),
        });
        enqueueSnackbar(`${rest?.name} quantity updated to ${quantity ?? 0}`, { variant: 'success' });
      },
      addCartItem: ({ id, quantity, ...rest }: itemProps) => {
        let { cart } = get();
        cart[id] = {
          ...rest,
          id,
          quantity: (cart[id]?.quantity ?? 0) + quantity!,
        };
        set({
          cart,
          lastUpdatedOn: new Date(),
        });
        enqueueSnackbar(`${rest?.name} quantity increased to ${cart[id]?.quantity}`, { variant: 'success' });
      },
      removeCartItem: ({ id, quantity, ...rest }: itemProps) => {
        let { cart } = get();
        if (cart[id]?.quantity! > 0) {
          cart[id] = {
            ...cart[id],
            quantity: cart[id]?.quantity! - quantity!,
          };
        }
        if (cart[id]?.quantity! == 0) {
          delete cart[id];
        }
        set({
          cart,
          lastUpdatedOn: new Date(),
        });
        enqueueSnackbar(`${rest?.name} quantity reduced to ${cart[id]?.quantity ?? 0}`, { variant: 'success' });
      },
      clearCart: () => {
        set({
          cart: {},
          lastUpdatedOn: new Date(),
        });
      },
    }),
    {
      name: 'cart',
    }
  )
);
