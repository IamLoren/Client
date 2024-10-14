import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { selectRole } from "../../redux/selectors";

const Navigation: React.FC = () => {
  const role = useAppSelector(selectRole);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Catalog</NavLink>
        </li>
        {role === "user" && (
          <li>
            <NavLink to="/client">Client Profile</NavLink>
          </li>
        )}
        {role === "admin" && (
          <li>
            <NavLink to="/admin">Admin Panel</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
