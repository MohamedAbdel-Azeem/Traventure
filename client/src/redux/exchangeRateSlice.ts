import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exchangeRate: 1.0,
  currentCurrency: "EGP",
};

const exchangeRateSlice = createSlice({
  name: "exchangeRate",
  initialState,
  reducers: {
    setExchangeRate(state, action) {
      state.exchangeRate = action.payload.rate;
      state.currentCurrency = action.payload.currency;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { setExchangeRate } = exchangeRateSlice.actions;
export default exchangeRateSlice.reducer;
