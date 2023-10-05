import React, {useState} from "react";
import "../App.css";
import logo from "../assets/CodingPalace.png";
import {languageOptions} from "./languages";
import {allthemes} from "./getThemes";
function Navbar({backgroundColor}) {
  console.log(backgroundColor);
  return (
    <nav className="navbar" style={{backgroundColor}}>
      <div className="nav-items">
        <img className="Logo" src={logo} />
        <div className="Home">Home</div>
        <div className="About">About</div>
        <div className="Login">Login</div>
      </div>
    </nav>
  );
}

export default Navbar;
