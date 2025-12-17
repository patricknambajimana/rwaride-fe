import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import "../api/authApi"; // inject auth endpoints
import "../api/vehiclesApi"; // inject vehicles endpoints
import "../api/ridesApi"; // inject rides endpoints
import "../api/passengerApi"; // inject passenger booking endpoints
import "../api/driverApi"; // inject driver endpoints
import authReducer from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
