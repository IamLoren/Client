import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { NavLink, Outlet } from "react-router-dom";

const ClientPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex-1 secondary-background p-4">
        <nav className="flex flex-wrap px-[20px] py-[10px] mb-[10px]">
          <NavLink
            to="/client/settings"
            className={({ isActive }) =>
              `w-[132px] flex filters-color justify-center border border-blue-200 p-[10px] ${
                isActive ? "primary-background box-shadow accent-text font-bold" : ""
              } hover:shadow-lg `
            }
          >
            Settings
          </NavLink>
          <NavLink
            to="/client/history"
            className={({ isActive }) =>
              `w-[132px] flex filters-color justify-center border border-blue-200 p-[10px] ${
                isActive ? "primary-background box-shadow accent-text font-bold" : ""
              } hover:shadow-lg`
            }
          >
            Orders History
          </NavLink>
          <NavLink
            to="/client/favorites"
            className={({ isActive }) =>
              `w-[132px] flex filters-color justify-center border border-blue-200 p-[10px] ${
                isActive ? "primary-background box-shadow accent-text font-bold" : ""
              } hover:shadow-lg`
            }
          >
            Favorites
          </NavLink>
          <NavLink
            to="/client/notifications"
            className={({ isActive }) =>
              `w-[128px] flex filters-color justify-center border border-blue-200 p-[10px] ${
                isActive ? "primary-background box-shadow accent-text font-bold" : ""
              } hover:shadow-lg `
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
