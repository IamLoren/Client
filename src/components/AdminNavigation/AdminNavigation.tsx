import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const AdminNavigation: React.FC = () => {
    const location = useLocation();
  return (
    <nav
      data-cy="internal navigation"
      className="h-min sm:h-auto sm:w-1/4 lg:w-1/5 xl:w-1/6 px-[20px] py-[10px] text-sm secondary-background"
    >
      <ul className="flex flex-wrap sm:flex-col ">
        <li>
          <Link
            to="/"
            className="block p-[10px] accent-text font-bold"
            aria-label="pass to home page"
          >
            LOGO
          </Link>
        </li>
        <li className="">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `w-[78px] sm:w-[100%] flex filters-color justify-center border-bottom p-[10px] ${
                isActive
                  ? "primary-background box-shadow accent-text font-bold"
                  : ""
              } hover:shadow-lg `
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          {" "}
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `w-[132px] sm:w-[100%] flex filters-color justify-center border-bottom p-[10px] ${
                isActive && location.pathname === "/admin"
                  ? "primary-background box-shadow accent-text font-bold"
                  : ""
              } hover:shadow-lg `
            }
          >
            Search pannel
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/history"
            className={({ isActive }) =>
              `w-[136px] sm:w-[100%] flex filters-color justify-center border-bottom p-[10px] ${
                isActive
                  ? "primary-background box-shadow accent-text font-bold"
                  : ""
              } hover:shadow-lg`
            }
          >
            Orders History
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/active"
            className={({ isActive }) =>
              `w-[132px] sm:w-[100%] flex filters-color justify-center border-bottom p-[10px] ${
                isActive
                  ? "primary-background box-shadow accent-text font-bold"
                  : ""
              } hover:shadow-lg`
            }
          >
            Active orders
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              `w-[132px] sm:w-[100%] flex filters-color justify-center border-bottom p-[10px] ${
                isActive
                  ? "primary-background box-shadow accent-text font-bold"
                  : ""
              } hover:shadow-lg`
            }
          >
            Analytics
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/schedules"
            className={({ isActive }) =>
              `w-[136px] sm:w-[100%] flex filters-color justify-center border-bottom p-[10px] ${
                isActive
                  ? "primary-background box-shadow accent-text font-bold"
                  : ""
              } hover:shadow-lg`
            }
          >
           Schedules
          </NavLink>
        </li>

        <li>
          {" "}
          <NavLink
            to="/admin/notifications"
            className={({ isActive }) =>
              `w-[136px] sm:w-[100%] flex filters-color justify-center border-bottom p-[10px] ${
                isActive
                  ? "primary-background box-shadow accent-text font-bold"
                  : ""
              } hover:shadow-lg `
            }
          >
            Notifications
          </NavLink>
        </li>

        <li>
          {" "}
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `w-[132px] sm:w-[100%] flex filters-color justify-center border-bottom p-[10px] ${
                isActive
                  ? "primary-background box-shadow accent-text font-bold"
                  : ""
              } hover:shadow-lg `
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
