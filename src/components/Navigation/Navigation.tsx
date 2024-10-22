import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { selectRole } from "../../redux/selectors";

const Navigation: React.FC = () => {
  const role = useAppSelector(selectRole);

  return (
    <nav>
      <ul className="flex gap-3 font-bold">
        <li className="self-center">
          <NavLink to="/" className={({ isActive }) =>
             `border-b-2  ${isActive ? 'block p-[15px] border-blue-500' : 'block p-[15px] border-transparent'} navigation-color` }>CATALOG</NavLink>
        </li>
        {role === "user" && (
          <li>
            <NavLink to="/client/favorites" className={({ isActive }) =>
              `border-b-2 ${isActive ? 'block p-[15px] border-blue-500' : 'block p-[15px] border-transparent'} navigation-color` }>CLIENT PROFILE</NavLink>
          </li>
        )}
        {role === "admin" && (
          <li>
            <NavLink to="/admin" className={({ isActive }) =>
              `border-b-2 ${isActive ? 'block p-[15px] border-blue-500' : 'block p-[15px] border-transparent'} navigation-color` }>Admin Panel</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
