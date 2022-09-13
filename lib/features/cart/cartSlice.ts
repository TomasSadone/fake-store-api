import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState =
  | {
      products: CartProduct[];
      openOverlay: boolean;
    }
  | { products: any[]; openOverlay: boolean };

export type CartProduct = {
  id: number;
  quantity: number;
  title: string;
  price: string;
  image: string;
};

const initialState: CartState = {
  products: [],
  openOverlay: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addNewProduct: (state, action: PayloadAction<CartProduct>) => {
      state.products.push(action.payload);
    },
    addItem: (state, action: PayloadAction<CartProduct>) => {
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      item.quantity++;
    },
    removeItem: (state, action: PayloadAction<CartProduct>) => {
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      item.quantity--;
    },
    removeProduct: (state, action: PayloadAction<CartProduct>) => {
      const remainingProducts = state.products.filter((product) => {
        return product.id !== action.payload.id;
      });

      state.products = remainingProducts;
    },
    toggleOverlay: (state, action: PayloadAction<boolean>) => {
      state.openOverlay = action.payload;
    },
  },
});

export const {
  addNewProduct,
  removeProduct,
  addItem,
  removeItem,
  toggleOverlay,
} = cartSlice.actions;

export default cartSlice.reducer;
