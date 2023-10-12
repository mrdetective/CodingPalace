import React, {useState} from "react";
import "../App.css";
import logo from "../assets/CodingPalace.png";
import {languageOptions} from "./languages";
import {allthemes} from "./getThemes";
import {Link} from "react-router-dom";
function Navbar({backgroundColor}) {
  return (
    <nav className="navbar" style={{backgroundColor}}>
      <div className="nav-items">
        <Link to="/">
          <div className="Logo">DevNest</div>
        </Link>
        <Link to="/login">
          <div className="Login">Login</div>
        </Link>
        <Link to="/createaccount">
          <div className="Create-Account">Sign up</div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
