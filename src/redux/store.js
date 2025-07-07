import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { mainApi } from "@/lib/api/main-api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(mainApi.middleware),
});
