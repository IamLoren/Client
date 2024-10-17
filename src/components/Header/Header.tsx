import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  openModal,
  openSignInForm,
  openSignUpForm,
} from "../../redux/modalSlice/modalSlice";
import { selectIsLogged } from "../../redux/selectors";
import Navigation from "../Navigation/Navigation";
import Container from "../Container/Container";
import { Link } from "react-router-dom";
import UserPanel from "../UserPanel/UserPanel";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(selectIsLogged);

  const handleClickREgister = () => {
    dispatch(openModal());
    dispatch(openSignUpForm());
  };

  const handleClickLogin = () => {
    dispatch(openModal());
    dispatch(openSignInForm());
  };

  return (
    <header className="sticky z-10 top-0 primary-background p-4 primary-text">
      <Container addStyles="flex justify-between">
        <Link to="/" className="block p-[15px] accent-text font-bold">LOGO</Link>  
        {!isLogged && (
          <button onClick={handleClickREgister}>зареєструватися</button>
        )}{" "}
        <br />
        {!isLogged && <button onClick={handleClickLogin}>залогінитися</button>}
        {isLogged && <Navigation />}
        {isLogged && <UserPanel />}
      </Container>
    </header>
  );
};

export default Header;
