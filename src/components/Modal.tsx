import React from "react";
import ReactDOM from "react-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { closeModal } from "../redux/modalSlice/modalSlice";
import { isLogoutForm, isSignInForm, isSignUpForm } from "../redux/selectors";
import SignUpForm from "./SignUpForm/SignUpForm";
import SignInForm from "./SignInForm/SignInForm";
import LogoutForm from "./LogoutForm/LogoutForm";

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSignUp = useAppSelector(isSignUpForm);
  const isSignIn = useAppSelector(isSignInForm);
  const isLogout = useAppSelector(isLogoutForm);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 primary-background opacity z-[1]">
      <div className="fixed w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button onClick={handleClose}>Close</button>
        {isSignUp && <SignUpForm />}
        {isSignIn && <SignInForm />}
        {isLogout && <LogoutForm/>}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
