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
    resetCurrencyState: () => {
      console.log("resetting currency state");
      return initialState;
    },
  },
});

export const { setExchangeRate, resetCurrencyState } =
  exchangeRateSlice.actions;
export default exchangeRateSlice.reducer;
