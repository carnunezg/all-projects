import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/Menu.css";

const Menu = () => {
  const location = useLocation();

  return (
    <>
      <nav className="menu">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Inicio
        </Link>
        <Link
          to="/contacto"
          className={location.pathname === "/contacto" ? "active" : ""}
        >
          Contacto
        </Link>
      </nav>
    </>
  );
};

export default Menu;
