import React, {useEffect, useState} from "react";
import "../App.css";
import {languageOptions} from "../utils/languages";
import {allthemes} from "../utils/getThemes";
import {Link} from "react-router-dom";
import logout from "../assets/logout.png";

function Navbar({backgroundColor}) {
  const [loggedin, setloggedin] = useState(false);
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      "Content-Type": "application/json",
    };
    const fetchOptions = {
      method: "GET",
      headers: headers,
    };
    fetch(process.env.REACT_APP_FILES_LINK, fetchOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) setloggedin(true);
      })
      .catch((error) => {
        // setloggedin(false);
      });
  }, []);
  return (
    <nav className="navbar" style={{backgroundColor}}>
      <div className="nav-items">
        <Link to="/">
          <div className="Logo">DevNest</div>
        </Link>
        <Link to="/login">
          <div
            className="Login"
            style={loggedin ? {display: "none"} : {display: ""}}>
            Login
          </div>
        </Link>
        <Link to="/createaccount">
          <div
            className="Create-Account"
            style={loggedin ? {display: "none"} : {display: ""}}>
            Sign up
          </div>
        </Link>
        <div
          className="logout"
          style={!loggedin ? {display: "none"} : {display: ""}}>
          <Link to="/login">
            <img
              onClick={(e) => {
                localStorage.removeItem("AccessToken");
              }}
              className="logout-img"
              src={logout}
              alt="logout"
            />
          </Link>
          <Link to="/dashboard">
            <div
              className="goto-dashboard"
              style={!loggedin ? {display: "none"} : {display: ""}}>
              Go to dashboard
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
