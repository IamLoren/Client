import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { NavLink, Outlet } from "react-router-dom";

const ClientPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex-1 secondary-background secondary-text p-4">
        <nav className="flex flex-wrap px-[20px] py-[10px] mb-[10px]">
          <NavLink
            to="/client/settings"
            className={({ isActive }) =>
              `w-[124px] flex justify-center border border-blue-200 p-[10px] ${
                isActive ? "primary-background box-shadow" : ""
              }`
            }
          >
            Settings
          </NavLink>
          <NavLink
            to="/client/history"
            className={({ isActive }) =>
              `w-[124px] flex justify-center border border-blue-200 p-[10px] ${
                isActive ? "primary-background box-shadow" : ""
              }`
            }
          >
            Orders History
          </NavLink>
          <NavLink
            to="/client/favorites"
            className={({ isActive }) =>
              `w-[124px] flex justify-center border border-blue-200 p-[10px] ${
                isActive ? "primary-background box-shadow" : ""
              }`
            }
          >
            Favorites
          </NavLink>
          <NavLink
            to="/client/notifications"
            className={({ isActive }) =>
              `w-[124px] flex justify-center border border-blue-200 p-[10px] ${
                isActive ? "primary-background box-shadow" : ""
              }`
            }
          >
            Notifications
          </NavLink>
        </nav>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ClientPage;
