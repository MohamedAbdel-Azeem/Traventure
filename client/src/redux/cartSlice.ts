import { createSlice } from "@reduxjs/toolkit";

interface ICart {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const initialState: { cart: ICart[] } = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!state.cart.some((item) => item._id === action.payload._id)) {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
