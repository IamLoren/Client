import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  openModal,
  openSignInForm,
  openSignUpForm,
} from "../../redux/modalSlice/modalSlice";
import { selectIsLogged, selectRole } from "../../redux/selectors";
import Navigation from "../Navigation/Navigation";
import Container from "../Container/Container";
import { Link, useLocation } from "react-router-dom";
import UserPanel from "../UserPanel/UserPanel";
import Button from "../Button/Button";
import useResponsive from "../../hooks";
import FiltersMobileMenu from "../FiltersMobileMenu/FiltersMobileMenu";

const Header: React.FC = () => {
  const { isMobile, isSM, isTablet } = useResponsive();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(selectIsLogged);
  const userRole = useAppSelector(selectRole);

  const handleClickREgister = () => {
    dispatch(openModal());
    dispatch(openSignUpForm());
  };

  const handleClickLogin = () => {
    dispatch(openModal());
    dispatch(openSignInForm());
  };

  return (
    <header className={`sticky z-10 top-0 primary-background p-4 primary-text ${userRole=== "user" ? "box-shadow" : ""} `}>
      <Container addStyles="flex justify-between">
        <Link to="/" className="block p-[15px] accent-text font-bold" aria-label='pass to home page'>
          LOGO
        </Link>
        {isMobile && location.pathname === "/" && <FiltersMobileMenu />}
        {isSM && location.pathname === "/" && <FiltersMobileMenu />}
        {!isLogged && (
          <div className="flex gap-[20px]">
            <Button
              type="button"
              buttonName="SIGN UP"
              onClick={handleClickREgister}
            ></Button>
            <Button
              type="button"
              buttonName="SIGN IN"
              onClick={handleClickLogin}
            ></Button>
          </div>
        )}
        {isTablet && isLogged && (userRole=== "user" || (userRole === "admin" && location.pathname === "/"))  &&  <Navigation />}
        {isLogged && (userRole=== "user" || (userRole === "admin" && location.pathname === "/"))  &&  <UserPanel />}
      </Container>
    </header>
  );
};

export default Header;
