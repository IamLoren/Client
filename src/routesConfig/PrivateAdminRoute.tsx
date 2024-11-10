import {
  selectIsLogged,
  selectRole,
} from "../redux/selectors.js";
import React from "react";
import { useAppSelector } from "../hooks.js";
import NotAutorizedPage from "../pages/NotAutorizedPage.js";

const PrivateAdminRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLogedIn = useAppSelector(selectIsLogged);
  const role = useAppSelector(selectRole);

  return (
    <>
      {isLogedIn && role === "admin" && children}
      {!isLogedIn && <NotAutorizedPage />}
    </>
  );
};

export default PrivateAdminRoute;
