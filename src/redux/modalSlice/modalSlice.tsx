import { createSlice } from "@reduxjs/toolkit";
import { StateType } from "./modalSliceTypes";

const initialState: StateType = {
  isOpen: true,
  isSignUpForm: true,
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
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
