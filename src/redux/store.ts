import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice/authSlice";

export const store = configureStore({
    reducer: authReducer,
})


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']