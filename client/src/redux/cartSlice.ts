import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Payload } from "recharts/types/component/DefaultLegendContent";

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const initialState: IProduct[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      if (!state.some((item) => item._id === action.payload._id)) {
        const addedProduct = { ...action.payload, quantity: 1 };
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
    changeQuantity: (state, action: PayloadAction<Payload>) => {
      const { id, quantity } = action.payload;
      const product = state.find((product) => product._id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
