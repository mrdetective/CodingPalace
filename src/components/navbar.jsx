import React, {useEffect, useState} from "react";
import "../App.css";
import {languageOptions} from "../utils/languages";
import {allthemes} from "../utils/getThemes";
import {Link} from "react-router-dom";
import logout from "../assets/logout.png";
import {toast} from "react-toastify";

function Navbar({backgroundColor}) {
  const [loggedin, setLoggedin] = useState(false);
  const [fetchComplete, setFetchComplete] = useState(false);

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
        if (data) {
          setLoggedin(true);
        }
        setFetchComplete(true);
      })
      .catch((error) => {
        setFetchComplete(true);
      });
  }, []);

  if (!fetchComplete) {
    return null;
  }
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
            <div
              onClick={(e) => {
                localStorage.removeItem("AccessToken");
                toast("Successfully logged out!", {
                  icon: "✅",
                  autoClose: 1000,
                  position: "top-center",
                  style: {
                    borderRadius: "5px",
                    background: "#333131",
                    color: "whitesmoke",
                  },
                });
              }}
              className="logout-text">
              Logout
              <img src={logout} className="logout-img" />
            </div>
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
