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
        state.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state = state.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.length = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
