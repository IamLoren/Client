import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { closeModal } from "../../redux/modalSlice/modalSlice";
import {
  isLogoutForm,
  isModalOpen,
  isSignInForm,
  isSignUpForm,
} from "../../redux/selectors";
import SignUpForm from "../SignUpForm/SignUpForm";
import SignInForm from "../SignInForm/SignInForm";
import LogoutForm from "../LogoutForm/LogoutForm";
// import CustomToasts from "../CustomToasts/CustomToasts";

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSignUp = useAppSelector(isSignUpForm);
  const isSignIn = useAppSelector(isSignInForm);
  const isLogout = useAppSelector(isLogoutForm);

  const handleClose = () => {
    dispatch(closeModal());
  };
  const isModal = useAppSelector(isModalOpen);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isModal && ref.current) {
      ref.current.showModal();
      document.body.style.overflow = "hidden";
    } else if (ref.current) {
      ref.current.close();
      document.body.style.overflow = "auto";
    }
  }, [isModal]);

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <dialog ref={ref} onClick={handleClose}>
      <div
        className="fixed w-auto top-1/2 left-1/2 p-[30px] shadow-lg border border-gray-300 rounded-2xl primary-background transform -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="absolute top-[20px] right-[20px] outline-0"><MdOutlineClose /></button>
        {isSignUp && <SignUpForm />}
        {isSignIn && <SignInForm />}
        {isLogout && <LogoutForm />}
      </div>
    </dialog>,
    modalRoot
  );
};

export default Modal;
