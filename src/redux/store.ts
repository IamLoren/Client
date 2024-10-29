import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice/authSlice";
import modalReducer from './modalSlice/modalSlice';
import { carRentalReducer } from "./carRentalSlice/carRentalSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
    cars: carRentalReducer,
  });

export const store = configureStore({
  reducer: rootReducer,
});

// NOTE: source - https://www.cypress.io/blog/testing-redux-store
// expose store when run in Cypress
if ((window as any).Cypress) {
  (window as any).store = store;
}
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
