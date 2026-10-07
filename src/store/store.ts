import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/AuthSlice/authSlice";
import founderUsersReducer from "./features/FounderUsers/founderUsersSlice";
import founderReportsReducer from "./features/FounderReports/founderReportsSlice";
import founderWidgetsReducer from "./features/FounderWidgets/founderWidgetsSlice";
import founderProductsReducer from "./features/FounderProducts/founderProductsSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import baseApi from "./Api/BaseApi/BaseApi";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    founderUsers: founderUsersReducer,
    founderReports: founderReportsReducer,
    founderWidgets: founderWidgetsReducer,
    founderProducts: founderProductsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

// Define RootState and AppDispatch types
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
