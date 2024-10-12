import { createSlice } from "@reduxjs/toolkit";
import { StateType } from "./modalSliceTypes";

const initialState: StateType = {
  isOpen: true,
  isSignUpForm: false,
  isSignInForm: false,
  isLogoutForm: true,
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
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
