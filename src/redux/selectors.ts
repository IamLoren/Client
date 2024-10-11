import { RootState } from "./store";


export const isModalOpen = (state: RootState) => state.modal.isOpen; 
export const isSignUpForm = (state: RootState) => state.modal.isSignUpForm;
export const isSignInForm = (state: RootState) => state.modal.isSignInForm;
export const isLogoutForm = (state: RootState) => state.modal.isLogoutForm