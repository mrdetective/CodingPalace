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
        <div className="sign-up ">Sign-up</div>
        <div className="Login">Login</div>
      </div>
    </nav>
  );
}

export default Navbar;
