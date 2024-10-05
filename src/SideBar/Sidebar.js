import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BiUser,
  BiBuildingHouse,
  BiGlobe,
  BiCategory,
  BiListPlus,
  BiHome,
  BiSolidOffer,
} from "react-icons/bi";
import "../SideBar/sidebar.css";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(null);

  return (
    <div className="menu">
      <div className="logo">
        <BiHome className="logo-icon" />{" "}
        {/* Changed to a home icon for general admin area */}
        <h2>Espace Admin</h2>
      </div>
      <div className="menu--list">
        <Link
          to="/users"
          className={`item ${activeLink === "/users" ? "active" : ""}`}
          onClick={() => setActiveLink("/users")}
        >
          <BiUser className="icon" />
          Gestion utilisateurs
        </Link>
        <Link
          to="/cities"
          className={`item ${activeLink === "/cities" ? "active" : ""}`}
          onClick={() => setActiveLink("/cities")}
        >
          <BiBuildingHouse className="icon" />
          Gestion villes
        </Link>
        <Link
          to="/regions"
          className={`item ${activeLink === "/regions" ? "active" : ""}`}
          onClick={() => setActiveLink("/regions")}
        >
          <BiGlobe className="icon" />
          Gestion regions
        </Link>
        <Link
          to="/categories"
          className={`item ${activeLink === "/categories" ? "active" : ""}`}
          onClick={() => setActiveLink("/categories")}
        >
          <BiCategory className="icon" />
          Gestion categories
        </Link>
        <Link
          to="/options"
          className={`item ${activeLink === "/options" ? "active" : ""}`}
          onClick={() => setActiveLink("/options")}
        >
          <BiListPlus className="icon" />
          Gestion options
        </Link>
        <Link
          to="/offers"
          className={`item ${activeLink === "/offers" ? "active" : ""}`}
          onClick={() => setActiveLink("/offers")}
        >
          <BiSolidOffer className="icon" />
          Gestion offres
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
