import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { selectRole } from "../../redux/selectors";

const Navigation: React.FC = () => {
  const role = useAppSelector(selectRole);

  return (
    <nav>
      <ul className="flex gap-3 accent-text font-bold">
        <li className="self-center">
          <NavLink to="/" className={({ isActive }) =>
              isActive ? 'block p-[15px] border-b-2 border-blue-500' : 'block p-[15px]'}>CATALOG</NavLink>
        </li>
        {role === "user" && (
          <li>
            <NavLink to="/client" className={({ isActive }) =>
              isActive ? 'block p-[15px] border-b-2 border-blue-500' : 'block p-[15px]'}>CLIENT PROFILE</NavLink>
          </li>
        )}
        {role === "admin" && (
          <li>
            <NavLink to="/admin" className={({ isActive }) =>
              isActive ? 'block p-[15px] border-b-2 border-blue-500' : 'block p-[15px]'}>Admin Panel</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
