import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Payload } from "recharts/types/component/DefaultLegendContent";

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock: number;
}

const initialState: IProduct[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      if (!state.some((item) => item._id === action.payload._id)) {
        const addedProduct = {
          ...action.payload,
          quantity: 1,
          stock: action.payload.quantity - 1,
        };
        state.push(addedProduct);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const newProducts = state.filter((item) => item._id !== action.payload);
      return newProducts;
    },
    clearCart: (state) => {
      return initialState;
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.find((item) => item._id === action.payload);
      if (!product) return;
      if (product.stock === 0) return;
      const newProduct = {
        ...product,
        quantity: product.quantity + 1,
        stock: product.stock - 1,
      };
      const newProducts = state.map((item) =>
        item._id === action.payload ? newProduct : item
      );
      return newProducts;
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.find((item) => item._id === action.payload);
      if (!product) return;
      const newProduct = {
        ...product,
        quantity: product.quantity - 1,
        stock: product.stock + 1,
      };
      const newProducts = state.map((item) =>
        item._id === action.payload ? newProduct : item
      );
      return newProducts;
    },
    resetState: () => {
      return initialState;
    },
  },
  
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  resetState
} = cartSlice.actions;
export default cartSlice.reducer;
