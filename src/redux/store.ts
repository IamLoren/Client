import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice/authSlice";
import modalReducer from './modalSlice/modalSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
  });

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
