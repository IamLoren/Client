import { createSlice } from "@reduxjs/toolkit";
import { StateType } from "./modalSliceTypes";

const initialState: StateType = {
  isOpen: false,
  isSignUpForm: false,
  isSignInForm: false,
  isLogoutForm: false,
  isRentalCarForm: false,
  isMobileMenuOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state: StateType) => {
      state.isOpen = true;
    },
    closeModal: (state: StateType) => {
      state.isOpen = false;
      state.isSignUpForm = false;
      state.isSignInForm = false;
      state.isLogoutForm = false;
      state.isRentalCarForm = false;
    },
    openSignUpForm: (state: StateType) => {
      state.isSignUpForm = true;
    },
    openSignInForm: (state: StateType) => {
      state.isSignInForm = true;
    },
    openLogoutForm: (state: StateType) => {
      state.isLogoutForm = true;
    },
    openMobailMenu: (state: StateType, {payload}) => {
      state.isMobileMenuOpen = payload;
    },
    openRentalCArForm: (state: StateType) => {
      state.isRentalCarForm = true;
    },
  },
});

export const {
  openModal,
  closeModal,
  openSignUpForm,
  openSignInForm,
  openLogoutForm,
  openMobailMenu,
  openRentalCArForm,
} = modalSlice.actions;
export default modalSlice.reducer;
