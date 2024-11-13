import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import exchangeRateReducer from "./redux/exchangeRateSlice.ts";
import cartReducer from "./redux/cartSlice.ts";

const store = configureStore({
  reducer: {
    exchangeRate: exchangeRateReducer,
    cart: cartReducer,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
