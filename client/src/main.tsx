import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import exchangeRateReducer from "./redux/exchangeRateSlice.ts";
import cartReducer from "./redux/cartSlice.ts";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { CookieStorage } from "redux-persist-cookie-storage"; // Correct import
import Cookies from "js-cookie";
import { combineReducers } from "redux";

// Persist configuration
const persistConfig = {
  key: "root",
  storage: new CookieStorage(Cookies, {
    expiration: {
      default: 3600, // 1 hour in seconds
    },
  }),
};

// Combine reducers
const rootReducer = combineReducers({
  exchangeRate: exchangeRateReducer,
  cart: cartReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
