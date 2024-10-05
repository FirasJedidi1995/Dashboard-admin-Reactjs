import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../images/dar.png";

const Navbar = () => {
  return (
    <nav className="navbar" style={{ backgroundColor: "#0E0E0E" }}>
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </div>
      <div className="navbar-links">
        <Link
          to="/login"
          className="navbar-link"
          style={{ color: "white", marginRight: "35px" }}
        >
          Connexion
        </Link>
        <Link
          to="/inscription"
          className="navbar-link"
          style={{ color: "white", marginRight: "35px" }}
        >
          S'inscrire
        </Link>
        <button
          onClick={() => {
            console.log("Navigating to the login page (not implemented yet)");
          }}
          style={{
            color: "white",
            backgroundColor: "transparent",
            border: "2px solid #DAA520",
            borderRadius: "5px",
            padding: "10px 20px",
            cursor: "pointer",
            marginRight: "35px",
          }}
        >
          Déposer une annonce
        </button>

        {/* <Link
          to="/favoris"
          className="navbar-link"
          style={{ color: "white", marginRight: "20px" }}
        >
          Mes favoris
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
