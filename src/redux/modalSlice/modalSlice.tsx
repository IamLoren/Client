import { createSlice } from "@reduxjs/toolkit";
import { StateType } from "./modalSliceTypes";

const initialState: StateType = {
  isOpen: false,
  isSignUpForm: false,
  isSignInForm: false,
  isLogoutForm: false,
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
    },
    openSignUpForm: (state: StateType) => {
      state.isSignUpForm = true;
    },
    openSignInForm: (state: StateType) => {
      state.isSignInForm = true;
    }
  },
});

export const { openModal, closeModal, openSignUpForm, openSignInForm } = modalSlice.actions;
export default modalSlice.reducer;
