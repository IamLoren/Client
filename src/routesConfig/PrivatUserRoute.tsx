import { useSelector } from "react-redux";
import { selectIsLogged, selectRole } from "../redux/selectors.js";
import React from "react";
import {  useAppSelector } from "../hooks.js";
import NotAutorizedPage from "../pages/NotAutorizedPage.js";

const PrivateUserRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLogedIn = useSelector(selectIsLogged);
  const role = useAppSelector(selectRole);

    return (
        <>
         {isLogedIn && role === "user" && children}
        {!isLogedIn && <NotAutorizedPage/>}
        </>
    );
};

export default PrivateUserRoute;
