import React, {useState} from "react";
import "../App.css";
import {languageOptions} from "../utils/languages";
import {allthemes} from "../utils/getThemes";
import {Link} from "react-router-dom";
import logout from "../assets/logout.png";

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
        <div className="logout">
          <img className="logout" src={logout} alt="logout" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
