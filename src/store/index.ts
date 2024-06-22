import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import persistConfig from "./persistConfig"
import userSlice from "./userSlice"

const persistedReducer = persistReducer(persistConfig, userSlice)

export const store = configureStore({
  reducer: {
    user: persistedReducer
  }
})

export const persistor = persistStore(store)