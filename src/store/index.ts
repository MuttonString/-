import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import persistConfig from "./persistConfig"
import userSlice from "./userSlice"
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistedReducer = persistReducer(persistConfig, userSlice)

export const store = configureStore({
  reducer: {
    user: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)