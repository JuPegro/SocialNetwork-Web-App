import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </>
  );
};
