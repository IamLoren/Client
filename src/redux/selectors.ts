import { RootState } from "./store";


export const isModalOpen = (state: RootState) => state.modal.isOpen; 
export const isSignUpForm = (state: RootState) => state.modal.isSignUpForm;
export const isSignInForm = (state: RootState) => state.modal.isSignInForm;
export const isLogoutForm = (state: RootState) => state.modal.isLogoutForm;
export const selectIsLogged = (state: RootState) => state.auth.isLogged;
export const selectRole = (state: RootState) => state.auth.user.role;