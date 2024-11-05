import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice/authSlice";
import modalReducer from './modalSlice/modalSlice';
import { carRentalReducer } from "./carRentalSlice/carRentalSlice";
import { ordersReducer } from "./ordersSlice/ordersSlice";
import { adminReducer } from "./adminSlice/adminSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
    cars: carRentalReducer,
    orders: ordersReducer,
    admin: adminReducer,
  });

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
